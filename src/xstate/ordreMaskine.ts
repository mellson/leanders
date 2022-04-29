import { definitions } from "@/types/supabase";
import {
  datoerHvorManIkkeKanBestillePizzaDej,
  standardDatoerHvorManIkkeKanBestiller,
} from "@/utils/dato";
import {
  bygVarer,
  datoErOkTilVare,
  defaultVarerMap,
  erPizzaDej,
  sorteredeDatoerFraVarer,
} from "@/utils/ordre";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { PostgrestResponse } from "@supabase/supabase-js";
import { assign, createMachine, send } from "xstate";

export const convertError = (error: any) =>
  error.data ?? error.data?.message ?? String(error);

export interface OrdreMaskineContext {
  aktivDato?: Date;
  datoerHvorManIkkeKanBestille: Date[];
  midlertidigVare?: number;
  varer: Map<number, Map<number, number>>;
  nytOrdreId?: number;
  fejl?: string;
}

function getInitialContext(): OrdreMaskineContext {
  return {
    aktivDato: undefined,
    datoerHvorManIkkeKanBestille: standardDatoerHvorManIkkeKanBestiller(
      defaultVarerMap()
    ),
    varer: defaultVarerMap(),
    fejl: undefined,
    nytOrdreId: undefined,
  };
}

export const ordreMaskine =
  /** @xstate-layout N4IgpgJg5mDOIC5QHkBOFVgAQFkCGsA1gJYB2YAdAIIBmAbmKQC5ioDEAKsQDY0AfAKyx08mRKAAOAe1jEmxKaXEgAHogCcANgCMFACzbNAdh1G96gKzaLegDQgAnogC0mvXooAOAEw+ADHqenpo6ftoAvuH2aBjY+ERklABqAGfcUFh4hPJ0WBB4TFJsAMopTJnZxLn5hcrSsvKKymoIAMzqRhRG2q2a3gEWRr3qdo4unkZ+Xr7eFp6Det7a85HR6Ji4BCTkFKnpFTl5BUW0AEaoDhB1MnIKSkiqiO2d3b39eoPDo04IzkaerWmPkWmj8ZnUs1WIBiG3i20oMOwUgkpwcUBgsE4PH4QhEYge9VuTQeLR6nnU+la3m8IyW2g6eiM9h+ziWFgoFjmWm8RiGJgsbihiM2CR2wuRqPRcBKZQOVSOtQJN0a91ApL0fimPNBdKpfnUYWZLlafm8HIsBr8nkZnjC+qF6ziW0SFHFKLRGJKTFE5QArhAEjRyllDjUpNcGndmohtH5jBRtHpWu1NBa5smjQh+uzjMtvJp1PMRtprA7YiL4a7HVgJR7pcVvahyvJeIIFeGlZHiWqYyXPBQ-IMLbbBtZApnnLGpj5PNpJoFeZr2mXYc6xdXa1LMQAhMCEVApIM1x0Romqx4IEveQHDA3W7nkzPuDy5nyF9T0kKtCwrp2ihEbu6W5sAAcr63CwC2x6xKeKrRpe2i+BQqaIR+H42IaYy-EMugzrMg53pyP5RNC1Zwi6ACqAYkEGrDtmwVGBsGlTVMcsFRiSTwdF0PR9AMQwFt8LjTr4hhxty-zfuo6i-hWlHUcQtGoPRxTcGAzGhmxnZnvBzw8W8-FfBOmitLoVL+PmokQrJ5E7IxNEsMpYZsGcFxXNpcGcW03GvHxHwCSMmbBAm3Q+JyVIQgC3g2WulBcK2Ah0c58U4u27HdheWi6AYximOYVg2BOKZAksQS8poEytDF-4UClghJccLk0OclzpeeLRZfohgmHO+VjhOib9jOc7JuorRGLMPjVZWu77oejnQZgbDIBImDlFIJ4eRxPa-OSUyGImPLXmEY2eMZGr6CM5IWFSFiDgE00urNB5KYtYBNS17mSMq20Xs4e0JjoiwTSa9KtGdWG3SFebWuDljfo9YqrepC0beWxAQGwECKJQZB0FIhAAeWtkIsjTCo9WGMIHjUgAMYFHcADafgALptfBzj5chBZzoYyYapyQm-AW7LmIEQQQjdFrRSRwok66ZMU+jmOsKgG0UBI3AFDQG0ALZVsTsUK2tSsbFTNP0yqzNs1tGUtJzljcx+3Qma0AuFVhzhUp0iE+D0YKzMswSI6TJt0WjGzcGQiXsNjOw04TBurjVK1h8pEfYFHpAx9TpD45bTOs+zXle7oJm8hM8wVQWwStMZhYlfmY3JjyVWy2RRupyj4fVlnMdsKr6ua9retJ3+lZd+TPfln3rC5-nDOKNbxc7aXyHjf8-wCsEhYmcZd2NxqrcnSHY+ZDQsDcL6U9MKB4GQTwb0rxeem+e8nyCROoUUOZ3iBC3SYJqnySMQLAAALUQWBGBYBoGAAQ3BlpkyfrbdqiAbAUANJg4IE1jBaAsBOdwmhkIzETBYWYN1DCRBIqQKQEA4DKDlkbWgDBmCsGfi0GuyEkwmikrxOMX9rw-xmFSchAoxrALSBkEM8owzsJjACLo7h5hxlMraboQt-rmEBtYAEfh2hBAMKfN0koMRyMvKZXQcxgg8i0LgsaA1BGcnJHOcSZC9GaFPvZRSC1ZEoPgssF4FVDCciGBqCqE4yFlxmPqfUplGRGFPnVGOaU-FeXKhyAwI4fD9DeBOXwFJzLLDjHo0KCN26Gxqs9ea098TfS7Kg34JZugDg-AEv+sxAiaHOmaP+gQOizFsVYIxisanYAxmYv4AohE2HGuNfUiFtD1ymGLckvIxZDE8MMtOb0sCz1QBMmk7IyHKIFOYFxeiBHsmkuLQI9IkzXiMdWPAF8r43zMUHRRgQ7omSKeor+gQhE+HGoMf4JY25rAqZWEB4DIHQNgfA95QRPnKJ+WoxMBCyHEL9r1UEOhNnlOTvCCZJZHbzLaYsGwwQJwjEBDOUyN0tBu18FQ8IQA */
  createMachine(
    {
      context: getInitialContext(),
      tsTypes: {} as import("./ordreMaskine.typegen").Typegen0,
      schema: {
        context: {} as OrdreMaskineContext,
        events: {} as
          | { type: "Tilføj vare"; vareId: number; antal: number }
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
            data: PostgrestResponse<definitions["ordre_linjer"]>;
          };
        },
      },
      preserveActionOrder: true,
      id: "Ordre Maskine",
      initial: "Afventer",
      states: {
        Afventer: {
          description: "Ordremaskinen afventer instrukser",
          on: {
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
            "Sæt aktiv dato": {
              actions: "Sæt aktiv dato",
            },
            "Start udskift aktiv dato": {
              actions: "Opdater mulige datoer",
              target: "Udskifter dato",
            },
            "Start tilføj dato": {
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
        "Gem midlertidigt vare": assign({
          midlertidigVare: (_, event) => event.vareId,
          datoerHvorManIkkeKanBestille: (context, event) => {
            if (erPizzaDej(event.vareId)) {
              return datoerHvorManIkkeKanBestillePizzaDej(context.varer);
            } else {
              return standardDatoerHvorManIkkeKanBestiller(context.varer);
            }
          },
        }),
        "Tilføj vare til ordre": assign({
          varer: (context, event) => {
            if (!context.aktivDato) return context.varer;
            return bygVarer(
              context.varer,
              context.aktivDato,
              event.vareId,
              event.antal
            );
          },
        }),
        "Nulstil ordre": assign((_) => getInitialContext()),
        "Sæt aktiv dato": assign({
          aktivDato: (_, event) => event.dato,
          varer: (context, event) => {
            if (!context.midlertidigVare) return context.varer;
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
        "Opdater mulige datoer": assign({
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
        }),
        "Udskift aktiv dato": assign((context, event) => {
          if (!context.aktivDato) return context;
          context.varer.set(
            event.dato.getTime(),
            context.varer.get(context.aktivDato.getTime())!
          );
          context.varer.delete(context.aktivDato.getTime());
          return { aktivDato: event.dato, varer: context.varer };
        }),
        "Tilføj dato": assign((context, event) => {
          return {
            aktivDato: event.dato,
            varer: context.varer.set(event.dato.getTime(), new Map()),
          };
        }),
        "Slet aktiv dato": assign((context) => {
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
        "Dato til vare er ok": (context, event) =>
          datoErOkTilVare(event.vareId, context.aktivDato),
        "Dato til vare er ikke ok": (context, event) =>
          !datoErOkTilVare(event.vareId, context.aktivDato),
        "Dato eksisterer": (context, event) => {
          return context.varer.has(event.dato.getTime());
        },
        "Dato eksisterer ikke": (context, event) => {
          return !context.varer.has(event.dato.getTime());
        },
        "Kun varer på aktiv dato": (context) => {
          return (
            context.aktivDato !== undefined &&
            context.varer.size === 1 &&
            context.varer.has(context.aktivDato.getTime())
          );
        },
        "Varer på flere datoer": (context) => context.varer.size > 1,
      },
      services: {
        "Opret ordre id": async () =>
          await supabaseClient
            .from<definitions["ordrer"]>("ordrer")
            .insert([{}]) // User Id bliver sat af serveren
            .throwOnError(),
        "Opret ordre linjer": async (context) => {
          if (context.nytOrdreId) {
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
            return supabaseClient
              .from<definitions["ordre_linjer"]>("ordre_linjer")
              .insert(ordreLinjer)
              .throwOnError();
          } else {
            throw new Error("Ordre id mangler");
          }
        },
      },
    }
  );
