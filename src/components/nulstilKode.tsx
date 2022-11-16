import { supabaseClient } from '@/utils/supabase-util';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormValues = {
  kode: string;
  gentaget_kode: string;
};

export default function NulstilKode() {
  const toast = useToast();
  const {
    getValues,
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const { error } = await supabaseClient.auth.updateUser({
      password: values.kode,
    });
    if (error) {
      console.log(error);
      toast({
        title: 'Fejl under opdatering af kode',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Kode nulstillet',
        description: 'Din kode er nu opdateret',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!isValid}>
        <FormLabel htmlFor="kode1">Skriv ny kode</FormLabel>
        <Input
          id="kode"
          type="password"
          {...register('kode', {
            required: 'Koden er påkrævet',
            minLength: {
              value: 4,
              message: 'Din kode skal bestå af mindst 4 tegn',
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
          {...register('gentaget_kode', {
            required: 'Koden er påkrævet',
            validate: {
              matchesPreviousPassword: (value) => {
                const { kode } = getValues();
                return kode === value || 'Koderne skal være ens!';
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
  );
}
