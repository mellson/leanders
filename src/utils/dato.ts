import { OrdreMaskineContext } from "@/xstate/ordreMaskine";
import {
  eachDayOfInterval,
  eachWeekendOfInterval,
  format,
  isFriday,
  isSunday,
  parseISO,
} from "date-fns";
import { da } from "date-fns/locale";
import Holidays from "date-holidays";
import {
  erPizzaDej,
  ordreCutoff,
  ordreStart,
  sorteredeDatoerFraVarer,
} from "./ordre";

export function erLigeUge(dato: Date) {
  const ugeNummerString = format(dato, "w", { locale: da });
  const ugeNummer = parseInt(ugeNummerString);
  return ugeNummer % 2 === 0;
}

export function erFredagLigeUge(dato: Date) {
  return isFriday(dato) && erLigeUge(dato);
}

export function erIkkeFredagLigeUge(dato: Date) {
  return !erFredagLigeUge(dato);
}

export function erFredagUligeUge(dato: Date) {
  return isFriday(dato) && !erLigeUge(dato);
}

function helligdage() {
  return new Holidays("DK")
    .getHolidays(ordreStart)
    .map((helligdag) => parseISO(helligdag.date)); // Her bruger vi parseISO fra date-fns, da en alm. new Date() ikke virker på iPhone
}

function lukkedeDage() {
  return eachWeekendOfInterval({
    start: new Date(),
    end: ordreCutoff,
  }).filter(isSunday); // Pt. er alle søndage lukkede
}

const saerligeLukkedage = [new Date(2023, 3, 8)];

export function standardDatoerHvorManIkkeKanBestiller(
  varer: OrdreMaskineContext["varer"]
) {
  return [
    ...sorteredeDatoerFraVarer(varer).map((time) => new Date(time)),
    ...lukkedeDage(),
    ...helligdage(),
    ...saerligeLukkedage,
  ];
}

export function datoerHvorManIkkeKanBestillePizzaDej(
  varer: OrdreMaskineContext["varer"]
) {
  const alleDageDerIkkeErFredagIligeUge = eachDayOfInterval({
    start: new Date(),
    end: ordreCutoff,
  }).filter(erIkkeFredagLigeUge);

  return [
    ...sorteredeDatoerFraVarer(varer).map((time) => new Date(time)),
    ...lukkedeDage(),
    ...alleDageDerIkkeErFredagIligeUge,
    ...helligdage(),
  ];
}

export const getDatoVejledning = (vareId: number) => {
  if (erPizzaDej(vareId)) {
    return "Pizza dej kan bestilles fredage i lige uger";
  }
  return "Du kan bestille mandag til lørdag, minus helligdage";
};
