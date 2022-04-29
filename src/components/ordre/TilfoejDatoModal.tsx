import { CenterModal } from "@/components/CenterModal";
import Kalender from "@/components/Kalender";
import { AppContext } from "@/utils/context";
import { datoerHvorManIkkeKanBestilleSelector } from "@/xstate/selectors";
import { Center } from "@chakra-ui/react";
import { useSelector } from "@xstate/react";
import * as React from "react";

export default function TilfoejDatoModal() {
  const appServices = React.useContext(AppContext);
  const tilfoejerDato = useSelector(appServices.ordreService, (state) =>
    state.matches("Tilføjer dato")
  );
  const datoerHvorManIkkeKanBestille = useSelector(
    appServices.ordreService,
    datoerHvorManIkkeKanBestilleSelector
  );
  const datoVejledning = useSelector(
    appServices.ordreService,
    (state) => state.context.datoVejledning ?? ""
  );
  const { send } = appServices.ordreService;

  return (
    <CenterModal
      titel="Tilføj ny dato"
      undertitel={datoVejledning}
      isOpen={tilfoejerDato}
      onClose={() => send({ type: "Afbryd" })}
      small
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
