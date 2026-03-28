import { AlertCircle, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "./components/UploadDropzone";
import { UploadPreview } from "./components/UploadPreview";
import { useUploadScan } from "./hooks/useUploadScan";
import type { UploadNavigationState } from "./types/upload.types";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setDiagnosis } from "@/lib/redux/slices/ImagingDiagnosisSlice";

export function UploadScreenPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isDragging, setIsDragging] = useState(false);
  const {
    selectedFile,
    previewUrl,
    mediaKind,
    validationError,
    canAnalyze,
    isAnalyzing,
    // isError,
    // error,
    selectFile,
    clearSelection,
    analyze,
  } = useUploadScan();

  async function handleAnalyze() {
    if (!selectedFile || !previewUrl || !mediaKind) return;
    const result = await analyze();
    const navigationState: UploadNavigationState = {
      fileName: selectedFile.name,
      fileType: selectedFile.type,
      mediaKind,
      previewUrl,
    };
    dispatch(setDiagnosis(result.data));
    navigate("/results", { state: navigationState });
  }

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
          Image Upload
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Upload a Scan for AI Analysis
        </h1>
        <p className="max-w-3xl text-sm text-slate-600 sm:text-base">
          Upload medical images, validate quality, then run AI analysis for
          structured diagnostic insights.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-4 rounded-2xl border border-slate-300 bg-white p-5 shadow-sm sm:p-6">
          <UploadDropzone
            isDragging={isDragging}
            onDragStateChange={setIsDragging}
            onFileSelected={selectFile}
          />

          {validationError ? (
            <div className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{validationError}</span>
            </div>
          ) : null}

          <Button
            type="button"
            size="lg"
            onClick={handleAnalyze}
            disabled={!canAnalyze || isAnalyzing}
            className="h-11 w-full justify-center gap-2 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <LoaderCircle className="animate-spin" size={16} />
                Analyzing scan...
              </>
            ) : (
              "Analyze Image"
            )}
          </Button>
        </section>

        {previewUrl && mediaKind && selectedFile ? (
          <UploadPreview
            previewUrl={previewUrl}
            mediaKind={mediaKind}
            fileName={selectedFile.name}
            onClear={clearSelection}
          />
        ) : (
          <section className="rounded-2xl border border-slate-300/80 bg-slate-50 p-6 text-sm text-slate-600">
            Select a valid file to enable preview and analysis.
          </section>
        )}
      </div>
    </section>
  );
}
