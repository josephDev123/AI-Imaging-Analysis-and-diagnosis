import { NavLink, Outlet } from "react-router";
import { Activity, House, ScanSearch } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: House },
  { to: "/upload", label: "Upload", icon: ScanSearch },
  { to: "/results", label: "Analysis Results", icon: Activity },
];

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#f3f7f9_0%,#e6edf3_45%,#e7f6f0_100%)] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-300/70 bg-white/75 backdrop-blur-xl">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="text-sm font-semibold tracking-[0.18em] text-slate-700 uppercase">
            AI Imaging Diagnosis
          </div>
          <ul className="flex items-center gap-1 rounded-xl border border-slate-300/80 bg-white/70 p-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    [
                      "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-slate-900 text-white"
                        : "text-slate-700 hover:bg-slate-100",
                    ].join(" ")
                  }
                >
                  <Icon size={16} />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <Outlet />
      </main>
    </div>
  );
}
