import { Button, HStack, Input, useNumberInput } from "@chakra-ui/react";
import { useActor } from "@xstate/react";
import { useContext } from "react";
import { AppContext } from "../../pages/_app";

interface NumberInputProps {
  vareId: number;
}

export const NumberInput = ({ vareId }: NumberInputProps) => {
  const appServices = useContext(AppContext);
  const { send } = appServices.ordreService;
  const [state] = useActor(appServices.ordreService);
  const antal = state.context.varer.get(vareId) ?? 0;

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      value: antal,
      min: 0,
      inputMode: "numeric",
      onChange: (_, valueAsNumber) => {
        if (valueAsNumber < antal) {
          send({ type: "FJERN_VARE", vareId });
        } else if (valueAsNumber > antal) {
          send({ type: "TILFOEJ_VARE", vareId });
        }
      },
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
};
