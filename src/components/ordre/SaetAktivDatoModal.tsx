import { CenterModal } from "@/components/CenterModal";
import Kalender from "@/components/Kalender";
import { AppContext } from "@/utils/context";
import { datoerHvorManIkkeKanBestilleSelector } from "@/xstate/selectors";
import { Center } from "@chakra-ui/react";
import { useSelector } from "@xstate/react";
import * as React from "react";

export default function SaetAktivDatoModal() {
  const appContext = React.useContext(AppContext);
  const vaelgerDato = useSelector(appContext.ordreActor, (state) =>
    state.matches("Vælg aktiv dato")
  );
  const datoerHvorManIkkeKanBestille = useSelector(
    appContext.ordreActor,
    datoerHvorManIkkeKanBestilleSelector
  );
  const datoVejledning = useSelector(
    appContext.ordreActor,
    (state) => state.context.datoVejledning ?? ""
  );
  const { send } = appContext.ordreActor;

  return (
    <CenterModal
      titel={datoVejledning}
      undertitel="Vælg dato til ordren"
      isOpen={vaelgerDato}
      onClose={() => send({ type: "Afbryd" })}
    >
      <Center>
        <Kalender
          disabledDates={datoerHvorManIkkeKanBestille}
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
