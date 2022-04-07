import { OrdreMaskineContext } from "../xstate/ordreMaskine";

export const imorgen = new Date(Date.now() + 24 * 60 * 60 * 1000);

export function defaultVarerMap(): OrdreMaskineContext["varer"] {
  return new Map().set(imorgen, new Map());
}

export function sorteredeDatoerFraVarer(varer: OrdreMaskineContext["varer"]) {
  return Array.from(varer.keys()).sort((a, b) => a.getTime() - b.getTime());
}
