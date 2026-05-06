"use client";

import { useSearchParams } from "next/navigation";
import { ShieldCheck, Search, FileText, ArrowLeft, Download, Building2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [isSearching, setIsSearching] = useState(true);

  const mockTenders = [
    {
      id: "CRPF/PROC/2026/05",
      title: "Supply and installation of 500 units of Advanced Body Armor (Level IV)",
      department: "Directorate General, Central Reserve Police Force",
      datePublished: "2026-05-01",
      closingDate: "2026-05-30",
      status: "Active"
    },
    {
      id: "MHA/TECH/2026/12",
      title: "Procurement of AI-Based Surveillance Systems for Border Areas",
      department: "Ministry of Home Affairs",
      datePublished: "2026-04-15",
      closingDate: "2026-05-20",
      status: "Active"
    },
    {
      id: "DEF/ARMY/2025/88",
      title: "Tactical Communication Radios (UHF/VHF) - 2000 Units",
      department: "Ministry of Defence",
      datePublished: "2025-11-10",
      closingDate: "2025-12-15",
      status: "Closed"
    }
  ];

  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => setIsSearching(false), 800);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredTenders = query
    ? mockTenders.filter(t =>
        t.id.toLowerCase().includes(query.toLowerCase()) ||
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.department.toLowerCase().includes(query.toLowerCase())
      )
    : mockTenders;

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: '#FAFAF7' }}>

      {/* Nav */}
      <nav className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <Link href="/" className="flex items-center space-x-2">
          <ShieldCheck className="w-7 h-7" style={{ color: '#004B49' }} />
          <div>
            <span className="text-lg font-bold text-slate-900">TenderLens <span style={{ color: '#004B49' }}>Public</span></span>
            <p className="text-[9px] font-bold tracking-widest uppercase text-slate-400">Public Search Portal</p>
          </div>
        </Link>
        <Link href="/login" className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Login
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto py-12 px-6">
        <div className="mb-8">
          <div className="border-l-4 pl-4 mb-1" style={{ borderColor: '#004B49' }}>
            <h1 className="text-2xl font-bold text-slate-900">Public Tender Search</h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">Search results for publicly available government tenders. No login required.</p>
        </div>

        {/* Search Result Card */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between" style={{ backgroundColor: '#FAFAF7' }}>
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-600">
                Query:{" "}
                {query
                  ? <span className="font-bold px-2 py-0.5 rounded ml-1 text-xs border" style={{ backgroundColor: '#E0F0EF', color: '#004B49', borderColor: '#004B49' }}>"{query}"</span>
                  : <span className="text-slate-400 italic text-xs">All tenders</span>
                }
              </span>
            </div>
            {!isSearching && <span className="text-xs font-medium text-slate-400">{filteredTenders.length} result{filteredTenders.length !== 1 ? 's' : ''} found</span>}
          </div>

          <div className="p-5">
            {isSearching ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-10 h-10 border-4 border-slate-100 rounded-full animate-spin mb-4" style={{ borderTopColor: '#004B49' }}></div>
                <p className="text-sm text-slate-400 font-medium">Searching tender database...</p>
              </div>
            ) : filteredTenders.length > 0 ? (
              <div className="space-y-4">
                {filteredTenders.map((tender, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-lg p-5 hover:border-teal-300 hover:shadow-sm transition-all bg-white group">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-xs font-bold px-2.5 py-1 rounded font-mono bg-slate-100 text-slate-600 border border-slate-200">
                            {tender.id}
                          </span>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded border ${
                            tender.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-red-50 text-red-600 border-red-200'
                          }`}>
                            {tender.status}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-800 mb-2 leading-snug group-hover:text-teal-800 transition-colors">
                          {tender.title}
                        </h3>
                        <p className="text-sm text-slate-500 flex items-center">
                          <Building2 className="w-4 h-4 mr-1.5 text-slate-300" /> {tender.department}
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-3 min-w-[140px]">
                        <div className="text-center bg-slate-50 border border-slate-200 px-3 py-2 rounded-md w-full">
                          <p className="font-bold text-slate-800 text-sm">{tender.closingDate}</p>
                          <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mt-0.5">Closing Date</p>
                        </div>
                        <button
                          className="flex items-center justify-center w-full text-xs font-bold px-3 py-2 rounded-md transition-opacity hover:opacity-90"
                          style={{ backgroundColor: '#004B49', color: '#fff' }}
                        >
                          <Download className="w-3.5 h-3.5 mr-1.5" /> View Docs
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-7 h-7 text-slate-300" />
                </div>
                <h3 className="text-base font-bold text-slate-700 mb-2">No Tenders Found</h3>
                <p className="max-w-sm text-sm text-slate-400 leading-relaxed">
                  No public tenders matched <span className="font-semibold text-slate-600">"{query}"</span>. Try a different reference number or keyword.
                </p>
                <Link href="/login" className="mt-6 text-sm font-semibold hover:underline" style={{ color: '#004B49' }}>
                  Return to Search
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PublicSearch() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAFAF7' }}>
        <div className="w-10 h-10 border-4 border-slate-200 rounded-full animate-spin" style={{ borderTopColor: '#004B49' }}></div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
