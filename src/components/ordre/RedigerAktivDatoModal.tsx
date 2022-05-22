import { CenterModal } from "@/components/CenterModal";
import Kalender from "@/components/Kalender";
import { AppContext } from "@/utils/context";
import { datoerHvorManIkkeKanBestilleSelector } from "@/xstate/selectors";
import { Center } from "@chakra-ui/react";
import { useSelector } from "@xstate/react";
import * as React from "react";

export default function RedigerAktivDatoModal() {
  const appContext = React.useContext(AppContext);
  const udskifterDato = useSelector(appContext.ordreActor, (state) =>
    state.matches("Udskifter dato")
  );
  const aktivDato = useSelector(
    appContext.ordreActor,
    (state) => state.context.aktivDato
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
      undertitel="Rediger dato"
      isOpen={udskifterDato}
      deleteText="Fjern dato"
      onDelete={() => send({ type: "Slet aktiv dato" })}
      onClose={() => send({ type: "Afbryd" })}
    >
      <Center>
        <Kalender
          disabledDates={datoerHvorManIkkeKanBestille}
          value={aktivDato}
          onChange={(nyDato) =>
            send({
              type: "Udskift aktiv dato",
              dato: nyDato,
            })
          }
        />
      </Center>
    </CenterModal>
  );
}
