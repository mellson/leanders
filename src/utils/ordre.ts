import { OrdreMaskineContext } from "@/xstate/ordreMaskine";
import {
  addDays,
  isFriday,
  isMonday,
  isSameDay,
  isSaturday,
  startOfDay,
} from "date-fns";

export const ordreStart = startOfDay(addDays(new Date(), 1));
export const ordreCutoff = startOfDay(addDays(new Date(), 60));

export function defaultVarerMap(): OrdreMaskineContext["varer"] {
  return new Map();
}

export function bygVarer(
  varer: OrdreMaskineContext["varer"],
  dato: Date,
  vareId: number,
  antal: number,
  increment = false
) {
  if (varer.size > 0) {
    const eksisterendeVarer = varer.get(dato.getTime());
    if (eksisterendeVarer) {
      const antalEksisterendeVarer = eksisterendeVarer.get(vareId) ?? 0;

      // Hvis vi er ved at forøge skal vi ikke overskrive men blot ligge 1 til
      const antalVarer = increment ? antalEksisterendeVarer + 1 : antal;

      if (antalVarer > 0) {
        return varer.set(
          dato.getTime(),
          eksisterendeVarer.set(vareId, antalVarer)
        );
      } else {
        eksisterendeVarer.delete(vareId);
        return varer;
      }
    } else {
      return varer.set(dato.getTime(), new Map([[vareId, antal]]));
    }
  } else {
    return new Map([[dato.getTime(), new Map([[vareId, antal]])]]);
  }
}

export const datoerPizzaDejIkkeKanBestilles = [
  new Date(2023, 6, 14),
  new Date(2023, 6, 28),
];
export const datoerSpeltbrødIkkeKanBestilles = [
  new Date(2023, 6, 14),
  new Date(2023, 6, 28),
];
export const pizzaDejVareId = 12; // Pizzadej kan kun bestilles fredag og lørdag
export function erPizzaDej(vareId: number) {
  return vareId === pizzaDejVareId;
}

export const speltBroedVareId = 4; // Pizzadej kan kun bestilles fredag i lige uger
export function erSpeltbrød(vareId: number) {
  return vareId === speltBroedVareId;
}

export function datoErOkTilVare(vareId: number, dato?: Date) {
  if (erPizzaDej(vareId) && dato) {
    return (
      (isFriday(dato) || isSaturday(dato)) &&
      !datoerPizzaDejIkkeKanBestilles.some((datoHvorManIkkeKanBestille) =>
        isSameDay(dato, datoHvorManIkkeKanBestille)
      )
    );
  } else if (erSpeltbrød(vareId) && dato) {
    return !isMonday(dato);
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

export function samletPris(
  varer: OrdreMaskineContext["varer"],
  databaseVarer: OrdreMaskineContext["databaseVarer"]
) {
  return Array.from(varer.values()).reduce((acc, vareMap) => {
    const priser = Array.from(vareMap.keys()).map((vareId) => {
      const pris = databaseVarer[vareId]?.pris ?? 0;
      const antal = vareMap.get(vareId) ?? 0;
      return pris * antal;
    });

    return acc + priser.reduce((acc2, pris) => acc2 + pris, 0);
  }, 0);
}

export function samletPrisPaaDato(
  dato: Date,
  varer: OrdreMaskineContext["varer"],
  databaseVarer: OrdreMaskineContext["databaseVarer"]
) {
  const varerPaaDato = varer.get(dato.getTime());
  if (varerPaaDato) {
    const priser = Array.from(varerPaaDato.keys()).map((vareId) => {
      const vare = databaseVarer.find((vare) => vare.id === vareId);
      const pris = vare?.pris ?? 0;
      const antal = varerPaaDato.get(vareId) ?? 0;
      return pris * antal;
    });

    return priser.reduce((acc, pris) => acc + pris, 0);
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
