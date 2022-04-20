import { CenterModal } from "@/components/CenterModal";
import Kalender from "@/components/Kalender";
import { AppContext } from "@/utils/context";
import { imorgen } from "@/utils/ordre";
import { Center } from "@chakra-ui/react";
import { useSelector } from "@xstate/react";
import * as React from "react";

export default function SaetAktivDatoModal() {
  const appServices = React.useContext(AppContext);
  const vaelgerDato = useSelector(appServices.ordreService, (state) =>
    state.matches("Vælg aktiv dato")
  );
  const { send } = appServices.ordreService;
  const imorgenDato = imorgen.toLocaleDateString("en-CA");

  return (
    <CenterModal
      titel="Vælg dato til ordren"
      isOpen={vaelgerDato}
      onClose={() => send({ type: "Afbryd" })}
      small
    >
      <Center>
        <Kalender
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
