import type { DiagnosisResult } from "@/pages/AnalysisResults/types/diagnosis.types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: DiagnosisResult = {
  observations: [],
  detailedDescription: "",
  abnormalAreas: [],
  rankedDiagnoses: [],
  differentialDiagnoses: [],
  severity: {
    level: "Normal",
    justification: "",
    urgent: false,
  },
  patientExplanation: "",
  firstPrinciplesBreakdown: {},
};
export const imagingDiagnosisSlice = createSlice({
  name: "imagingDiagnosis",
  initialState,
  reducers: {
    setDiagnosis: (_, action: PayloadAction<DiagnosisResult>) => {
      return action.payload;
    },

    updateSeverity: (
      state,
      action: PayloadAction<DiagnosisResult["severity"]>,
    ) => {
      state.severity = action.payload;
    },

    clearDiagnosis: () => initialState,
  },
});

export const { setDiagnosis, updateSeverity, clearDiagnosis } =
  imagingDiagnosisSlice.actions;

export default imagingDiagnosisSlice.reducer;
