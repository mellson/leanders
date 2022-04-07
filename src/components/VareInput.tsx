import { Button, HStack, Input, useNumberInput } from "@chakra-ui/react";
import { useActor } from "@xstate/react";
import { useContext } from "react";
import { AppContext } from "../../pages/_app";

interface VareInputProps {
  vareId: number;
}

export function VareInput({ vareId }: VareInputProps) {
  const appServices = useContext(AppContext);
  const { send } = appServices.ordreService;
  const [{ context }] = useActor(appServices.ordreService);
  const aktiveVarer = context.varer.get(context.aktivDato.getTime());
  const antal = aktiveVarer ? aktiveVarer.get(vareId) ?? 0 : 0;

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      value: antal,
      min: 0,
      inputMode: "numeric",
      onChange: (_, valueAsNumber) =>
        send({ type: "Tilføj vare", vareId, antal: valueAsNumber }),
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack maxW="320px">
      <Button {...dec}>-</Button>
      <Input {...input} />
      <Button {...inc}>+</Button>
    </HStack>
  );
}
