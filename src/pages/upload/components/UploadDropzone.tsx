import { UploadCloud } from "lucide-react";
import { useRef } from "react";
import type { DragEvent } from "react";

interface UploadDropzoneProps {
  isDragging: boolean;
  onDragStateChange: (dragging: boolean) => void;
  onFileSelected: (file: File | null) => void;
}

export function UploadDropzone({
  isDragging,
  onDragStateChange,
  onFileSelected,
}: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    onDragStateChange(false);
    onFileSelected(event.dataTransfer.files?.[0] ?? null);
  }

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        onDragStateChange(true);
      }}
      onDragLeave={() => onDragStateChange(false)}
      onDrop={handleDrop}
      className={[
        "rounded-2xl border-2 border-dashed p-8 text-center transition-colors",
        isDragging
          ? "border-emerald-500 bg-emerald-50"
          : "border-slate-300 bg-slate-50",
      ].join(" ")}
    >
      <UploadCloud className="mx-auto mb-3 text-slate-500" size={28} />
      <p className="text-sm font-semibold text-slate-700">
        Drag and drop an image or video
      </p>
      <p className="mt-1 text-sm text-slate-600">or select from your device</p>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/png, image/jpeg,"
        onChange={(event) => onFileSelected(event.target.files?.[0] ?? null)}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
      >
        Pick File
      </button>
    </div>
  );
}
