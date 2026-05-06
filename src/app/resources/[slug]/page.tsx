"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, FileText, HelpCircle, ShieldCheck } from "lucide-react";

type ResourceContent = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const resources: Record<string, ResourceContent> = {
  "help-contractors": {
    title: "Help For Contractors",
    description: "Step-by-step guidance on how contractors can register, navigate, and utilize the TenderLens platform to submit compliant bids.",
    icon: <BookOpen className="w-10 h-10" style={{ color: '#004B49' }} />,
  },
  "dsc-info": {
    title: "Information About DSC",
    description: "Everything you need to know about Digital Signature Certificates (DSC) — how to obtain, register, and use them for secure bid submission.",
    icon: <ShieldCheck className="w-10 h-10" style={{ color: '#004B49' }} />,
  },
  "guidelines": {
    title: "Guidelines for Hassle Free Bid Submission",
    description: "Best practices and mandatory requirements to ensure your tender bids are submitted successfully without technical or compliance issues.",
    icon: <FileText className="w-10 h-10" style={{ color: '#004B49' }} />,
  },
  "faq": {
    title: "Frequently Asked Questions",
    description: "Answers to the most common questions regarding the tender process, platform usage, DSC requirements, and technical support.",
    icon: <HelpCircle className="w-10 h-10" style={{ color: '#004B49' }} />,
  },
  "manual-kit": {
    title: "Bidders Manual Kit",
    description: "Downloadable manuals, toolkits, and offline resources to assist bidders in preparing complete and compliant tender documents.",
    icon: <BookOpen className="w-10 h-10" style={{ color: '#004B49' }} />,
  },
};

export default function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [content, setContent] = useState<ResourceContent | null>(null);

  useEffect(() => {
    setContent(resources[slug] ?? {
      title: "Resource Not Found",
      description: "The resource you are looking for does not exist or has been moved.",
      icon: <HelpCircle className="w-10 h-10 text-slate-300" />,
    });
  }, [slug]);

  if (!content) return null;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAFAF7' }}>

      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/login" className="flex items-center space-x-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portal</span>
          </Link>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6" style={{ color: '#004B49' }} />
            <span className="font-bold text-slate-900">TenderLens <span style={{ color: '#004B49' }}>AI</span></span>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-white p-12 rounded-lg shadow-sm border border-slate-200 max-w-2xl w-full text-left">

          <div className="flex items-start space-x-6 mb-8">
            <div className="p-3 rounded-md border border-slate-200 shrink-0" style={{ backgroundColor: '#E0F0EF' }}>
              {content.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">{content.title}</h1>
              <p className="text-slate-500 leading-relaxed">{content.description}</p>
            </div>
          </div>

          <div className="rounded-md p-5 border" style={{ backgroundColor: '#FDF8E7', borderColor: '#B8860B' }}>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#B8860B' }}>Notice</span>
            </div>
            <p className="text-sm text-slate-600">
              This section is currently being updated with the latest official documentation. For immediate assistance, please contact the Nodal Officer or use the <a href="mailto:support@tenderlens.com" className="font-semibold hover:underline" style={{ color: '#004B49' }}>Feedback / Support</a> channel.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
            <Link href="/login" className="text-sm font-medium hover:underline" style={{ color: '#004B49' }}>
              ← Return to Portal
            </Link>
            <span className="text-xs text-slate-400">TenderLens AI — CRPF Procurement System</span>
          </div>
        </div>
      </main>
    </div>
  );
}
