// import { LoaderCircle } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { DiagnosisSummary } from "./components/DiagnosisSummary";
import { useDiagnosisResult } from "./hooks/useDiagnosisResult";
import type { UploadNavigationState } from "../upload/types/upload.types";

function PreviewPanel({ state }: { state: UploadNavigationState }) {
  return (
    <section className="rounded-2xl border border-slate-300 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-base font-semibold text-slate-900">
        Scan Preview
      </h2>
      {state.mediaKind === "image" ? (
        <img
          src={state.previewUrl}
          alt={state.fileName}
          className="aspect-video w-full rounded-xl object-cover"
        />
      ) : (
        <video
          controls
          src={state.previewUrl}
          className="aspect-video w-full rounded-xl object-cover"
        />
      )}
      <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs text-slate-600">
        <p className="truncate">File: {state.fileName}</p>
        <p className="truncate">Type: {state.fileType || "Unknown"}</p>
      </div>
    </section>
  );
}

export function AnalysisResultPage() {
  const location = useLocation();
  const navigationState = location.state as UploadNavigationState | undefined;
  const { result } = useDiagnosisResult(Boolean(navigationState));

  if (!navigationState) {
    return (
      <section className="rounded-2xl border border-slate-300 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">
          No scan selected
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Upload an image or video first to generate AI analysis results.
        </p>
        <Button asChild className="mt-5">
          <Link to="/upload">Go to Upload</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
          Analysis Results
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Structured Diagnostic Review
        </h1>
      </header>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <PreviewPanel state={navigationState} />

        {result ? <DiagnosisSummary result={result} /> : null}
      </div>
    </section>
  );
}

// isLoading ? (
//           <section className="flex min-h-[260px] items-center justify-center rounded-2xl border border-slate-300 bg-white p-6">
//             <div className="flex items-center gap-2 text-sm text-slate-700">
//               <LoaderCircle size={18} className="animate-spin" />
//               Loading diagnostic analysis...
//             </div>
//           </section>
//         ) : error ? (
//           <section className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">
//             {error}
//           </section>
//         ) :
