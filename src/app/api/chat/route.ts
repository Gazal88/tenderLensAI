import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      return NextResponse.json(
        { error: 'Missing GROQ_API_KEY. Add it in your project .env file.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Format messages for Groq API
    const groqMessages = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'bot' ? 'assistant' : msg.role,
      content: msg.content
    }));

    // Add a system prompt if it's the first message or just always include it at the start
    groqMessages.unshift({
      role: 'system',
      content: 'You are TenderBot, a helpful assistant for a government procurement and tender evaluation platform. You help users understand the platform, evaluate tenders, and provide general assistance in a friendly, professional tone. Keep your responses concise and helpful.'
    });

    const llmResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        temperature: 0.5,
        messages: groqMessages,
      }),
    });

    if (!llmResponse.ok) {
      const errorBody = await llmResponse.text();
      throw new Error(`Groq API error: ${llmResponse.status} ${errorBody}`);
    }

    const completion = await llmResponse.json();
    const resultText = completion?.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

    return NextResponse.json({ reply: resultText });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Server error';
    console.error("Chat API error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
