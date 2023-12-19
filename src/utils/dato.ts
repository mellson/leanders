import { OrdreMaskineContext } from "@/xstate/ordreMaskine";
import {
  eachDayOfInterval,
  eachWeekendOfInterval,
  format,
  isFriday,
  isMonday,
  isSaturday,
  isSunday,
  parseISO,
} from "date-fns";
import { da } from "date-fns/locale";
import Holidays from "date-holidays";
import {
  erPizzaDej,
  erSpeltbrød,
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

const særligeLukkedage = [
  new Date(2023, 3, 8),
  ...eachDayOfInterval({
    start: new Date(2023, 9, 14),
    end: new Date(2023, 9, 23),
  }),
  ...eachDayOfInterval({
    start: new Date(2023, 11, 24),
    end: new Date(2023, 11, 30),
  }),
];

export function standardDatoerHvorManIkkeKanBestiller(
  varer: OrdreMaskineContext["varer"]
) {
  return [
    ...sorteredeDatoerFraVarer(varer).map((time) => new Date(time)),
    ...lukkedeDage(),
    ...helligdage(),
    ...særligeLukkedage,
  ];
}

export function datoerHvorManIkkeKanBestillePizzaDej(
  varer: OrdreMaskineContext["varer"]
) {
  const alleDageUndtagenFredagOgLørdag = eachDayOfInterval({
    start: new Date(),
    end: ordreCutoff,
  }).filter((dato) => !isFriday(dato) && !isSaturday(dato));

  return [
    ...sorteredeDatoerFraVarer(varer).map((time) => new Date(time)),
    ...lukkedeDage(),
    ...alleDageUndtagenFredagOgLørdag,
    ...særligeLukkedage,
    ...helligdage(),
    ...eachDayOfInterval({
      start: new Date(2023, 11, 22),
      end: new Date(2024, 0, 11),
    }),
  ];
}
export function datoerHvorManIkkeKanBestilleSpeltbrød(
  varer: OrdreMaskineContext["varer"]
) {
  const alleDageUndtagenMandag = eachDayOfInterval({
    start: new Date(),
    end: ordreCutoff,
  }).filter(isMonday);

  return [
    ...sorteredeDatoerFraVarer(varer).map((time) => new Date(time)),
    ...lukkedeDage(),
    ...alleDageUndtagenMandag,
    ...helligdage(),
  ];
}

export const getDatoVejledning = (vareId: number) => {
  if (erPizzaDej(vareId)) {
    return "Pizza dej kan bestilles fredag og lørdag";
  } else if (erSpeltbrød(vareId)) {
    return "Speltbrød kan bestilles alle dage undtagen mandag";
  }
  return "Du kan bestille mandag til lørdag, minus helligdage";
};
