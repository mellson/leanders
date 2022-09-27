import { definitions } from '@/types/supabase';
import {
  datoerHvorManIkkeKanBestillePizzaDej,
  getDatoVejledning,
  standardDatoerHvorManIkkeKanBestiller,
} from '@/utils/dato';
import {
  bygVarer,
  datoErOkTilVare,
  defaultVarerMap,
  erPizzaDej,
  pizzaDejVareId,
  sorteredeDatoerFraVarer,
} from '@/utils/ordre';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { PostgrestResponse } from '@supabase/supabase-js';
import { assign, createMachine, send } from 'xstate';

export const convertError = (error: any) =>
  error.data ?? error.data?.message ?? String(error);

export interface OrdreMaskineContext {
  databaseVarer: definitions['varer'][];
  aktivDato?: Date;
  datoerHvorManIkkeKanBestille: Date[];
  datoVejledning?: string;
  midlertidigVare?: number;
  varer: Map<number, Map<number, number>>;
  nytOrdreId?: number;
  fejl?: string;
  visPriser: boolean;
}

function getInitialContext(
  databaseVarer: definitions['varer'][],
  visPriser: boolean
): OrdreMaskineContext {
  return {
    databaseVarer: databaseVarer,
    aktivDato: undefined,
    datoerHvorManIkkeKanBestille: standardDatoerHvorManIkkeKanBestiller(
      defaultVarerMap()
    ),
    varer: defaultVarerMap(),
    fejl: undefined,
    nytOrdreId: undefined,
    visPriser: visPriser,
  };
}

export const ordreMaskine =
  /** @xstate-layout N4IgpgJg5mDOIC5QHkBOFVgAQFkCGsA1gJYB2YAdAJKkykBqemqAxAMpgAuWEeneAIwLYAbkzCpEoAA4B7WMU7FZpKSAAeiALQAOAAwAmCgEYALMeMA2PZYCsAdguOANCACe26zpMHjBnfYAzPYAnAYhVgC+ka5oGNj4RGSUNHSMzCz0xLBYAAqo2RJqcgpKKmqaCLqGJuZWNg5Oxq4eVbZmFLa+gU4hgYG25tGx6Ji4BCTkFACCAGYiYKScEpnZeQWwRUggJYrKqtuVxnr9FKYhlpbGISGOjqYt2jqm9hSXBpamel-B9jo6wxAcTGiUmlDmCyWKwAKsQADazAAfACssGJMMV5HtyodECFbN57N97ET2h8dMZAo8qo4jO9bCFTJYbrZ+qZAcCEhNkhR6AAzuFQLB4QhKEQ8Piydh87gisUSziyTGlfYVRCBfEUPR6KzhAwGPSsrrUrR9bzvT46QIBMzGAExIGjLlJKb8wXC0XEcW8RUsOYCVBuCDK7EHUCVDW2LU6yx6g1GgwmnTtN6xyyBAymA3mAkcp3jF2UTlYWTSARuKAwWAsWEIlFo8QhsphjSISk6SwUewGwKGW7tL6WE3+QIUDX9LoEy7-Pp5+IFsEUYul8uVuCrHL5QqSba7ZtqhDGbvGLX4swGAl9L6J9zaa4n8e9yz-TOmQJ2Ocg7lTZdlitV6VZU9b1JSbVVcUPDVXlsT4+x0fELyHW8qmCPQxz6DUdHCPQrwMT9nUXX9VwAth+FQbgAFcICSWYgPlH0lV3LF9wg45PjOHoviNeCbmpSlXitew3zuXsjw7fCFx5Ij-3XUimG4JQ61RBiwJxcM2wsKNAlMGCbCwk4DXsE0rHNWNdN7GwDHfe0RnnUEpPzFcZOrAAhMBCFQPlaJLJ1VJbI4-DQuxQiPC9GVsWxqWCTtBNML49FCb4nwk+yf0cv812rAA5Ci4VgRSfPiPyDwsC8KD6PptUsP4YKM5CtFCEJUw+L4fhJf4Uu-SgAFVqJIWiJAVKVepouivSG4qIMjaNdTCeMBhvVotGfZqIsNHCDSsWxOsLCgRv65ZUCG9g4S4D16NApiVTU1sEGm7VZv1Q0FpNZkmt1BlXwsYxWR2xd9uIAajoYv1ZgDINJvUu7NQe2M5ue41kLtMdgjfBwDW1WwTkCP6eVrJFkUGkH8frFSrtDA98UJYlST8Z9KRNJlTGarxmRsY4HFxqYScJ4HJVB8Hg3JlioaprsacNOmKSperfE7el0wNS5zmMLnKDcjyvMOwrMBreECYbDFhfAqHdGuCh-BjLCLxeOwkxsMc9QCGCrNuVWHWLVL1fczygZ1sAWGQaRMG4WRfONm7Kl0MIKACbS7SZIkDFCE0iW8DMwmTfjbmCNWKA133tbD+IBcDIWZGYk3bujow4-MZ5qsMFPkIvV5+iE600xOQwcY9-MvaXYOuCL-NiAgFgIBUSgyBEWRCCLfuusHkOR-nMeEBn2QAGM+H2ABtPQAF1Ier8504pXUAh7nPU-TR2wj+IIsKw7a+7speg5Xwbi7GMeWAkVAYcKDSDhHwWYYcAC2S5F67U-sPb+o8IAb1ILPHezYD7Hwjv5bQZ8xwX1jFfV2QQTQamZhcD4hh-iDCzD9POcDOCrzGHCMgvMJ5TwoJvee0D36wKHgwhB85mGkF5sg1Bu8VAYJPlHbSY5zgkhCDhVCg5b7yzTFYISZkbB0L4Yw7AQjWEAKASAsBkDuFfl4V-I6P89EsIkKI7e4jSCSKwQeLQMjtK3ESn0Ikyj6qOFMh8ds14Lx4TfuYwi+Y8CzFgHCCi-DOAsBynlAq1ipHqhhjGOMCNFraD+J2XU6YKQ6XfIaPOWQsAAAsmBYEWFgWYYBkRwkDnw-2aSEBdBMG7BKaNniDEivVAcZwu5vmtDpc40QHSkFkBAOAahPZL1SIsdIWwK7XWwVUJwo59A9D+C8M0ydqTxVjqjeKiU3xaLCQRHkEJFiHTacyKMfRKR+AGDpFqqcIgmDTE9Z85wPhlIFEKOU40yarIpqxCkWoMzJgqnI8I-SloRE7CyW4-guj6CEnQ9KxFZkuNYr2bwARLjvm7DcOwOSNmfMfHpLCcV3yv1suEnkAM-agp2JXSObZkxahgkeEZwUPgmkvEMsK8EbAJXdoyq53N9YoiJpdMFItboki2eEIpBIuiGBIQ4L5rdvhWE+FYdklzJJTALlrARRtFVVyjps2OJwxJ7OtAcvxxwtShH8ESbsBJnjaMsf7LAY82kNQZFCoS-hrAkiZDLJa9gCT309S7KCkrHQ8MIjoy1NjhErPZWs1xaqLatQuP8aw3wKUNT6LHPUGiMwDBgli+cUSYlxOWJwNpdpOwGRhaQ1F+IkxWF1bGIICigg6TKcQSp1Tan1Mae2jsUK0Wwt7Qi7QmqRXWB+peZMoSpWmrAMGiwtx7U7OeKEZ1dUlrHDdRaAkfgzAVQmZEIAA */
  createMachine(
    {
  context: getInitialContext([], true),
  tsTypes: {} as import("./ordreMaskine.typegen").Typegen0,
  schema: {
    context: {} as OrdreMaskineContext,
    events: {} as
      | { type: "Vis Priser"; visPriser: boolean }
      | { type: "Set database varer"; varer: definitions["varer"][] }
      | { type: "Tilføj vare"; vareId: number; antal: number; dato?: Date }
      | { type: "Sæt aktiv dato"; dato: Date }
      | { type: "Start udskift aktiv dato" }
      | { type: "Udskift aktiv dato"; dato: Date }
      | { type: "Slet aktiv dato" }
      | { type: "Start tilføj dato" }
      | { type: "Tilføj dato"; dato: Date }
      | { type: "Afbryd" }
      | { type: "Bekræft ordre" }
      | { type: "Opret ordre" }
      | { type: "Ordre oprettet" }
      | { type: "Nulstil ordre" }
      | { type: "Affyr Confetti" },
    services: {} as {
      "Opret ordre id": {
        data: PostgrestResponse<definitions["ordrer"]>;
      };
      "Opret ordre linjer": {
        data: PostgrestResponse<definitions["ordre_emails_der_ikke_er_sendt"]>;
      };
    },
  },
  preserveActionOrder: true,
  predictableActionArguments: true,
  id: "Ordre Maskine",
  initial: "IngenVarer",
  states: {
    IngenVarer: {
      description: "Vi mangler data på varerne fra Supabase",
      on: {
        "Set database varer": {
          actions: "Tilføj database varer til context",
          target: "Afventer",
        },
        "Vis Priser": {
          actions: "Vis Priser",
        },
      },
    },
    Afventer: {
      description: "Ordremaskinen afventer instrukser",
      on: {
        "Vis Priser": {
          actions: "Vis Priser",
        },
        "Tilføj vare": [
          {
            actions: "Tilføj vare til ordre",
            cond: "Dato til vare er ok",
            target: "Ordre opbygges",
          },
          {
            actions: "Gem midlertidigt vare",
            cond: "Dato til vare er ikke ok",
            target: "Vælg aktiv dato",
          },
        ],
      },
    },
    "Vælg aktiv dato": {
      on: {
        "Sæt aktiv dato": {
          actions: "Sæt aktiv dato",
          target: "Ordre opbygges",
        },
        Afbryd: {
          target: "Afventer",
        },
      },
    },
    "Ordre opbygges": {
      description: "Brugeren er i gang med at opbygge deres ordre",
      on: {
        "Tilføj vare": [
          {
            actions: "Tilføj vare til ordre",
            cond: "Dato til vare er ok",
          },
          {
            actions: "Gem midlertidigt vare",
            cond: "Dato til vare er ikke ok",
            target: "Vælg aktiv dato",
          },
        ],
        "Vis Priser": {
          actions: "Vis Priser",
        },
        "Sæt aktiv dato": {
          actions: "Sæt aktiv dato",
        },
        "Start udskift aktiv dato": {
          actions: "Opdater mulige datoer",
          target: "Udskifter dato",
        },
        "Start tilføj dato": {
          actions: "Nulstil mulige datoer",
          target: "Tilføjer dato",
        },
        "Bekræft ordre": {
          target: "Bekræfter ordre",
        },
        "Nulstil ordre": {
          actions: "Nulstil ordre",
          target: "Afventer",
        },
      },
    },
    "Udskifter dato": {
      on: {
        "Udskift aktiv dato": {
          actions: "Udskift aktiv dato",
          target: "Ordre opbygges",
        },
        "Slet aktiv dato": [
          {
            actions: "Nulstil ordre",
            cond: "Kun varer på aktiv dato",
            target: "Afventer",
          },
          {
            actions: "Slet aktiv dato",
            cond: "Varer på flere datoer",
            target: "Ordre opbygges",
          },
        ],
        Afbryd: {
          target: "Ordre opbygges",
        },
      },
    },
    "Tilføjer dato": {
      on: {
        "Tilføj dato": [
          {
            actions: "Tilføj dato",
            cond: "Dato eksisterer ikke",
            target: "Ordre opbygges",
          },
          {
            actions: "Sæt aktiv dato",
            cond: "Dato eksisterer",
            target: "Ordre opbygges",
          },
        ],
        Afbryd: {
          target: "Ordre opbygges",
        },
      },
    },
    "Bekræfter ordre": {
      description: "Afventer at brugeren accepter ordren",
      on: {
        "Tilføj vare": {
          actions: "Tilføj vare til ordre",
        },
        "Opret ordre": {
          target: "Opretter ordre id",
        },
        Afbryd: {
          target: "Ordre opbygges",
        },
      },
    },
    "Opretter ordre id": {
      description: "Opretter et ordre id hos Supabase",
      invoke: {
        src: "Opret ordre id",
        onDone: [
          {
            actions: "setOrdreId",
            target: "Opretter ordre linjer",
          },
        ],
        onError: [
          {
            actions: "setFejl",
            target: "Vi har en fejl",
          },
        ],
      },
    },
    "Opretter ordre linjer": {
      description: "Opretter ordre linjerne hos Supabase",
      invoke: {
        src: "Opret ordre linjer",
        onDone: [
          {
            target: "Ordre afsluttet",
          },
        ],
        onError: [
          {
            actions: "setFejl",
            target: "Vi har en fejl",
          },
        ],
      },
    },
    "Ordre afsluttet": {
      entry: [send("Affyr Confetti"), send("Nulstil ordre")],
      on: {
        "Nulstil ordre": {
          actions: "Nulstil ordre",
          target: "Afventer",
        },
      },
    },
    "Vi har en fejl": {
      on: {
        "Opret ordre": {
          target: "Opretter ordre id",
        },
      },
    },
  },
},
    {
      actions: {
        'Tilføj database varer til context': assign({
          databaseVarer: (_, event) => event.varer,
        }),
        'Vis Priser': assign({
          visPriser: (_, event) => event.visPriser,
        }),
        'Gem midlertidigt vare': assign({
          midlertidigVare: (_, event) => event.vareId,
          datoerHvorManIkkeKanBestille: (context, event) => {
            if (erPizzaDej(event.vareId)) {
              return datoerHvorManIkkeKanBestillePizzaDej(context.varer);
            } else {
              return standardDatoerHvorManIkkeKanBestiller(context.varer);
            }
          },
          datoVejledning: (_, event) => getDatoVejledning(event.vareId),
        }),
        'Tilføj vare til ordre': assign({
          varer: (context, event) => {
            if (!event.dato) return context.varer;
            return bygVarer(
              context.varer,
              event.dato,
              event.vareId,
              event.antal
            );
          },
        }),
        'Nulstil ordre': assign((context) =>
          getInitialContext(context.databaseVarer, context.visPriser)
        ),
        'Sæt aktiv dato': assign({
          aktivDato: (_, event) => event.dato,
          varer: (context, event) => {
            if (context.midlertidigVare === undefined) return context.varer;
            return bygVarer(
              context.varer,
              event.dato,
              context.midlertidigVare,
              1,
              true
            );
          },
          midlertidigVare: (_) => undefined,
        }),
        'Opdater mulige datoer': assign({
          datoerHvorManIkkeKanBestille: (context, event) => {
            if (context.aktivDato) {
              const varerPaaAktivDato = context.varer.get(
                context.aktivDato.getTime()
              );
              const derErPizzaDejPaaAktivDato = Array.from(
                varerPaaAktivDato?.keys() ?? []
              ).some(erPizzaDej);
              if (derErPizzaDejPaaAktivDato)
                return datoerHvorManIkkeKanBestillePizzaDej(context.varer);
            }
            return standardDatoerHvorManIkkeKanBestiller(context.varer);
          },
          datoVejledning: (context, event) => {
            if (context.aktivDato) {
              const varerPaaAktivDato = context.varer.get(
                context.aktivDato.getTime()
              );
              const derErPizzaDejPaaAktivDato = Array.from(
                varerPaaAktivDato?.keys() ?? []
              ).some(erPizzaDej);
              if (derErPizzaDejPaaAktivDato)
                return getDatoVejledning(pizzaDejVareId);
            }
            return getDatoVejledning(-1);
          },
        }),
        'Nulstil mulige datoer': assign({
          datoerHvorManIkkeKanBestille: (context) =>
            standardDatoerHvorManIkkeKanBestiller(context.varer),
          datoVejledning: (_) => getDatoVejledning(-1),
        }),
        'Udskift aktiv dato': assign((context, event) => {
          if (!context.aktivDato) return context;

          const varerPaaAktivDato = context.varer.get(
            context.aktivDato.getTime()
          );
          if (varerPaaAktivDato === undefined) return context;

          context.varer.set(event.dato.getTime(), varerPaaAktivDato);
          context.varer.delete(context.aktivDato.getTime());
          return { aktivDato: event.dato, varer: context.varer };
        }),
        'Tilføj dato': assign((context, event) => {
          return {
            aktivDato: event.dato,
            varer: context.varer.set(event.dato.getTime(), new Map()),
          };
        }),
        'Slet aktiv dato': assign((context) => {
          if (!context.aktivDato) return context;

          context.varer.delete(context.aktivDato.getTime());

          const varer =
            context.varer.size > 0 ? context.varer : defaultVarerMap();

          const sorteredeDatoer = sorteredeDatoerFraVarer(varer);

          return {
            aktivDato: new Date(sorteredeDatoer[0] ?? Date.now()),
            varer,
          };
        }),
        setOrdreId: assign({
          nytOrdreId: (_, event) =>
            event.data.data ? event.data.data[0]?.id : undefined,
        }),
        setFejl: assign({
          fejl: (_: any, event) => convertError(event.data),
        }),
      },
      guards: {
        'Dato til vare er ok': (_, event) =>
          datoErOkTilVare(event.vareId, event.dato),
        'Dato til vare er ikke ok': (_, event) =>
          !datoErOkTilVare(event.vareId, event.dato),
        'Dato eksisterer': (context, event) => {
          return context.varer.has(event.dato.getTime());
        },
        'Dato eksisterer ikke': (context, event) => {
          return !context.varer.has(event.dato.getTime());
        },
        'Kun varer på aktiv dato': (context) => {
          return (
            context.aktivDato !== undefined &&
            context.varer.size === 1 &&
            context.varer.has(context.aktivDato.getTime())
          );
        },
        'Varer på flere datoer': (context) => context.varer.size > 1,
      },
      services: {
        'Opret ordre id': async () =>
          await supabaseClient
            .from<definitions['ordrer']>('ordrer')
            .insert([{}]) // User Id bliver sat af serveren
            .throwOnError(),
        'Opret ordre linjer': async (context) => {
          if (context.nytOrdreId !== undefined) {
            const varer = sorteredeDatoerFraVarer(context.varer).map(
              (time) => new Date(time)
            );

            const ordreLinjer = varer.flatMap((dato) => {
              const data = context.varer.get(dato.getTime());
              if (data) {
                return Array.from(data.keys()).map((vareId) => {
                  return {
                    ordre_id: context.nytOrdreId!,
                    vare_id: vareId,
                    dato: dato.toISOString(),
                    antal: data.get(vareId)!,
                  };
                });
              } else {
                return [];
              }
            });
            const { data } = await supabaseClient
              .from<definitions['ordre_linjer']>('ordre_linjer')
              .insert(ordreLinjer)
              .throwOnError();

            return await supabaseClient
              .from<definitions['ordre_emails_der_ikke_er_sendt']>(
                'ordre_emails_der_ikke_er_sendt'
              )
              .insert(
                (data ?? []).map((ordreLinje) => ({
                  ordre_linje_id: ordreLinje.id,
                }))
              )
              .throwOnError();
          } else {
            throw new Error('Ordre id mangler');
          }
        },
      },
    }
  );
