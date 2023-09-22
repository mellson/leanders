import { CenterModal } from "@/components/CenterModal";
import Kalender from "@/components/Kalender";
import { AppContext } from "@/utils/context";
import {
  datoerPizzaDejIkkeKanBestilles,
  datoerSpeltbrødIkkeKanBestilles,
  pizzaDejVareId,
  speltBroedVareId,
} from "@/utils/ordre";
import { datoerHvorManIkkeKanBestilleSelector } from "@/xstate/selectors";
import { Center } from "@chakra-ui/react";
import { useSelector } from "@xstate/react";
import { useContext } from "react";
import * as React from "react";

export default function SaetAktivDatoModal() {
  const appContext = useContext(AppContext);
  const vaelgerDato = useSelector(appContext.ordreActor, (state) =>
    state.matches("Vælg aktiv dato")
  );
  const datoerHvorManIkkeKanBestille = useSelector(
    appContext.ordreActor,
    datoerHvorManIkkeKanBestilleSelector
  );
  const midlertidigVare = useSelector(
    appContext.ordreActor,
    (emitted) => emitted.context.midlertidigVare
  );
  const erVedAtBestillePizzadej = midlertidigVare === pizzaDejVareId;
  const erVedAtBestilleSpeltbrød = midlertidigVare === speltBroedVareId;
  const datoVejledning = useSelector(
    appContext.ordreActor,
    (state) => state.context.datoVejledning ?? ""
  );
  const { send } = appContext.ordreActor;

  return (
    <CenterModal
      titel="Vælg dato til ordren"
      undertitel={datoVejledning}
      isOpen={vaelgerDato}
      onClose={() => send({ type: "Afbryd" })}
    >
      <Center>
        <Kalender
          disabledDates={
            erVedAtBestillePizzadej
              ? datoerHvorManIkkeKanBestille.concat(
                  datoerPizzaDejIkkeKanBestilles
                )
              : erVedAtBestilleSpeltbrød
              ? datoerHvorManIkkeKanBestille.concat(
                  datoerSpeltbrødIkkeKanBestilles
                )
              : datoerHvorManIkkeKanBestille
          }
          onChange={(nyDato) =>
            send({
              type: "Sæt aktiv dato",
              dato: nyDato,
            })
          }
        />
      </Center>
    </CenterModal>
  );
}
