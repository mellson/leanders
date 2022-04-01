import {
  Button,
  forwardRef,
  HStack,
  Input,
  useNumberInput,
} from "@chakra-ui/react";

interface NumberInputProps {
  defaultValue?: number;
  onChange: (value: number) => void;
}

export const NumberInput = forwardRef<NumberInputProps, "input">(
  ({ defaultValue = 0, onChange }, ref) => {
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
        <Input {...input} ref={ref} />
        <Button {...inc}>+</Button>
      </HStack>
    );
  }
);
