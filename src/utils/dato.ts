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
import { ordreCutoff, ordreStart } from "./ordre";

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

export function standardDatoerHvorManIkkeKanBestiller() {
  return [...lukkedeDage(), ...helligdage()];
}

export function datoerHvorManIkkeKanBestillePizzaDej() {
  const alleDageDerIkkeErFredagIligeUge = eachDayOfInterval({
    start: new Date(),
    end: ordreCutoff,
  }).filter(erIkkeFredagLigeUge);

  return [
    ...lukkedeDage(),
    ...alleDageDerIkkeErFredagIligeUge,
    ...helligdage(),
  ];
}
