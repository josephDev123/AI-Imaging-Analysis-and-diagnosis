// import { useEffect, useState } from "react";
// import { getMockDiagnosisResult } from "../api/getMockDiagnosisResult";
// import type { DiagnosisResult } from "../types/diagnosis.types";
import { useAppSelector } from "@/lib/redux/hooks";

export function useDiagnosisResult(_: boolean) {
  // const [result, setResult] = useState<DiagnosisResult | null>(null);
  const result = useAppSelector((state) => state.AIDiagnosis);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   if (!enabled) return;

  //   let isCancelled = false;

  //   async function load() {
  //     setIsLoading(true);
  //     setError(null);
  //     try {
  //       const response = await getMockDiagnosisResult();
  //       if (!isCancelled) {
  //         setResult(response);
  //       }
  //     } catch {
  //       if (!isCancelled) {
  //         setError("Unable to load analysis results.");
  //       }
  //     } finally {
  //       if (!isCancelled) {
  //         setIsLoading(false);
  //       }
  //     }
  //   }

  //   void load();

  //   return () => {
  //     isCancelled = true;
  //   };
  // }, [enabled]);

  return { result };
}
