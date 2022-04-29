import { format, isFriday } from "date-fns";
import { da } from "date-fns/locale";

export function erLigeUge(dato: Date) {
  const ugeNummerString = format(dato, "w", { locale: da });
  const ugeNummer = parseInt(ugeNummerString);
  return ugeNummer % 2 === 0;
}

export function erFredagLigeUge(dato: Date) {
  return isFriday(dato) && erLigeUge(dato);
}

export function erFredagUligeUge(dato: Date) {
  return isFriday(dato) && !erLigeUge(dato);
}
