import { MjmlColumn, MjmlSection, MjmlText } from 'mjml-react';
import { grayDark, textSm } from './theme';

export default function Footer() {
  return (
    <MjmlSection cssClass="smooth">
      <MjmlColumn>
        <MjmlText
          cssClass="footer"
          padding="24px 24px 48px"
          fontSize={textSm}
          color={grayDark}
        >
          Leanders ApS
          <br />
          Brogade 29
          <br />
          5700 Svendborg
        </MjmlText>
      </MjmlColumn>
      <MjmlColumn>
        <MjmlText
          cssClass="footer"
          padding="24px 24px 48px"
          fontSize={textSm}
          color={grayDark}
        >
          <a href="mailto:kasper@leanders.dk" target="_blank">
            kasper@leanders.dk
          </a>
          <br />
          Tlf: <a href="tel:+4522690045">22690045</a>
          <br />
          CVR-NR: 38996371
        </MjmlText>
      </MjmlColumn>
      <MjmlColumn>
        <MjmlText
          cssClass="footer"
          padding="24px 24px 48px"
          fontSize={textSm}
          color={grayDark}
        >
          <a href="https://leanders.dk" target="_blank">
            www.leanders.dk
          </a>
          <br />
          Kontrolnr.: DK-ØKO-100
          <br />
          Alle varer er økologiske
        </MjmlText>
      </MjmlColumn>
    </MjmlSection>
  );
}
