import { Input } from "@chakra-ui/react";
import { useSelector } from "@xstate/react";
import * as React from "react";
import { AppContext } from "../../../pages/_app";
import { CenterModal } from "../CenterModal";

export default function VaelgNyDatoModal() {
  const appServices = React.useContext(AppContext);
  const udskifterDato = useSelector(appServices.ordreService, (state) =>
    state.matches("Udskifter dato")
  );
  const aktivDato = useSelector(
    appServices.ordreService,
    (state) => state.context.aktivDato
  );
  const { send } = appServices.ordreService;

  return (
    <CenterModal
      titel="Vælg ny dato"
      isOpen={udskifterDato}
      onDelete={() => send({ type: "Slet aktiv dato" })}
      onClose={() => send({ type: "Afbryd" })}
    >
      <Input
        type="date"
        value={aktivDato.toLocaleDateString("en-CA")}
        onChange={(e) => {
          if (e.target.valueAsDate)
            send({
              type: "Udskift aktiv dato",
              dato: e.target.valueAsDate,
            });
        }}
      />
    </CenterModal>
  );
}
