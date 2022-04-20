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

  return (
    <CenterModal
      titel="Vælg dato til ordren"
      isOpen={vaelgerDato}
      onClose={() => send({ type: "Afbryd" })}
    >
      <Input
        type="date"
        min={imorgen.toLocaleDateString("en-CA")}
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
