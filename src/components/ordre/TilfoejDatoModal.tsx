import { CenterModal } from "@/components/CenterModal";
import Kalender from "@/components/Kalender";
import { AppContext } from "@/utils/context";
import { datoerHvorManIkkeKanBestilleSelector } from "@/xstate/selectors";
import { Center } from "@chakra-ui/react";
import { useSelector } from "@xstate/react";
import * as React from "react";

export default function TilfoejDatoModal() {
  const appContext = React.useContext(AppContext);
  const tilfoejerDato = useSelector(appContext.ordreActor, (state) =>
    state.matches("Tilføjer dato")
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
      titel="Tilføj ny dato"
      undertitel={datoVejledning}
      isOpen={tilfoejerDato}
      onClose={() => send({ type: "Afbryd" })}
    >
      <Center>
        <Kalender
          disabledDates={datoerHvorManIkkeKanBestille}
          onChange={(nyDato) =>
            send({
              type: "Tilføj dato",
              dato: nyDato,
            })
          }
        />
      </Center>
    </CenterModal>
  );
}
