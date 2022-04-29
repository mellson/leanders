import { CenterModal } from "@/components/CenterModal";
import Kalender from "@/components/Kalender";
import { AppContext } from "@/utils/context";
import { datoerHvorManIkkeKanBestilleSelector } from "@/xstate/selectors";
import { Center } from "@chakra-ui/react";
import { useSelector } from "@xstate/react";
import * as React from "react";

export default function RedigerAktivDatoModal() {
  const appServices = React.useContext(AppContext);
  const udskifterDato = useSelector(appServices.ordreService, (state) =>
    state.matches("Udskifter dato")
  );
  const aktivDato = useSelector(
    appServices.ordreService,
    (state) => state.context.aktivDato
  );
  const datoerHvorManIkkeKanBestille = useSelector(
    appServices.ordreService,
    datoerHvorManIkkeKanBestilleSelector
  );
  const { send } = appServices.ordreService;

  return (
    <CenterModal
      titel="Rediger dato"
      isOpen={udskifterDato}
      deleteText="Fjern dato"
      onDelete={() => send({ type: "Slet aktiv dato" })}
      onClose={() => send({ type: "Afbryd" })}
      small
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
