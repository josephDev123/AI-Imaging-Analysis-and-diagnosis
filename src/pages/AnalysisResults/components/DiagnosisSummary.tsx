import type { DiagnosisResult } from "../types/diagnosis.types";

interface DiagnosisSummaryProps {
  result: DiagnosisResult;
}

function severityStyle(level: DiagnosisResult["severity"]["level"]) {
  if (level === "Critical") return "bg-rose-100 text-rose-700 border-rose-200";
  if (level === "Severe") return "bg-orange-100 text-orange-700 border-orange-200";
  if (level === "Moderate")
    return "bg-amber-100 text-amber-700 border-amber-200";
  if (level === "Mild") return "bg-sky-100 text-sky-700 border-sky-200";
  return "bg-emerald-100 text-emerald-700 border-emerald-200";
}

function likelihoodStyle(level: "High" | "Moderate" | "Low") {
  if (level === "High") return "bg-rose-50 text-rose-700 border-rose-200";
  if (level === "Moderate")
    return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-slate-100 text-slate-700 border-slate-300";
}

export function DiagnosisSummary({ result }: DiagnosisSummaryProps) {
  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-slate-300 bg-white p-5">
        <h2 className="mb-3 text-base font-semibold text-slate-900">Severity</h2>
        <div
          className={[
            "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
            severityStyle(result.severity.level),
          ].join(" ")}
        >
          {result.severity.level}
        </div>
        <p className="mt-2 text-sm text-slate-700">{result.severity.justification}</p>
      </section>

      <section className="rounded-2xl border border-slate-300 bg-white p-5">
        <h2 className="mb-3 text-base font-semibold text-slate-900">Observations</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
          {result.observations.map((observation) => (
            <li key={observation}>{observation}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-300 bg-white p-5">
        <h2 className="mb-3 text-base font-semibold text-slate-900">
          Detailed Description
        </h2>
        <p className="text-sm leading-relaxed text-slate-700">
          {result.detailedDescription}
        </p>
      </section>

      <section className="rounded-2xl border border-slate-300 bg-white p-5">
        <h2 className="mb-3 text-base font-semibold text-slate-900">
          Abnormal Areas
        </h2>
        <div className="space-y-3">
          {result.abnormalAreas.map((area) => (
            <article key={`${area.location}-${area.description}`} className="rounded-xl border border-slate-200 p-3">
              <p className="text-sm font-semibold text-slate-900">{area.location}</p>
              <p className="mt-1 text-sm text-slate-700">{area.description}</p>
              <p className="mt-1 text-xs text-slate-500">Extent: {area.extent}</p>
              <p className="mt-2 text-xs text-slate-600">{area.abnormalityReason}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-300 bg-white p-5">
        <h2 className="mb-3 text-base font-semibold text-slate-900">
          Ranked Diagnoses
        </h2>
        <div className="space-y-3">
          {result.rankedDiagnoses.map((diagnosis) => (
            <article key={diagnosis.condition} className="rounded-xl border border-slate-200 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-900">
                  {diagnosis.condition}
                </p>
                <span
                  className={[
                    "inline-flex rounded-full border px-2 py-0.5 text-xs font-medium",
                    likelihoodStyle(diagnosis.likelihood),
                  ].join(" ")}
                >
                  {diagnosis.likelihood}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-700">{diagnosis.rationale}</p>
              <p className="mt-2 text-xs font-medium text-slate-600">
                Supporting findings: {diagnosis.supportingFindings.join("; ")}
              </p>
              {diagnosis.contradictingFindings?.length ? (
                <p className="mt-1 text-xs text-slate-500">
                  Contradicting findings:{" "}
                  {diagnosis.contradictingFindings.join("; ")}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-300 bg-white p-5">
        <h2 className="mb-3 text-base font-semibold text-slate-900">
          Differential Diagnoses
        </h2>
        <div className="space-y-3">
          {result.differentialDiagnoses.map((item) => (
            <article key={item.condition} className="rounded-xl border border-slate-200 p-3">
              <p className="text-sm font-semibold text-slate-900">{item.condition}</p>
              <p className="mt-1 text-xs text-slate-600">
                Distinguishing test: {item.distinguishingTest}
              </p>
              <p className="mt-1 text-sm text-slate-700">{item.reasoning}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-300 bg-white p-5">
        <h2 className="mb-3 text-base font-semibold text-slate-900">
          Patient-Friendly Explanation
        </h2>
        <p className="text-sm leading-relaxed text-slate-700">
          {result.patientExplanation}
        </p>
      </section>
    </div>
  );
}
