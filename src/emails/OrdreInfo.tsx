import {
  Mjml,
  MjmlBody,
  MjmlColumn,
  MjmlSection,
  MjmlSpacer,
  MjmlTable,
  MjmlText,
} from 'mjml-react';
import React from 'react';
import Footer from './components/Footer';
import Head from './components/Head';
import Header from './components/Header';
import {
  leadingRelaxed,
  leadingTight,
  textBase,
  textXl,
} from './components/theme';

interface Firma {
  navn: string;
  adresse: string;
  postnr: number;
  by: string;
}

interface OrdreLinje {
  id: number;
  antal: number;
  vare: string;
}

const OrdreInfo: React.FC<{
  firma?: Firma;
  ordreLinjer: OrdreLinje[];
}> = ({ firma, ordreLinjer }) => {
  const nu = new Date();
  return (
    <Mjml>
      <Head />
      <MjmlBody width={600} backgroundColor="#e6e0d4">
        <Header big />
        <MjmlSection padding="0 24px 0" cssClass="smooth">
          <MjmlColumn>
            <MjmlText
              cssClass="paragraph"
              padding="0"
              fontSize={textXl}
              lineHeight={leadingTight}
              fontWeight={600}
            >
              Følgeseddel
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>

        {firma && (
          <MjmlSection padding="0 24px 0" cssClass="smooth">
            <MjmlColumn>
              <MjmlText
                padding="24px 0 0"
                fontSize={textBase}
                lineHeight={leadingTight}
                cssClass="paragraph"
              >
                {firma.navn}
              </MjmlText>
              <MjmlText
                padding="0"
                fontSize={textBase}
                lineHeight={leadingTight}
                cssClass="paragraph"
              >
                {firma.adresse}
              </MjmlText>
              <MjmlText
                padding="0"
                fontSize={textBase}
                lineHeight={leadingTight}
                cssClass="paragraph"
              >
                {firma.postnr} {firma.by}
              </MjmlText>
            </MjmlColumn>
            <MjmlColumn>
              <MjmlText
                padding="24px 0 16px"
                fontSize={textBase}
                lineHeight={leadingRelaxed}
                cssClass="paragraph"
              >
                Leveringsdato: {nu.toLocaleDateString('da-DK')}
              </MjmlText>
            </MjmlColumn>
          </MjmlSection>
        )}

        <MjmlSection padding="0 24px 0" cssClass="smooth">
          <MjmlColumn>
            <MjmlText
              padding="24px 0 16px"
              fontSize={textBase}
              lineHeight={leadingRelaxed}
              cssClass="paragraph"
            >
              Fremstillingsdato: {nu.toLocaleDateString('da-DK')}
            </MjmlText>

            <MjmlTable cssClass="ordreTable">
              <tr>
                <th>Vare</th>
                <th>Antal</th>
              </tr>
              {ordreLinjer.map((linje) => (
                <tr key={linje.id}>
                  <td>{linje.vare}</td>
                  <td>{linje.antal}</td>
                </tr>
              ))}
            </MjmlTable>

            <MjmlSpacer height="24px" />

            <MjmlText
              cssClass="paragraph"
              padding="0"
              fontSize={textBase}
              lineHeight={leadingRelaxed}
            >
              Tak for din ordre.
            </MjmlText>
            {!firma && (
              <MjmlText
                cssClass="paragraph"
                padding="0"
                fontSize={textBase}
                lineHeight={leadingTight}
              >
                Du kan afhente brødet hos os i Brogade 29, 5700 Svendborg
                (indgang fra Jernbanegade). Vi har har åbent Man - fre kl. 7-13
                og lørdag kl 7-11.
                <br />
                <br /> Mvh. Leanders
              </MjmlText>
            )}
          </MjmlColumn>
        </MjmlSection>
        <Footer />
      </MjmlBody>
    </Mjml>
  );
};

export default OrdreInfo;
