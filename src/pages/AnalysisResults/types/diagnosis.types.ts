export interface AbnormalArea {
  location: string;
  description: string;
  extent: string;
  abnormalityReason: string;
}

export interface RankedDiagnosis {
  condition: string;
  likelihood: "High" | "Moderate" | "Low";
  rationale: string;
  supportingFindings: string[];
  contradictingFindings: string[] | null;
  references: string[];
}

export interface DifferentialDiagnosis {
  condition: string;
  distinguishingTest: string;
  reasoning: string;
}

export interface SeverityAssessment {
  level: "Moderate" | "Normal" | "Mild" | "Severe" | "Critical";
  justification: string;
  urgent: boolean;
}

export interface DiagnosisResult {
  observations: string[];
  detailedDescription: string;
  abnormalAreas: AbnormalArea[];
  rankedDiagnoses: RankedDiagnosis[];
  differentialDiagnoses: DifferentialDiagnosis[];
  severity: SeverityAssessment;
  patientExplanation: string;
  firstPrinciplesBreakdown: Record<string, unknown>;
}
