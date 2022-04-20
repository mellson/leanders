import { CenterModal } from "@/components/CenterModal";
import { AppContext } from "@/utils/context";
import { imorgen } from "@/utils/ordre";
import { Input } from "@chakra-ui/react";
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
  const { send } = appServices.ordreService;

  return (
    <CenterModal
      titel="Rediger dato"
      isOpen={udskifterDato}
      onDelete={() => send({ type: "Slet aktiv dato" })}
      onClose={() => send({ type: "Afbryd" })}
    >
      <Input
        type="date"
        min={imorgen.toLocaleDateString("en-CA")}
        value={aktivDato ? aktivDato.toLocaleDateString("en-CA") : undefined}
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
