"use client";

import React, { useState } from "react";
import { Upload, FileText, CheckCircle, AlertTriangle, XCircle, Award, Trash2, FilePlus2, ShieldCheck } from "lucide-react";

type VendorResult = {
  vendorName: string;
  eligibility: string;
  score: number;
  rank: number;
  reasons: string[];
  risks: string[];
};

export default function EvaluateTender() {
  const [tenderFile, setTenderFile] = useState<File | null>(null);
  const [vendorFiles, setVendorFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<VendorResult[] | null>(null);
  const [expandedVendor, setExpandedVendor] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleTenderDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length > 0) setTenderFile(e.dataTransfer.files[0]);
  };

  const handleVendorDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length > 0)
      setVendorFiles(prev => [...prev, ...Array.from(e.dataTransfer.files!)]);
  };

  const handleRemoveVendor = (indexToRemove: number) =>
    setVendorFiles(prev => prev.filter((_, i) => i !== indexToRemove));

  const handleEvaluate = async () => {
    if (!tenderFile || vendorFiles.length === 0) {
      alert("Please upload both a tender document and at least one vendor submission.");
      return;
    }
    setIsProcessing(true);
    setResults(null);
    try {
      const formData = new FormData();
      formData.append("tender", tenderFile);
      vendorFiles.forEach(f => formData.append("vendor", f));
      const response = await fetch("/api/evaluate", { method: "POST", body: formData });
      const data = await response.json();
      if (response.ok) {
        setResults(data.results);
        try {
          const history = JSON.parse(localStorage.getItem('tender_history') || '[]');
          const newRecord = {
            id: `EVAL-${Math.floor(1000 + Math.random() * 9000)}`,
            title: tenderFile.name,
            date: new Date().toLocaleDateString(),
            vendorCount: vendorFiles.length,
            topVendor: data.results.length > 0 ? data.results[0].vendorName : 'None',
            status: 'Completed',
            score: data.results.length > 0 ? data.results[0].score : null
          };
          localStorage.setItem('tender_history', JSON.stringify([newRecord, ...history]));
        } catch (e) { console.error("Failed to save history", e); }
      } else {
        alert("Evaluation failed: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during evaluation.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">AI Evaluation Engine</h1>
        <p className="text-slate-500 mt-1 text-sm">Upload the original tender document alongside vendor submissions to perform an automated compliance check.</p>
      </div>

      {/* Upload Section */}
      {!isProcessing && !results && (
        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-6">

            {/* Tender Document */}
            <div className="bg-white p-7 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-5">
                <div className="p-3 rounded-md" style={{ backgroundColor: '#E0F0EF' }}>
                  <FileText className="w-6 h-6" style={{ color: '#004B49' }} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-800">Tender Document</h2>
                  <p className="text-xs text-slate-400">The master requirements file</p>
                </div>
              </div>
              <label
                onDragOver={handleDragOver}
                onDrop={handleTenderDrop}
                className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200"
                style={tenderFile
                  ? { borderColor: '#004B49', backgroundColor: '#E0F0EF' }
                  : { borderColor: '#cbd5e1', backgroundColor: '#f8fafc' }}
              >
                <div className="flex flex-col items-center justify-center">
                  {tenderFile ? (
                    <div className="text-center">
                      <CheckCircle className="w-9 h-9 mb-2 mx-auto" style={{ color: '#004B49' }} />
                      <p className="text-sm font-bold text-slate-800">{tenderFile.name}</p>
                      <p className="text-xs text-slate-400 mt-1">{(tenderFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-9 h-9 mb-3 text-slate-300" />
                      <p className="text-sm text-slate-500">
                        <span className="font-semibold" style={{ color: '#004B49' }}>Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-slate-400 mt-1">PDF, TXT, DOCX</p>
                    </>
                  )}
                </div>
                <input type="file" className="hidden" onChange={(e) => setTenderFile(e.target.files?.[0] || null)} />
              </label>
            </div>

            {/* Vendor Submissions */}
            <div className="bg-white p-7 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-5">
                <div className="p-3 rounded-md" style={{ backgroundColor: '#FDF8E7' }}>
                  <FilePlus2 className="w-6 h-6" style={{ color: '#B8860B' }} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-800">Vendor Submissions</h2>
                  <p className="text-xs text-slate-400">Upload multiple bids to evaluate</p>
                </div>
              </div>
              <label
                onDragOver={handleDragOver}
                onDrop={handleVendorDrop}
                className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200"
                style={{ borderColor: '#cbd5e1', backgroundColor: '#f8fafc' }}
              >
                <div className="flex flex-col items-center justify-center">
                  <Upload className="w-9 h-9 mb-3 text-slate-300" />
                  <p className="text-sm text-slate-500">
                    <span className="font-semibold" style={{ color: '#B8860B' }}>Click to add vendors</span> or drag them here
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Add as many as you need</p>
                </div>
                <input type="file" className="hidden" multiple onChange={(e) => {
                  if (e.target.files) setVendorFiles(prev => [...prev, ...Array.from(e.target.files!)]);
                }} />
              </label>

              {vendorFiles.length > 0 && (
                <div className="mt-4 space-y-2 max-h-36 overflow-y-auto pr-1">
                  {vendorFiles.map((file, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-md border border-slate-100">
                      <div className="flex items-center space-x-2 truncate pr-3">
                        <FileText className="w-4 h-4 shrink-0" style={{ color: '#B8860B' }} />
                        <span className="text-sm text-slate-600 truncate">{file.name}</span>
                      </div>
                      <button onClick={() => handleRemoveVendor(i)} className="text-slate-300 hover:text-red-500 p-1 rounded transition-colors shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Evaluate Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleEvaluate}
              disabled={!tenderFile || vendorFiles.length === 0}
              className="inline-flex items-center justify-center px-12 py-3.5 text-base font-bold text-white rounded-md transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
              style={{ backgroundColor: '#004B49' }}
            >
              <Award className="w-5 h-5 mr-2" style={{ color: '#B8860B' }} />
              Commence Evaluation
            </button>
          </div>
        </div>
      )}

      {/* Processing */}
      {isProcessing && (
        <div className="flex flex-col items-center justify-center py-40">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 rounded-full border-t-transparent animate-spin" style={{ borderColor: '#004B49', borderTopColor: 'transparent' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <ShieldCheck className="w-9 h-9 animate-pulse" style={{ color: '#004B49' }} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Analyzing Submissions</h2>
          <p className="text-slate-500 max-w-md text-center text-sm">
            Cross-referencing vendor documents against tender criteria, checking compliance, and calculating final scores...
          </p>
        </div>
      )}

      {/* Results */}
      {results && !isProcessing && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Evaluation Results</h2>
              <p className="text-slate-500 text-sm mt-1">Analysis complete. Vendors ranked by compliance score.</p>
            </div>
            <button
              onClick={() => setResults(null)}
              className="px-5 py-2 bg-white border border-slate-200 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
            >
              Evaluate New Tender
            </button>
          </div>

          {/* Top Recommendation */}
          {results.length > 0 && results[0].score > 50 && (
            <div className="rounded-lg p-7 text-white flex items-center gap-6 relative overflow-hidden" style={{ backgroundColor: '#003533' }}>
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #B8860B, transparent)', marginTop: '-24px', marginRight: '-24px' }}></div>
              <div className="p-4 rounded-md border shrink-0" style={{ backgroundColor: 'rgba(184,134,11,0.15)', borderColor: 'rgba(184,134,11,0.3)' }}>
                <Award className="w-10 h-10" style={{ color: '#B8860B' }} />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#B8860B' }}>Recommended Vendor</h3>
                <p className="text-3xl font-extrabold text-white mb-2">{results[0].vendorName}</p>
                <div className="flex items-center space-x-3 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <span className="font-mono font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' }}>{results[0].score}/100</span>
                  <span>Highest compliance score — meets all critical eligibility criteria.</span>
                </div>
              </div>
            </div>
          )}

          {/* Results Table */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-xs text-slate-400 uppercase font-bold tracking-wider" style={{ backgroundColor: '#FAFAF7' }}>
                    <th className="px-6 py-4">Rank</th>
                    <th className="px-6 py-4">Vendor</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-center">Score</th>
                    <th className="px-6 py-4">Risk Alerts</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {results.map((vendor, index) => (
                    <React.Fragment key={index}>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-slate-400">#{vendor.rank}</td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-800">{vendor.vendorName}</td>
                        <td className="px-6 py-4 text-center">
                          {vendor.eligibility.toLowerCase() === 'pass' ? (
                            <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded text-xs font-bold">
                              <CheckCircle className="w-4 h-4" /><span>PASS</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center space-x-1 bg-red-50 text-red-700 px-3 py-1 rounded text-xs font-bold">
                              <XCircle className="w-4 h-4" /><span>FAIL</span>
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full border-[3px] font-bold text-base
                            ${vendor.score >= 80 ? 'border-emerald-500 text-emerald-700 bg-emerald-50' :
                              vendor.score >= 50 ? 'border-amber-400 text-amber-700 bg-amber-50' :
                              'border-red-400 text-red-700 bg-red-50'}`}>
                            {vendor.score}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {vendor.risks.length > 0 ? (
                            <span className="inline-flex items-center text-amber-700 text-xs font-bold px-3 py-1 rounded" style={{ backgroundColor: '#FDF8E7' }}>
                              <AlertTriangle className="w-4 h-4 mr-1.5" /> {vendor.risks.length} Flag{vendor.risks.length > 1 ? 's' : ''}
                            </span>
                          ) : (
                            <span className="text-xs font-medium text-slate-400 px-3 py-1 bg-slate-100 rounded">Clear</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setExpandedVendor(expandedVendor === vendor.vendorName ? null : vendor.vendorName)}
                            className="px-4 py-2 rounded-md text-xs font-semibold transition-colors"
                            style={expandedVendor === vendor.vendorName
                              ? { backgroundColor: '#004B49', color: '#fff' }
                              : { backgroundColor: '#f1f5f9', color: '#475569' }}
                          >
                            {expandedVendor === vendor.vendorName ? 'Hide Details' : 'View Breakdown'}
                          </button>
                        </td>
                      </tr>

                      {expandedVendor === vendor.vendorName && (
                        <tr className="border-b border-slate-100" style={{ backgroundColor: '#FAFAF7' }}>
                          <td colSpan={6} className="p-0">
                            <div className="p-6 grid lg:grid-cols-2 gap-6">
                              {/* Evaluation Breakdown */}
                              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                                <h4 className="font-bold text-slate-800 mb-4 flex items-center text-sm">
                                  <CheckCircle className="w-4 h-4 mr-2" style={{ color: '#004B49' }} />
                                  Evaluation Breakdown
                                </h4>
                                <ul className="space-y-2.5">
                                  {vendor.reasons.map((reason, i) => (
                                    <li key={i} className="text-sm text-slate-600 flex items-start leading-relaxed">
                                      <div className="w-1.5 h-1.5 rounded-full mt-2 mr-3 shrink-0" style={{ backgroundColor: '#004B49' }}></div>
                                      {reason}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Risk Analysis */}
                              <div className="bg-white p-5 rounded-lg border shadow-sm" style={{ borderColor: vendor.risks.length > 0 ? '#B8860B' : '#d1fae5' }}>
                                <h4 className="font-bold mb-4 flex items-center text-sm" style={{ color: vendor.risks.length > 0 ? '#92400e' : '#065f46' }}>
                                  <AlertTriangle className="w-4 h-4 mr-2" />
                                  Risk Analysis
                                </h4>
                                {vendor.risks.length > 0 ? (
                                  <ul className="space-y-2">
                                    {vendor.risks.map((risk, i) => (
                                      <li key={i} className="text-sm flex items-start p-3 rounded-md border" style={{ backgroundColor: '#FDF8E7', borderColor: '#B8860B', color: '#7a5800' }}>
                                        <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 shrink-0" style={{ color: '#B8860B' }} />
                                        <span className="font-medium">{risk}</span>
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <div className="flex flex-col items-center justify-center h-28 text-center">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                                    </div>
                                    <p className="text-sm font-semibold text-emerald-700">No significant risks detected.</p>
                                    <p className="text-xs text-emerald-500 mt-1">This submission appears structurally sound.</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
