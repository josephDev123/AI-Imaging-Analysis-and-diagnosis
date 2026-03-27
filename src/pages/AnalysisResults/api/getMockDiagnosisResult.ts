import type { DiagnosisResult } from "../types/diagnosis.types";

const MOCK_DIAGNOSIS_RESULT: DiagnosisResult = {
  observations: [
    "Patchy bilateral lower-lobe opacities are visible.",
    "Cardiomediastinal silhouette remains within normal limits.",
    "No pleural effusion or pneumothorax identified.",
  ],
  detailedDescription:
    "The scan demonstrates multifocal peripheral opacities more pronounced in the lower lobes, with mild interstitial prominence. Findings are most consistent with an active inflammatory pulmonary process.",
  abnormalAreas: [
    {
      location: "Right lower lobe",
      description: "Ground-glass and patchy consolidative opacity",
      extent: "Mild to moderate",
      abnormalityReason:
        "Pattern suggests inflammatory or infectious involvement of alveolar spaces.",
    },
    {
      location: "Left lower lobe",
      description: "Subpleural streaky opacity",
      extent: "Mild",
      abnormalityReason:
        "Likely reactive interstitial change associated with ongoing pulmonary irritation.",
    },
  ],
  rankedDiagnoses: [
    {
      condition: "Community-acquired pneumonia",
      likelihood: "High",
      rationale:
        "Distribution and density of opacities align with infectious airspace disease.",
      supportingFindings: [
        "Patchy bilateral lower lobe opacities",
        "Ground-glass and consolidative mix",
        "No large pleural effusion",
      ],
      contradictingFindings: null,
      references: ["IDSA CAP Guidelines", "Radiology Assistant: Pneumonia"],
    },
    {
      condition: "Viral pneumonitis",
      likelihood: "Moderate",
      rationale:
        "Peripheral ground-glass emphasis can reflect viral inflammatory process.",
      supportingFindings: [
        "Bilateral lower lobe involvement",
        "Ground-glass predominance",
      ],
      contradictingFindings: ["No diffuse bilateral reticulation"],
      references: ["RSNA Thoracic Imaging Resource"],
    },
    {
      condition: "Cardiogenic pulmonary edema",
      likelihood: "Low",
      rationale:
        "Lack of cardiomegaly and pleural effusions lowers probability.",
      supportingFindings: ["Interstitial markings present"],
      contradictingFindings: [
        "Normal heart silhouette",
        "No pleural fluid accumulation",
      ],
      references: ["ESC Heart Failure Imaging Summary"],
    },
  ],
  differentialDiagnoses: [
    {
      condition: "Atypical bacterial pneumonia",
      distinguishingTest: "Sputum culture or multiplex respiratory PCR",
      reasoning: "Pathogen identification clarifies antimicrobial targeting.",
    },
    {
      condition: "Pulmonary embolic infarct",
      distinguishingTest: "CT pulmonary angiography",
      reasoning: "Excludes perfusion-related wedge infarction pattern.",
    },
  ],
  severity: {
    level: "Moderate",
    justification:
      "Airspace disease is present in multiple regions without signs of critical decompensation.",
    urgent: false,
  },
  patientExplanation:
    "Your scan shows signs of inflammation in parts of both lungs. This pattern often appears with a chest infection. It is important to follow up with your doctor for exam, oxygen check, and treatment guidance.",
  firstPrinciplesBreakdown: {
    signalQuality: "Adequate quality for primary interpretation",
    reasoningSteps: [
      "Identify focal and diffuse opacities",
      "Assess distribution and side predominance",
      "Compare with edema and noninfectious patterns",
      "Rank diagnosis by fit to visual evidence",
    ],
  },
};

export async function getMockDiagnosisResult(): Promise<DiagnosisResult> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return MOCK_DIAGNOSIS_RESULT;
}
