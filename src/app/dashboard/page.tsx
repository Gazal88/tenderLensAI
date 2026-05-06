"use client";

import { FileCheck2, AlertCircle, Clock, TrendingUp, Users, FileSignature } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

type EvaluationRecord = {
  id: string;
  title: string;
  date: string;
  vendorCount: number;
  status: string;
};

export default function DashboardOverview() {
  const [recentEvaluations, setRecentEvaluations] = useState<EvaluationRecord[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tender_history');
      if (saved) setRecentEvaluations(JSON.parse(saved).slice(0, 5));
    } catch (e) { console.error(e); }
  }, []);

  const totalVendors = recentEvaluations.reduce((sum, item) => sum + item.vendorCount, 0);

  const stats = [
    { name: "Active Tenders", value: recentEvaluations.length > 0 ? "1" : "0", change: "Based on local data", icon: FileSignature },
    { name: "Vendors Evaluated", value: totalVendors.toString(), change: "Total historically processed", icon: Users },
    { name: "Success Rate", value: recentEvaluations.length > 0 ? "100%" : "0%", change: "Successfully evaluated", icon: FileCheck2 },
    { name: "System Status", value: "Online", change: "Ready for new inputs", icon: AlertCircle },
  ];

  return (
    <div className="space-y-8">

      {/* Welcome Banner */}
      <div className="rounded-lg p-8 text-white relative overflow-hidden" style={{ backgroundColor: '#003533' }}>
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #B8860B, transparent)', marginTop: '-24px', marginRight: '-24px' }}></div>
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#B8860B' }}>CRPF Procurement Portal</p>
          <h2 className="text-2xl font-bold text-white mb-2">Good morning, Priya</h2>
          <p className="text-sm leading-relaxed mb-6 max-w-xl" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Welcome to your workspace. The AI assistant has reviewed <strong className="text-white">{totalVendors}</strong> vendor submissions, catching critical compliance details and reducing manual review time.
          </p>
          <Link
            href="/dashboard/evaluate"
            className="inline-flex items-center px-5 py-2.5 rounded-md font-semibold text-sm transition-opacity hover:opacity-90 shadow-sm"
            style={{ backgroundColor: '#B8860B', color: '#fff' }}
          >
            <FileSignature className="w-4 h-4 mr-2" />
            Start New Evaluation
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.name}</p>
              <div className="p-2 rounded-md" style={{ backgroundColor: '#E0F0EF' }}>
                <stat.icon className="w-5 h-5" style={{ color: '#004B49' }} />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</h3>
            <div className="flex items-center text-xs text-slate-400">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Evaluations Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center" style={{ backgroundColor: '#FAFAF7' }}>
          <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Recent Evaluations</h3>
          <Link href="/dashboard/history" className="text-xs font-semibold hover:underline" style={{ color: '#004B49' }}>
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white text-xs uppercase text-slate-400 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Tender Reference</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4 text-center">Vendors</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentEvaluations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-sm">
                    No evaluations yet.{" "}
                    <Link href="/dashboard/evaluate" className="font-semibold hover:underline" style={{ color: '#004B49' }}>
                      Run your first evaluation.
                    </Link>
                  </td>
                </tr>
              ) : (
                recentEvaluations.map((tender, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors cursor-pointer">
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{tender.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{tender.title}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border" style={{ backgroundColor: '#E0F0EF', borderColor: '#004B49', color: '#004B49' }}>
                        {tender.vendorCount} Bids
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {tender.status === 'Completed' ? (
                        <span className="inline-flex items-center space-x-1 text-emerald-700 text-sm font-medium">
                          <FileCheck2 className="w-4 h-4" /><span>Completed</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-amber-600 text-sm font-medium">
                          <Clock className="w-4 h-4" /><span>In Progress</span>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-slate-400">{tender.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
