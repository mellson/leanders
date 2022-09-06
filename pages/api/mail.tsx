import { groupBy } from '@/utils/general';
import { createClient } from '@supabase/supabase-js';
import sendMail from 'emails';
import OrdreInfo from 'emails/OrdreInfo';
import { NextApiRequest, NextApiResponse } from 'next';

interface EmailOrdreLinje {
  id: number;
  antal: number;
  firma_navn?: string;
  firma_adresse?: string;
  firma_postnr?: number;
  firma_by?: string;
  user_email: string;
  vare: string;
}

const sendEmail = async (_req: NextApiRequest, res: NextApiResponse) => {
  const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  );
  const { data } = await supabaseClient
    .from<EmailOrdreLinje>('email_ordrer_view')
    .select('*');

  if (data?.length === 0) {
    res.json({ message: `No emails to send` });
    return;
  }

  const groupedByEmail = groupBy(data ?? [], (d) => d.user_email);

  try {
    Object.keys(groupedByEmail).map(async (email) => {
      console.log(email);

      const data = groupedByEmail[email];
      if (!data) return;

      let firma = undefined;
      if (
        data[0]?.firma_navn &&
        data[0].firma_adresse &&
        data[0].firma_postnr &&
        data[0].firma_by
      ) {
        firma = {
          navn: data[0].firma_navn,
          adresse: data[0].firma_adresse,
          postnr: data[0].firma_postnr,
          by: data[0].firma_by,
        };
      }

      console.log(firma);
      console.log(JSON.stringify(data, null, 2));

      await sendMail({
        subject: 'Din ordre fra Leanders',
        to: email,
        component: <OrdreInfo firma={firma} ordreLinjer={data} />,
      });
    });

    const ordreLinjeIds = (data ?? []).map((ordreLinje) => ordreLinje.id);

    await supabaseClient
      .from('ordre_emails_der_ikke_er_sendt')
      .delete()
      .in('ordre_linje_id', ordreLinjeIds);

    res.json({ message: `Email has been sent` });
  } catch (error) {
    res.status(500).json({ error: 'Error sending email' });
  }
};

export default sendEmail;
