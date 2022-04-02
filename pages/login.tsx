import { Container } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { Auth, useUser } from "@supabase/supabase-auth-helpers/react";
import { useRouter } from "next/router";

export default function Login() {
  const { user, error } = useUser();
  const router = useRouter();

  if (user) {
    router.push("/");
  }

  return (
    <Container maxW="640px">
      {error && <p>{error.message}</p>}
      <Auth
        supabaseClient={supabaseClient}
        providers={["google"]}
        socialLayout="horizontal"
        socialButtonSize="xlarge"
      />
    </Container>
  );
}
