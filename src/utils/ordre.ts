import { OrdreMaskineContext } from "@/xstate/ordreMaskine";
import { addDays, eachWeekOfInterval } from "date-fns";
import { da } from "date-fns/locale";
import { erFredagLigeUge, erFredagUligeUge } from "./dato";

export function truncateDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
export const ordreStart = truncateDate(addDays(new Date(), 1));
export const ordreCutoff = truncateDate(addDays(new Date(), 60));

export const fredageUligeUger = eachWeekOfInterval(
  {
    start: ordreStart,
    end: ordreCutoff,
  },
  { weekStartsOn: 5, locale: da }
).filter(erFredagUligeUge);

export function defaultVarerMap(): OrdreMaskineContext["varer"] {
  return new Map().set(ordreStart.getTime(), new Map());
}

export function bygVarer(
  varer: OrdreMaskineContext["varer"],
  dato: Date,
  vareId: number,
  antal: number,
  increment: boolean = false
) {
  if (varer.size > 0) {
    const eksisterendeVarer = varer.get(dato.getTime());
    if (eksisterendeVarer) {
      return varer.set(
        dato.getTime(),
        eksisterendeVarer.set(
          vareId,
          increment ? (eksisterendeVarer.get(vareId) ?? 0) + antal : antal
        )
      );
    } else {
      return varer.set(dato.getTime(), new Map([[vareId, antal]]));
    }
  } else {
    return new Map([[dato.getTime(), new Map([[vareId, antal]])]]);
  }
}

export function datoErOkTilVare(vareId: number, dato?: Date) {
  const pizzaDejVareId = 12; // Pizzadej kan kun bestilles fredag i lige uger
  if (vareId === pizzaDejVareId && dato) {
    return erFredagLigeUge(dato);
  }
  return dato !== undefined;
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
