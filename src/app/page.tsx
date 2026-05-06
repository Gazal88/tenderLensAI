"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, BrainCircuit, Lock, CheckCircle2, Building2, AlertTriangle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans text-slate-900 selection:bg-teal-900/20" style={{ backgroundColor: '#FAFAF7' }}>

      {/* Top Govt Banner */}
      <div style={{ backgroundColor: '#004B49' }} className="text-white text-xs font-medium py-2 px-8 flex justify-center items-center tracking-wide">
        <span className="opacity-90">Official Tender Evaluation Portal — Central Reserve Police Force (CRPF), Ministry of Home Affairs</span>
      </div>

      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-8 h-8" style={{ color: '#004B49' }} />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900 tracking-tight leading-none">
                TenderLens <span style={{ color: '#004B49' }}>AI</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-0.5">Govt. Secure System</span>
            </div>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-teal-800 transition-colors">Platform Capabilities</a>
            <a href="#security" className="hover:text-teal-800 transition-colors">Security Protocol</a>
            <a href="#about" className="hover:text-teal-800 transition-colors">About System</a>
          </div>
          <Link
            href="/login"
            className="text-white px-5 py-2.5 rounded-md text-sm font-semibold transition-opacity hover:opacity-90 shadow-sm"
            style={{ backgroundColor: '#004B49' }}
          >
            Officer Login
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center max-w-5xl mx-auto">
        <div
          className="inline-flex items-center space-x-2 border px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider mb-8"
          style={{ backgroundColor: '#E0F0EF', borderColor: '#004B49', color: '#004B49' }}
        >
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: '#004B49' }}></span>
          <span>Authorized Personnel Only — Internal Use</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight max-w-4xl leading-tight">
          AI-Assisted Tender Evaluation for{" "}
          <span style={{ color: '#004B49' }}>CRPF Officers</span>
        </h1>

        <p className="mt-6 text-lg text-slate-500 max-w-2xl leading-relaxed">
          Compare multiple vendor submissions, detect missing compliance clauses, and receive an objective recommendation with full reasoning — streamlining government procurement.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white rounded-md transition-opacity hover:opacity-90 shadow-sm"
            style={{ backgroundColor: '#004B49' }}
          >
            Access Dashboard <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <a
            href="#features"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
          >
            View Documentation
          </a>
        </div>

        <div
          className="mt-12 flex items-start space-x-3 border px-5 py-4 rounded-md text-sm text-left max-w-xl w-full"
          style={{ backgroundColor: '#FDF8E7', borderColor: '#B8860B', color: '#7a5800' }}
        >
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#B8860B' }} />
          <p>
            <strong>Important Notice:</strong> This system assists decision-making through automated analysis. Final procurement approval and verification remain with the presiding officer.
          </p>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="bg-white border-t border-slate-200 py-24 px-8 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 border-l-4 pl-6" style={{ borderColor: '#004B49' }}>
            <h2 className="text-3xl font-bold text-slate-900">Platform Capabilities</h2>
            <p className="text-slate-500 mt-2 text-lg">Built for the rigorous demands of CRPF government procurement.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" style={{ color: '#004B49' }} />,
                title: "Instant Evaluation",
                desc: "Cross-reference 100-page vendor submissions against complex tender requirements in seconds, ensuring thorough compliance without manual overhead.",
              },
              {
                icon: <BrainCircuit className="w-8 h-8" style={{ color: '#004B49' }} />,
                title: "Risk Detection",
                desc: "Automatically identifies missing documents, partial compliances, and financial bid discrepancies in line with CVC guidelines.",
              },
              {
                icon: <Lock className="w-8 h-8" style={{ color: '#004B49' }} />,
                title: "Auditable Transparency",
                desc: "Every decision is fully explainable. Generate downloadable reports detailing precisely why a vendor was accepted or flagged for rejection.",
              },
            ].map((item, i) => (
              <div key={i} className="border border-slate-200 p-8 rounded-lg" style={{ backgroundColor: '#FAFAF7' }}>
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="text-white py-24 px-8 scroll-mt-16" style={{ backgroundColor: '#003533' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="border-l-4 pl-6 mb-8" style={{ borderColor: '#B8860B' }}>
              <h2 className="text-3xl font-bold text-white">Security & Privacy Protocol</h2>
            </div>
            <p className="mb-8 leading-relaxed text-lg" style={{ color: '#b2c9c8' }}>
              Government tender documents contain highly sensitive information. Our platform is built on strict principles of data sovereignty and role-based access control.
            </p>
            <ul className="space-y-4">
              {[
                "End-to-end encryption for all uploaded PDFs and financial documents.",
                "Zero-data retention policy — documents are purged immediately post-evaluation.",
                "Compliance with national cybersecurity and MeitY frameworks.",
                "Role-Based Access Control (RBAC) linked to official government credentials.",
              ].map((item, i) => (
                <li key={i} className="flex items-start p-3 rounded-md border" style={{ backgroundColor: 'rgba(0,75,73,0.4)', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <CheckCircle2 className="w-5 h-5 mr-3 shrink-0 mt-0.5" style={{ color: '#B8860B' }} />
                  <span style={{ color: '#d4e8e7' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-lg border shadow-2xl font-mono text-sm" style={{ backgroundColor: '#0D1117', borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="flex space-x-2 mb-4 border-b pb-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <pre className="overflow-x-auto" style={{ color: '#4ade80' }}>
              <code>{`[SYSTEM LOG — SECURE ENCLAVE]
> Authenticating officer identity...  OK
> Initializing evaluation protocol...
> Loading: tender_CRPF_2026_Q1.pdf
> Loading: vendor_Alpha_bid.pdf
> Cross-referencing specifications...
> Compliance check: 47 clauses verified.
> Anomaly detection: 2 flags raised.
> Generating report... SUCCESS
> Executing zero-retention wipe...
> 0 bytes retained in memory.
> Session terminated securely.`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-8 border-t border-slate-200 scroll-mt-16 text-center" style={{ backgroundColor: '#FAFAF7' }}>
        <div className="max-w-3xl mx-auto">
          <Building2 className="w-14 h-14 mx-auto mb-6 text-slate-300" />
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Modernizing Public Procurement</h2>
          <p className="text-lg text-slate-500 leading-relaxed mb-10">
            TenderLens AI addresses a critical bottleneck in government operations — the manual, error-prone, and weeks-long process of evaluating complex tender submissions. By empowering procurement officers with explainable AI, we ensure taxpayer funds are utilized efficiently, transparently, and fairly.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white rounded-md hover:opacity-90 transition-opacity shadow-sm"
            style={{ backgroundColor: '#004B49' }}
          >
            Enter Secure Portal
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
          <p>© 2026 TenderLens AI System. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-700 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-700 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-slate-700 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
