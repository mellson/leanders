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

const mailer = async (_req: NextApiRequest, res: NextApiResponse) => {
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
    await Promise.all(
      Object.keys(groupedByEmail).map(async (email) => {
        console.log(email);

        const ordreLinjer = groupedByEmail[email];
        if (!ordreLinjer) return;

        let firma = undefined;
        if (
          ordreLinjer[0]?.firma_navn &&
          ordreLinjer[0].firma_adresse &&
          ordreLinjer[0].firma_postnr &&
          ordreLinjer[0].firma_by
        ) {
          firma = {
            navn: ordreLinjer[0].firma_navn,
            adresse: ordreLinjer[0].firma_adresse,
            postnr: ordreLinjer[0].firma_postnr,
            by: ordreLinjer[0].firma_by,
          };
        }

        console.log(firma);
        console.log(JSON.stringify(ordreLinjer, null, 2));

        const res = await sendMail({
          subject: 'Din ordre fra Leanders',
          to: email,
          component: <OrdreInfo firma={firma} ordreLinjer={ordreLinjer} />,
        });

        console.log(res);
      })
    );

    const ordreLinjeIds = (data ?? []).map((ordreLinje) => ordreLinje.id);

    await supabaseClient
      .from('ordre_emails_der_ikke_er_sendt')
      .delete()
      .in('ordre_linje_id', ordreLinjeIds);

    return res.json({ message: `Email has been sent` });
  } catch (error) {
    return res.status(500).json({ error: 'Error sending email' });
  }
};

export default mailer;
