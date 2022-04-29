import { StateFrom } from "xstate";
import { antalVarerPaaDato, sorteredeDatoerFraVarer } from "../utils/ordre";
import { ordreMaskine } from "./ordreMaskine";

export function sorteredeDatoerSelector(state: StateFrom<typeof ordreMaskine>) {
  return sorteredeDatoerFraVarer(state.context.varer).map(
    (time) => new Date(time)
  );
}

export function datoerHvorManIkkeKanBestilleSelector(
  state: StateFrom<typeof ordreMaskine>
) {
  return state.context.datoerHvorManIkkeKanBestille;
}

export function antalVarerForHeleOrdrenSelector(sorteredeDatoer: Date[]) {
  return (state: StateFrom<typeof ordreMaskine>) =>
    sorteredeDatoer.reduce(
      (acc, dato) => acc + antalVarerPaaDato(dato, state.context.varer),
      0
    );
}
