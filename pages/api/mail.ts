import sgMail from "@sendgrid/mail";
import { createClient } from "@supabase/supabase-js";
import { addDays } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import { OrdreLinje } from "../ordrer";

sgMail.setApiKey(process.env.EMAIL_API_KEY ?? "");

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
  );
  const { data } = await supabaseClient
    .from<OrdreLinje>("ordrer_view")
    .select("*")
    //.is("ordre_email_sendt", false) // join med ordre_emails_der_ikke_er_sendt
    .gte("dato", addDays(new Date(), -14).toDateString());

  console.log("hej");

  // if (!data) {
  //   res.json({ message: "Alle emails er sendt for i dag" });
  //   return;
  // }

  // console.log(JSON.stringify(data, null, 2));

  // res.json({ message: "Test færdig" });
  // return;

  const msg = {
    from: "no_reply@leanders.dk",
    text: "Din ordre hos Leanders",
    personalizations: [
      {
        to: [
          {
            email: "abm@appbureauet.dk",
          },
        ],
        dynamic_template_data: {
          varer: [
            { navn: "Bolle", antal: 3 },
            { navn: "Rugbrød", antal: 3 },
          ],
        },
      },
    ],
    template_id: "d-aa719948ca2b4f618146e6b03a16a9d8",
  };

  console.log(JSON.stringify(data, null, 2));

  try {
    // await sgMail.send(msg);
    const ordreLinjeIds = (data ?? []).map((ordreLinje) => ordreLinje.id);

    const { data: nyeData, error } = await supabaseClient
      .from("ordre_linjer")
      .update({ ordre_email_sendt: true })
      .match({ id: 117 });
    console.log(nyeData);
    console.log(error);

    res.json({ message: `Email has been sent` });
  } catch (error) {
    res.status(500).json({ error: "Error sending email" });
  }
};

export default sendEmail;
