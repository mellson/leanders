import { CenterModal } from "@/components/CenterModal";
import { AppContext } from "@/utils/context";
import { imorgen } from "@/utils/ordre";
import { Input } from "@chakra-ui/react";
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
      acceptText={`Vælg ${imorgen.toLocaleDateString()}`}
      onAccept={() => send({ type: "Sæt aktiv dato", dato: imorgen })}
      onClose={() => send({ type: "Afbryd" })}
    >
      <Input
        type="date"
        min={imorgenDato}
        value={imorgenDato}
        onChange={(e) => {
          if (e.target.valueAsDate)
            send({
              type: "Sæt aktiv dato",
              dato: e.target.valueAsDate,
            });
        }}
      />
    </CenterModal>
  );
}
