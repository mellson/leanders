import { CenterModal } from "@/components/CenterModal";
import Kalender from "@/components/Kalender";
import { AppContext } from "@/utils/context";
import { sorteredeDatoerSelector } from "@/xstate/selectors";
import { Center } from "@chakra-ui/react";
import { useSelector } from "@xstate/react";
import * as React from "react";
export default function TilfoejDatoModal() {
  const appServices = React.useContext(AppContext);
  const tilfoejerDato = useSelector(appServices.ordreService, (state) =>
    state.matches("Tilføjer dato")
  );
  const sorteredeDatoer = useSelector(
    appServices.ordreService,
    sorteredeDatoerSelector
  );
  const { send } = appServices.ordreService;

  return (
    <CenterModal
      titel="Tilføj ny dato"
      isOpen={tilfoejerDato}
      onClose={() => send({ type: "Afbryd" })}
      small
    >
      <Center>
        <Kalender
          disabledDates={sorteredeDatoer}
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
