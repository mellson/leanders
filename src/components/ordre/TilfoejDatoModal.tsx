import { CenterModal } from "@/components/CenterModal";
import { AppContext } from "@/utils/context";
import { imorgen } from "@/utils/ordre";
import { Input } from "@chakra-ui/react";
import { useSelector } from "@xstate/react";
import * as React from "react";

export default function TilfoejDatoModal() {
  const appServices = React.useContext(AppContext);
  const tilfoejerDato = useSelector(appServices.ordreService, (state) =>
    state.matches("Tilføjer dato")
  );
  const { send } = appServices.ordreService;
  const imorgenDato = imorgen.toLocaleDateString("en-CA");

  return (
    <CenterModal
      titel="Tilføj ny dato"
      isOpen={tilfoejerDato}
      acceptText={`Tilføj ${imorgen.toLocaleDateString()}`}
      onAccept={() => send({ type: "Sæt aktiv dato", dato: imorgen })}
      onClose={() => send({ type: "Afbryd" })}
    >
      <Input
        type="date"
        min={imorgenDato}
        value={imorgenDato}
        onChange={(e) => {
          if (e.target.valueAsDate) {
            send({
              type: "Tilføj dato",
              dato: e.target.valueAsDate,
            });
          }
        }}
      />
    </CenterModal>
  );
}
