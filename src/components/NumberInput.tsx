import { Button, HStack, Input, useNumberInput } from "@chakra-ui/react";

interface NumberInputProps {
  defaultValue?: number;
  onChange: (value: number) => void;
}

export function NumberInput({ defaultValue = 0, onChange }: NumberInputProps) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: defaultValue,
      min: 0,
      inputMode: "numeric",
      onChange: (_, valueAsNumber) => onChange(valueAsNumber),
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
