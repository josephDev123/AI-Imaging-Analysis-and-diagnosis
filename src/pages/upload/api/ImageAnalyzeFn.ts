import type { DiagnosisResult } from "@/pages/AnalysisResults/types/diagnosis.types";
import axios, { AxiosError } from "axios";

export async function ImageAnalyzeFn(file: File) {
  try {
    const formData = new FormData();
    formData.set("MedFileupload", file);

    const result = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_BASE_API_URL}/med-imaging/create`,
      data: formData,
    });
    return result.data as { msg: string; data: DiagnosisResult };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.request) {
        throw new Error(
          error.request.data.message ||
            "Something went wrong while sending  the imaging",
        );
      }

      if (error.response) {
        throw new Error(
          error.response.data?.message ||
            "Something went wrong while analyzing the imaging",
        );
      }
    }

    if (error instanceof Error) {
      throw new Error(
        error?.message || "Something went wrong while analyzing the imaging",
      );
    }

    throw new Error("Something went wrong while analyzing the imaging");
  }
}
