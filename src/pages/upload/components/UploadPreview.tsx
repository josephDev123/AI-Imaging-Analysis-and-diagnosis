import type { SupportedMediaKind } from "../types/upload.types";

interface UploadPreviewProps {
  previewUrl: string;
  mediaKind: SupportedMediaKind;
  fileName: string;
  onClear: () => void;
}

export function UploadPreview({
  previewUrl,
  mediaKind,
  fileName,
  onClear,
}: UploadPreviewProps) {
  return (
    <section className="rounded-2xl border border-slate-300 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-slate-900">Preview</h2>
        <button
          type="button"
          onClick={onClear}
          className="rounded-md border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
        >
          Remove
        </button>
      </div>
      {mediaKind === "image" ? (
        <img
          src={previewUrl}
          alt={fileName}
          className="aspect-video w-full rounded-xl object-cover"
        />
      ) : (
        <video
          controls
          src={previewUrl}
          className="aspect-video w-full rounded-xl object-cover"
        />
      )}
      <p className="mt-2 truncate text-xs text-slate-500">{fileName}</p>
    </section>
  );
}
