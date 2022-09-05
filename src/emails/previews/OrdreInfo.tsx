import OrdreInfo from 'emails/OrdreInfo';

const ordreLinjer = [
  {
    id: 1,
    antal: 1,
    vare: 'Hvedebrød',
  },
  {
    id: 2,
    antal: 1,
    vare: 'Rugbrød',
  },
  {
    id: 9,
    antal: 2,
    vare: 'Tebirkes',
  },
];

export function eksempelUdenFirma() {
  return <OrdreInfo ordreLinjer={ordreLinjer} />;
}

export function eksempelMedFirma() {
  return (
    <OrdreInfo
      firma={{
        navn: 'App Bureauet',
        adresse: 'Enemærket 15',
        postnr: 5700,
        by: 'Svendborg',
      }}
      ordreLinjer={ordreLinjer}
    />
  );
}
