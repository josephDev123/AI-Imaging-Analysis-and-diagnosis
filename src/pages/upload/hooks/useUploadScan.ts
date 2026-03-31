import { useEffect, useMemo, useState } from "react";
import type { SupportedMediaKind } from "../types/upload.types";
import { useMutation } from "@tanstack/react-query";
import { ImageAnalyzeFn } from "../api/ImageAnalyzeFn";
import { toast } from "sonner";

const ACCEPTED_MIME_PREFIXES = ["image/png", "image/jpeg"] as const;
const FILE_SIZE_LIMIT_BYTES = 40 * 1024 * 1024;
// const ANALYZE_DELAY_MS = 1200;

function detectMediaKind(file: File): SupportedMediaKind | null {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("video/")) return "video";
  return null;
}

function validateFile(file: File): string | null {
  console.log("Validating file:", file);
  const hasSupportedMime = ACCEPTED_MIME_PREFIXES.some((prefix) =>
    file.type.startsWith(prefix),
  );
  if (!hasSupportedMime) {
    return "Unsupported file type. Please upload an image or video file.";
  }
  if (file.size > FILE_SIZE_LIMIT_BYTES) {
    return "File is too large. Maximum supported size is 40MB.";
  }
  return null;
}

export function useUploadScan() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [mediaKind, setMediaKind] = useState<SupportedMediaKind | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  // const [isAnalyzing, setIsAnalyzing] = useState(false);

  // mutation
  const {
    mutateAsync,
    isPending: isAnalyzing,
    isError,
    error,
  } = useMutation({
    mutationKey: ["Imaging analyze"],
    mutationFn: async (file: File) => await ImageAnalyzeFn(file),
  });

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const canAnalyze = useMemo(
    () => Boolean(selectedFile && previewUrl && mediaKind && !validationError),
    [mediaKind, previewUrl, selectedFile, validationError],
  );

  function clearSelection() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setMediaKind(null);
    setValidationError(null);
    // setIsAnalyzing(false);
  }

  function selectFile(file: File | null) {
    if (!file) return;

    const fileError = validateFile(file);
    if (fileError) {
      clearSelection();
      setValidationError(fileError);
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setValidationError(null);
    setSelectedFile(file);
    setMediaKind(detectMediaKind(file));
    setPreviewUrl(URL.createObjectURL(file));
  }

  // async function analyze() {
  // setIsAnalyzing(true);
  // await new Promise((resolve) => setTimeout(resolve, ANALYZE_DELAY_MS));
  // mutate(selectedFile!, {
  //   onError: (error) => {
  //     toast.error(error.message || "AI Imaging  Analyzing failed");
  //     return;
  //   },
  //   onSuccess(data) {
  //     toast.error(data.msg || "AI Imaging diagnosis successful");
  //     return;
  //   },
  // });
  // setIsAnalyzing(false);
  // }

  async function analyze() {
    try {
      const data = await mutateAsync(selectedFile!);
      toast.success(data.msg || "AI Imaging diagnosis successful");
      return data;
    } catch (error: unknown) {
      const CastError = error as unknown as Error;
      toast.error(CastError.message || "AI Imaging Analyzing failed");
      throw error; // important
    }
  }

  return {
    selectedFile,
    previewUrl,
    mediaKind,
    validationError,
    canAnalyze,
    isAnalyzing,
    isError,
    error,
    selectFile,
    clearSelection,
    analyze,
  };
}
