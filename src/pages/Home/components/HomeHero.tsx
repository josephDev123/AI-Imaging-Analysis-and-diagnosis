import { ArrowRight, Microscope } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const supportedFormats = ["JPG", "PNG"];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-300/90 bg-white/90 px-6 py-10 shadow-lg shadow-slate-900/5 sm:px-10 sm:py-14">
      <div className="pointer-events-none absolute -top-32 -right-20 size-72 rounded-full bg-teal-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-12 size-72 rounded-full bg-sky-200/55 blur-3xl" />
      <div className="relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-slate-600 uppercase">
          <Microscope size={14} />
          Medical AI Assistant
        </div>
        <h1 className="max-w-3xl text-4xl leading-tight font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Medical Imaging Diagnosis Agent
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
          AI-assisted analysis powered by AI Agent to help clinicians and
          Patient review visual findings, assess severity, and communicate
          results with patient-friendly language.
        </p>
        <div className="flex flex-wrap gap-2">
          {supportedFormats.map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600"
            >
              {item}
            </span>
          ))}
        </div>
        <Button asChild size="lg" className="h-11 gap-2 px-5">
          <Link to="/upload">
            Upload Scan for Analysis
            <ArrowRight size={16} />
          </Link>
        </Button>
      </div>
    </section>
  );
}
