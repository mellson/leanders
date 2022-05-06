import { AppContext } from "@/utils/context";
import { Button, HStack, Input, useNumberInput } from "@chakra-ui/react";
import { useActor } from "@xstate/react";
import { useContext } from "react";

interface VareInputProps {
  vareId: number;
  dato?: Date;
}

export function VareInput({ vareId, dato }: VareInputProps) {
  const appServices = useContext(AppContext);
  const { send } = appServices.ordreService;
  const [{ context }] = useActor(appServices.ordreService);
  const aktiveVarer = dato ? context.varer.get(dato.getTime()) : undefined;
  const antal = aktiveVarer ? aktiveVarer.get(vareId) ?? 0 : 0;

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      value: antal,
      min: 0,
      inputMode: "numeric",
      onChange: (_, valueAsNumber) =>
        send({ type: "Tilføj vare", vareId, antal: valueAsNumber, dato }),
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
