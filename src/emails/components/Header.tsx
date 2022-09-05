import { MjmlColumn, MjmlImage, MjmlSection } from 'mjml-react';

type HeaderProps = {
  big?: boolean;
};

const Header: React.FC<HeaderProps> = ({ big }) => {
  return (
    <MjmlSection padding={big ? '48px 0 40px' : '48px 0 24px'}>
      <MjmlColumn>
        <MjmlImage
          padding="0 24px 0"
          width={big ? '240px' : '120px'}
          align="left"
          src="https://leanders.dk/logoer/dark_leanders_logo_text.png"
        />
      </MjmlColumn>
    </MjmlSection>
  );
};

export default Header;
