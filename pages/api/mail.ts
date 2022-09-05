import { groupBy } from '@/utils/general';
import sgMail from '@sendgrid/mail';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '');

export interface EmailOrdreLinje {
  id: number;
  antal: number;
  firma?: string;
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
  const personalizations = Object.keys(groupedByEmail).map((email) => ({
    to: email,
    dynamic_template_data: {
      varer: (groupedByEmail[email] ?? []).map((ordreLinje) => ({
        navn: ordreLinje.vare,
        antal: ordreLinje.antal,
      })),
    },
  }));

  const msg = {
    from: 'no_reply@leanders.dk',
    text: 'Din ordre hos Leanders',
    personalizations,
    template_id: 'd-aa719948ca2b4f618146e6b03a16a9d8',
  };

  try {
    await sgMail.send(msg);

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
