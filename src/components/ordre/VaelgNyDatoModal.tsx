import { Input } from "@chakra-ui/react";
import { useActor } from "@xstate/react";
import * as React from "react";
import { AppContext } from "../../../pages/_app";
import { CenterModal } from "../CenterModal";

export default function VaelgNyDatoModal() {
  const appServices = React.useContext(AppContext);
  const [state] = useActor(appServices.ordreService);
  const { send } = appServices.ordreService;

  return (
    <CenterModal
      titel="Vælg ny dato"
      isOpen={state.matches("Udskifter dato")}
      onDelete={() => send({ type: "Slet aktiv dato" })}
      onClose={() => send({ type: "Gå til opbygning af ordre" })}
    >
      <Input
        type="date"
        value={state.context.aktivDato.toLocaleDateString("en-CA")}
        onChange={(e) => {
          e.preventDefault();
          send({
            type: "Udskift aktiv dato",
            dato: e.target.valueAsDate ?? new Date(),
          });
        }}
      />
    </CenterModal>
  );
}
