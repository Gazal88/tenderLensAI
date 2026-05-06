"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileSignature, History, Settings, LogOut, ShieldCheck } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "AI Evaluation", href: "/dashboard/evaluate", icon: FileSignature },
    { name: "Tender History", href: "/dashboard/history", icon: History },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen text-slate-900 font-sans overflow-hidden" style={{ backgroundColor: '#FAFAF7' }}>

      {/* Sidebar */}
      <aside className="w-64 flex flex-col z-20 border-r border-slate-200 shadow-md" style={{ backgroundColor: '#003533' }}>
        <div className="h-20 flex items-center px-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <ShieldCheck className="w-7 h-7 mr-3 shrink-0" style={{ color: '#B8860B' }} />
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight leading-none">TenderLens <span style={{ color: '#B8860B' }}>AI</span></h1>
            <p className="text-[9px] font-bold tracking-widest uppercase mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Govt. Secure System</p>
          </div>
        </div>

        <div className="px-4 py-6 flex-1 overflow-y-auto">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-4 px-2" style={{ color: 'rgba(255,255,255,0.35)' }}>Main Menu</p>
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-3 rounded-md transition-colors group"
                  style={{
                    backgroundColor: isActive ? '#004B49' : 'transparent',
                    color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)',
                  }}
                  onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.06)'; }}
                  onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
                >
                  <item.icon className="w-5 h-5 mr-3 shrink-0" style={{ color: isActive ? '#B8860B' : 'rgba(255,255,255,0.4)' }} />
                  <span className="font-medium text-sm">{item.name}</span>
                  {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#B8860B' }}></span>}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex items-center px-2 py-2 mb-2">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white border" style={{ backgroundColor: '#004B49', borderColor: '#B8860B' }}>
              PS
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-white leading-none">Priya Sharma</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Procurement Officer</p>
            </div>
          </div>
          <Link href="/" className="flex items-center justify-center w-full px-4 py-2 text-sm rounded-md transition-colors"
            style={{ color: 'rgba(255,255,255,0.5)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; }}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-y-auto">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-base font-semibold text-slate-800">
            {navigation.find(n => n.href === pathname)?.name || "Dashboard"}
          </h2>
          <div className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-md border" style={{ backgroundColor: '#E0F0EF', borderColor: '#004B49', color: '#004B49' }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#004B49' }}></span>
            <span>System Online</span>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
