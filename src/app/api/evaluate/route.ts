import { NextRequest, NextResponse } from 'next/server';

type GroqCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

export async function POST(request: NextRequest) {
  try {
    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      return NextResponse.json(
        { error: 'Missing GROQ_API_KEY. Add it in your project .env file.' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const tenderFile = formData.get('tender') as File | null;
    const vendorFiles = formData.getAll('vendor') as File[];

    if (!tenderFile || vendorFiles.length === 0) {
      return NextResponse.json(
        { error: 'Missing tender or vendor files' },
        { status: 400 }
      );
    }

    const extractText = async (file: File) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      if (file.name.endsWith('.pdf')) {
        try {
          const { PDFParse } = await import('pdf-parse');
          const parser = new PDFParse({ data: buffer });
          const textResult = await parser.getText();
          await parser.destroy();
          return textResult.text;
        } catch (error) {
          console.error("PDF parse error on", file.name, error);
          return "Error extracting text from PDF.";
        }
      } else {
        return buffer.toString('utf-8');
      }
    };

    const tenderText = await extractText(tenderFile);

    const results: Array<{
      vendorName: string;
      eligibility: string;
      score: number;
      reasons: string[];
      risks: string[];
      rank?: number;
    }> = [];

    for (let i = 0; i < vendorFiles.length; i++) {
      const vendorFile = vendorFiles[i];
      const vendorText = await extractText(vendorFile);

      const prompt = `
      You are an expert Government Procurement AI Assistant.

      TENDER DOCUMENT TEXT:
      """
      ${tenderText.substring(0, 30000)}
      """

      VENDOR SUBMISSION TEXT (${vendorFile.name}):
      """
      ${vendorText.substring(0, 30000)}
      """

      Task:
      Evaluate the vendor submission against the tender document requirements.
      Output ONLY a valid JSON object matching this structure:
      {
        "vendorName": "Extract vendor name or use '${vendorFile.name}'",
        "eligibility": "Pass" or "Fail",
        "score": number between 0 and 100 based on compliance,
        "reasons": ["Write a friendly, conversational explanation of exactly why this vendor scored what they did, written like a human expert advising a colleague. Avoid robotic bullet points."],
        "risks": ["Any critical missing items or red flags, written in a helpful, conversational tone. Leave empty if none."]
      }
      `;

      const llmResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          temperature: 0.2,
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content: 'You are an expert Government Procurement AI Assistant. Always respond with valid JSON only.',
            },
            { role: 'user', content: prompt },
          ],
        }),
      });

      if (!llmResponse.ok) {
        const errorBody = await llmResponse.text();
        throw new Error(`Groq API error: ${llmResponse.status} ${errorBody}`);
      }

      const completion = await llmResponse.json() as GroqCompletionResponse;
      const resultText = completion?.choices?.[0]?.message?.content || "{}";
      let parsed;
      try {
        parsed = JSON.parse(resultText);
      } catch {
        console.error("Failed to parse JSON", resultText);
        parsed = {
          vendorName: vendorFile.name,
          eligibility: "Error",
          score: 0,
          reasons: ["Failed to generate valid response"],
          risks: []
        };
      }
      results.push(parsed);
    }

    results.sort((a, b) => b.score - a.score);
    results.forEach((r, idx) => r.rank = idx + 1);

    return NextResponse.json({ results });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Server error';
    console.error("API error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
