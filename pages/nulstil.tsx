import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { supabase } from "../src/utils/supabase";

type FormValues = {
  kode: string;
  gentaget_kode: string;
};

export default function Nulstil() {
  const router = useRouter();
  const { access_token, type } = router.query;
  const {
    getValues,
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>();

  function onSubmit2(values: SubmitHandler<FormValues>) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve(values);
      }, 3000);
    });
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (
      access_token &&
      typeof access_token === "string" &&
      type === "recovery"
    ) {
      return await supabase().auth.api.updateUser(access_token, {
        password: data.kode,
      });
    }
  };

  console.log(access_token);
  console.log(type);

  async function nulstilKode(nyKode: string) {
    if (
      access_token &&
      typeof access_token === "string" &&
      type === "recovery"
    ) {
      return await supabase().auth.api.updateUser(access_token, {
        password: nyKode,
      });
    }
  }

  return (
    <>
      <Container maxW={{ base: "full", md: "50%" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!isValid}>
            <FormLabel htmlFor="kode1">Skriv ny kode</FormLabel>
            <Input
              id="kode"
              type="password"
              {...register("kode", {
                required: "Koden er påkrævet",
                minLength: {
                  value: 4,
                  message: "Din kode skal bestå af mindst 4 tegn",
                },
              })}
            />
            <FormErrorMessage>
              {errors.kode && errors.kode.message}
            </FormErrorMessage>
            <FormLabel htmlFor="kode1">Gentag ny kode</FormLabel>
            <Input
              id="gentaget_kode"
              type="password"
              {...register("gentaget_kode", {
                required: "Koden er påkrævet",
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { kode } = getValues();
                    return kode === value || "Koderne skal være ens!";
                  },
                },
              })}
            />
            <FormErrorMessage>
              {errors.gentaget_kode && errors.gentaget_kode.message}
            </FormErrorMessage>
            <Button mt={4} type="submit" isLoading={isSubmitting}>
              Gem ny kode
            </Button>
          </FormControl>
        </form>
      </Container>
    </>
  );
}
