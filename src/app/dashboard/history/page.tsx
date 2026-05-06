"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Download, FileCheck2, Clock, AlertTriangle, FileSignature } from "lucide-react";
import Link from "next/link";

type HistoryItem = {
  id: string;
  title: string;
  date: string;
  vendorCount: number;
  topVendor: string;
  status: string;
  score: number | null;
};

export default function TenderHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tender_history');
      if (saved) setHistory(JSON.parse(saved));
    } catch (e) { console.error(e); }
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tender History</h1>
          <p className="text-slate-500 mt-1 text-sm">Review past automated evaluations and their outcomes.</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50 shadow-sm transition-colors">
          <Download className="w-4 h-4 mr-2" /> Export Report
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by tender ID or title..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 shadow-sm"
            style={{ '--tw-ring-color': '#004B49' } as React.CSSProperties}
          />
        </div>
        <button className="inline-flex items-center px-4 py-2.5 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50 shadow-sm transition-colors">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </button>
      </div>

      {history.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-lg p-16 text-center flex flex-col items-center justify-center">
          <FileSignature className="w-12 h-12 text-slate-300 mb-4" />
          <h3 className="text-lg font-bold text-slate-700 mb-2">No Evaluations Yet</h3>
          <p className="text-slate-400 text-sm max-w-sm mb-6">You have not run any tender evaluations. Once you evaluate a tender, it will appear here automatically.</p>
          <Link
            href="/dashboard/evaluate"
            className="text-white px-6 py-2.5 rounded-md font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#004B49' }}
          >
            Run First Evaluation
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-xs text-slate-400 uppercase font-bold tracking-wider" style={{ backgroundColor: '#FAFAF7' }}>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Tender Reference</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4 text-center">Bids</th>
                  <th className="px-6 py-4">Winning Vendor</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {history.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors cursor-pointer">
                    <td className="px-6 py-4 text-sm text-slate-400 whitespace-nowrap">{item.date}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">{item.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{item.title}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border" style={{ backgroundColor: '#E0F0EF', borderColor: '#004B49', color: '#004B49' }}>
                        {item.vendorCount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {item.score ? (
                        <div>
                          <span className="text-sm font-medium text-slate-800">{item.topVendor}</span>
                          <div className="text-xs font-bold mt-0.5" style={{ color: '#004B49' }}>Score: {item.score}/100</div>
                        </div>
                      ) : (
                        <span className="text-sm text-slate-400 italic">{item.topVendor}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.status === 'Completed' && (
                        <span className="inline-flex items-center space-x-1 text-sm font-semibold px-3 py-1 rounded bg-emerald-50 text-emerald-700">
                          <FileCheck2 className="w-4 h-4" /><span>Completed</span>
                        </span>
                      )}
                      {item.status === 'In Progress' && (
                        <span className="inline-flex items-center space-x-1 text-sm font-semibold px-3 py-1 rounded text-amber-700" style={{ backgroundColor: '#FDF8E7' }}>
                          <Clock className="w-4 h-4" /><span>Processing</span>
                        </span>
                      )}
                      {item.status === 'Flagged' && (
                        <span className="inline-flex items-center space-x-1 text-sm font-semibold px-3 py-1 rounded bg-red-50 text-red-700">
                          <AlertTriangle className="w-4 h-4" /><span>Flagged</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
