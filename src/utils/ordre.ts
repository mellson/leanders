import { OrdreMaskineContext } from "@/xstate/ordreMaskine";

export function truncateDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
export const imorgen = truncateDate(new Date(Date.now() + 24 * 60 * 60 * 1000));

export function defaultVarerMap(): OrdreMaskineContext["varer"] {
  return new Map().set(imorgen.getTime(), new Map());
}

export function antalVarerPaaDato(
  dato: Date,
  varer: OrdreMaskineContext["varer"]
) {
  const varerPaaDato = varer.get(dato.getTime());
  if (varerPaaDato) {
    return Array.from(varerPaaDato.values()).reduce((acc, cur) => acc + cur, 0);
  } else {
    return 0;
  }
}

export function sorteredeDatoerFraVarer(varer: OrdreMaskineContext["varer"]) {
  return Array.from(varer.keys()).sort();
}

export function sammeDato(dato1: Date, dato2?: Date) {
  return dato2 && dato1.getTime() === dato2.getTime();
}
