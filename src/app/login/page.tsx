"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight, Loader2, Search, ArrowRightCircle } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => { router.push('/dashboard'); }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row selection:bg-teal-900/20" style={{ backgroundColor: '#FAFAF7' }}>
      {/* Left Panel */}
      <div className="flex-1 lg:flex-none lg:w-[55%] xl:w-[60%] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white shadow-xl z-10 border-r border-slate-200">
        <div className="mx-auto w-full max-w-md lg:w-[420px]">
          <Link href="/" className="flex items-center space-x-3 group mb-10">
            <ShieldCheck className="w-10 h-10" style={{ color: '#004B49' }} />
            <div>
              <span className="text-2xl font-bold text-slate-900">TenderLens <span style={{ color: '#004B49' }}>AI</span></span>
              <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mt-0.5">Govt. Secure System</p>
            </div>
          </Link>

          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Access Tender Evaluation Dashboard</h2>
          <p className="text-sm text-slate-500 mb-6">
            Authorized CRPF personnel only.{" "}
            <Link href="/" className="font-medium hover:underline" style={{ color: '#004B49' }}>Return to homepage</Link>
          </p>

          <div className="flex items-center space-x-2 text-xs font-semibold px-3 py-2 rounded-md border mb-8 w-fit" style={{ backgroundColor: '#E0F0EF', borderColor: '#004B49', color: '#004B49' }}>
            <ShieldCheck className="w-4 h-4" /><span>Secure access — MHA Authorized Personnel</span>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">Email address</label>
                <span className="text-xs font-semibold px-2 py-1 rounded border" style={{ backgroundColor: '#E0F0EF', borderColor: '#004B49', color: '#004B49' }}>
                  Demo: officer@crpf.gov.in
                </span>
              </div>
              <input id="email" name="email" type="email" required defaultValue="officer@crpf.gov.in"
                className="block w-full px-3 py-3 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" />
              <p className="mt-1.5 text-xs text-slate-400">Use your official government email ID</p>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input id="password" name="password" type="password" required defaultValue="••••••••"
                className="block w-full px-3 py-3 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-700" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" defaultChecked className="h-4 w-4 border-slate-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 text-sm text-slate-700">Remember me</label>
              </div>
              <a href="#" className="text-sm font-medium hover:underline" style={{ color: '#004B49' }}>Forgot your password?</a>
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 rounded-md text-sm font-semibold text-white disabled:opacity-70 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#004B49' }}>
              {isLoading
                ? <span className="flex items-center"><Loader2 className="w-5 h-5 animate-spin mr-2" />Authenticating...</span>
                : <span className="flex items-center">Access Dashboard <ArrowRight className="ml-2 w-4 h-4" /></span>
              }
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-400 tracking-wide uppercase font-medium">Ministry of Home Affairs — Secure Portal</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 lg:w-[45%] xl:w-[40%] py-12 px-4 sm:px-6 lg:px-16 flex flex-col justify-center" style={{ backgroundColor: '#FAFAF7' }}>
        <div className="w-full max-w-md mx-auto space-y-8">

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">Quick Actions</h3>
            <ul className="space-y-2">
              {["Online Bidder Enrollment", "Generate / Forgot Password?", "Find My Nodal Officer"].map((label, i) => (
                <li key={i}><a href="#" className="text-sm font-semibold hover:underline" style={{ color: '#004B49' }}>{label}</a></li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg overflow-hidden border shadow-sm" style={{ backgroundColor: '#003533', borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="px-5 py-3 flex items-center space-x-2 border-b" style={{ backgroundColor: '#002726', borderColor: 'rgba(255,255,255,0.08)' }}>
              <Search className="w-4 h-4" style={{ color: '#B8860B' }} />
              <h3 className="text-white font-semibold text-sm">Public Tender Access (No Login Required)</h3>
            </div>
            <div className="p-5">
              <form className="flex space-x-2" onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) router.push(`/public-search?q=${encodeURIComponent(searchQuery)}`); }}>
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by ID / Title / Reference No."
                  className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-900 text-sm focus:outline-none" />
                <button type="submit" className="text-white font-bold px-4 py-2 rounded-md hover:opacity-90 text-sm" style={{ backgroundColor: '#B8860B' }}>Go</button>
              </form>
              <a href="#" className="mt-3 block text-xs font-medium hover:underline" style={{ color: '#B8860B' }}>Advanced Search →</a>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-5 py-3 border-b border-slate-200" style={{ backgroundColor: '#E0F0EF' }}>
              <h3 className="font-bold text-sm tracking-wide" style={{ color: '#004B49' }}>Resources</h3>
            </div>
            <ul className="divide-y divide-slate-100">
              {[
                { name: "Help For Contractors", href: "/resources/help-contractors" },
                { name: "Information About DSC", href: "/resources/dsc-info" },
                { name: "Guidelines for Hassle Free Bid Submission", href: "/resources/guidelines" },
                { name: "FAQ", href: "/resources/faq" },
                { name: "Feedback", href: "mailto:support@tenderlens.com" },
                { name: "Bidders Manual Kit", href: "/resources/manual-kit" },
              ].map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} className="flex items-center px-5 py-3 hover:bg-slate-50 transition-colors group">
                    <ArrowRightCircle className="w-4 h-4 mr-3 shrink-0 text-slate-300 group-hover:text-teal-700 transition-colors" />
                    <span className="text-slate-600 text-sm group-hover:text-slate-900 transition-colors">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
