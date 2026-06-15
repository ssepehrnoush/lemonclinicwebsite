// Session storage helpers for passing the captured image + analysis between AI screens.
import type { AnalysisMode, AnalysisResult } from "./analyze.functions";

const IMG_KEY = "aineh:image";
const MODE_KEY = "aineh:mode";
const RESULT_KEY = "aineh:result";
const ANALYSIS_ID_KEY = "aineh:analysisId";

export function saveCapture(mode: AnalysisMode, dataUrl: string) {
  sessionStorage.setItem(MODE_KEY, mode);
  sessionStorage.setItem(IMG_KEY, dataUrl);
  sessionStorage.removeItem(RESULT_KEY);
  sessionStorage.removeItem(ANALYSIS_ID_KEY);
}
export function getCapture(): { mode: AnalysisMode; dataUrl: string } | null {
  const mode = sessionStorage.getItem(MODE_KEY) as AnalysisMode | null;
  const dataUrl = sessionStorage.getItem(IMG_KEY);
  if (!mode || !dataUrl) return null;
  return { mode, dataUrl };
}
export function saveResult(r: AnalysisResult, analysisId?: string) {
  sessionStorage.setItem(RESULT_KEY, JSON.stringify(r));
  if (analysisId) sessionStorage.setItem(ANALYSIS_ID_KEY, analysisId);
}
export function getResult(): AnalysisResult | null {
  const v = sessionStorage.getItem(RESULT_KEY);
  if (!v) return null;
  try { return JSON.parse(v) as AnalysisResult; } catch { return null; }
}
export function getAnalysisId(): string | null {
  return sessionStorage.getItem(ANALYSIS_ID_KEY);
}
export function clearAineh() {
  sessionStorage.removeItem(IMG_KEY);
  sessionStorage.removeItem(MODE_KEY);
  sessionStorage.removeItem(RESULT_KEY);
  sessionStorage.removeItem(ANALYSIS_ID_KEY);
}