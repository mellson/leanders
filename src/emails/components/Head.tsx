import {
  MjmlAll,
  MjmlAttributes,
  MjmlFont,
  MjmlHead,
  MjmlRaw,
  MjmlStyle,
} from 'mjml-react';
import React, { ReactElement } from 'react';
import { textColor } from './theme';

type HeadProps = { children?: ReactElement };

const Head: React.FC<HeadProps> = ({ children }) => {
  return (
    <MjmlHead>
      <MjmlRaw>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
      </MjmlRaw>
      <MjmlFont
        name="Roboto Condensed"
        href="https://fonts.googleapis.com/css2?family=Roboto+Condensed"
      />
      <MjmlStyle>{`
        .smooth {
          -webkit-font-smoothing: antialiased;
        }
        .ordreTable {
          background-color: #ffffff;
          text-align: left;
        }
        .paragraph a {
          color: ${textColor} !important;
        }
        .li {
          text-indent: -18px;
          margin-left: 24px;
          display: inline-block;
        }
        .footer a {
          text-decoration: none !important;
          color: ${textColor} !important;
        }
        .dark-mode {
          display: none;
        }
        @media (min-width:480px) {
          td.hero {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }
        @media (prefers-color-scheme: dark) {
          .paragraph > *, .paragraph a, .li > div {
            color: ${textColor} !important;
          }
          .dark-mode {
            display: inherit;
          }
          .light-mode {
            display: none;
          }
        }
      `}</MjmlStyle>
      <MjmlAttributes>
        <MjmlAll
          font-family='Roboto Condensed, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          font-weight="400"
        />
      </MjmlAttributes>
      {children}
    </MjmlHead>
  );
};

export default Head;
