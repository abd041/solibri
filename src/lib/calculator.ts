export type CalculatorInput = {
  peptideMg: number;
  bacWaterMl: number;
  desiredDoseMg: number;
};

export type CalculatorResult = {
  valid: boolean;
  concentrationMgPerMl: number | null;
  drawVolumeMl: number | null;
  insulinUnits: number | null;
  mlPerUnit: number;
  mlPerMg: number | null;
  unitsPerMg: number | null;
  totalDoses: number | null;
  exceedsSyringe: boolean;
  doseExceedsPeptide: boolean;
  maxDoseMgForSyringe: number | null;
  maxBacWaterMlForSyringe: number | null;
};

export const DEFAULT_CALCULATOR_VALUES = {
  peptideMg: "10",
  bacWaterMl: "2",
  desiredDoseMg: "1.25",
};

const INVALID_RESULT: CalculatorResult = {
  valid: false,
  concentrationMgPerMl: null,
  drawVolumeMl: null,
  insulinUnits: null,
  mlPerUnit: 0.01,
  mlPerMg: null,
  unitsPerMg: null,
  totalDoses: null,
  exceedsSyringe: false,
  doseExceedsPeptide: false,
  maxDoseMgForSyringe: null,
  maxBacWaterMlForSyringe: null,
};

function roundTo(value: number, digits: number) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export function parseCalculatorNumber(value: string): number | null {
  const trimmed = value.trim().replace(",", ".");
  if (!trimmed) return null;
  const n = Number(trimmed);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

export function calculateDosage(input: CalculatorInput): CalculatorResult {
  const { peptideMg, bacWaterMl, desiredDoseMg } = input;
  if (peptideMg <= 0 || bacWaterMl <= 0 || desiredDoseMg <= 0) {
    return INVALID_RESULT;
  }

  const concentrationMgPerMl = peptideMg / bacWaterMl;
  const drawVolumeMl = desiredDoseMg / concentrationMgPerMl;
  const insulinUnits = 100 * drawVolumeMl;
  const mlPerMg = 1 / concentrationMgPerMl;

  return {
    valid: true,
    concentrationMgPerMl: roundTo(concentrationMgPerMl, 2),
    drawVolumeMl: roundTo(drawVolumeMl, 3),
    insulinUnits: roundTo(insulinUnits, 1),
    mlPerUnit: 0.01,
    mlPerMg: roundTo(mlPerMg, 3),
    unitsPerMg: roundTo(100 * mlPerMg, 1),
    totalDoses: roundTo(peptideMg / desiredDoseMg, 1),
    exceedsSyringe: insulinUnits > 100,
    doseExceedsPeptide: desiredDoseMg > peptideMg,
    maxDoseMgForSyringe: roundTo(concentrationMgPerMl, 3),
    maxBacWaterMlForSyringe: roundTo(peptideMg / desiredDoseMg, 2),
  };
}

export function resolveCalculatorResult(values: {
  peptideMg: string;
  bacWaterMl: string;
  desiredDoseMg: string;
}): CalculatorResult {
  const peptideMg = parseCalculatorNumber(values.peptideMg);
  const bacWaterMl = parseCalculatorNumber(values.bacWaterMl);
  const desiredDoseMg = parseCalculatorNumber(values.desiredDoseMg);
  if (peptideMg == null || bacWaterMl == null || desiredDoseMg == null) {
    return calculateDosage({ peptideMg: 0, bacWaterMl: 0, desiredDoseMg: 0 });
  }
  return calculateDosage({ peptideMg, bacWaterMl, desiredDoseMg });
}

export function formatQty(value: number | null | undefined, digits = 2, fallback = "—"): string {
  if (value == null) return fallback;
  const raw = value.toFixed(digits);
  if (digits <= 0) return raw;
  return raw.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
}
