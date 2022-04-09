import { Input } from "@chakra-ui/react";
import { useActor } from "@xstate/react";
import * as React from "react";
import { AppContext } from "../../../pages/_app";
import { imorgen } from "../../utils/ordre";
import { CenterModal } from "../CenterModal";

export default function TilfoejDatoModal() {
  const appServices = React.useContext(AppContext);
  const [state] = useActor(appServices.ordreService);
  const { send } = appServices.ordreService;

  return (
    <CenterModal
      titel="Tilføj ny dato"
      isOpen={state.matches("Tilføjer dato")}
      onClose={() => send({ type: "Gå til opbygning af ordre" })}
    >
      <Input
        type="date"
        value={imorgen.toLocaleDateString("en-CA")}
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
