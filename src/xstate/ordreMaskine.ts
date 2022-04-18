import { definitions } from "@/types/supabase";
import {
  defaultVarerMap,
  imorgen,
  sorteredeDatoerFraVarer,
} from "@/utils/ordre";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { assign, createMachine, send } from "xstate";

export interface OrdreMaskineContext {
  aktivDato: Date;
  varer: Map<number, Map<number, number>>;
  nytOrdreId?: number;
  fejl?: string;
}

function getInitialContext(): OrdreMaskineContext {
  return {
    aktivDato: imorgen,
    varer: defaultVarerMap(),
    fejl: undefined,
    nytOrdreId: undefined,
  };
}

export const ordreMaskine =
  /** @xstate-layout N4IgpgJg5mDOIC5QHsBOFVgAQFsCGsA1gJYB2YAdMRADZgDEAKsTQGYAfAVlgG56aJQAB2SxiAF2LJSgkAA9EAJgAsARgoBOZQFZFGgOwAGVYf2rtANm0AaEAE8l+gMyaNb-bo2GvT7coC+-rZoGNj4RGSUAPLomFjIQgBGdlAwsEwsHNx8AkggImKS0rIKCNrahhSKABzaqsqGhhYainrVtg5l5RSGOmrVTqruyhaBwbFhBCTkFDGh8UkpafRRQpji8ROyBRJSMnmlzhYUOoOGdfr6DU4aHYhWLr3aTvoWFiPKii9jICFx4dNohMFslUnB6AA5ACuNFgkhom1C21Eu2KB0QTlaFHe1TUjRUGm0bgsdwQTgslTcbiGBkUhichmqPz+kwiMzmcQSoOWAGUAGcbPCESQ8LAQPDiZDIwp7EqISzqVQ1aoDfTubQeUkjao9PqKDw3fTVN6jIK-YEAyKzYFcpbgnnifgbKEQCKsQXC4ii8WS6Wo-agUqKCyKhoWL7mCkvEn2e7NVxuG51ar0xTaZkWqZWjnYW1g9IOp1YeFZMUSqV5HZFAPyDFKnp+Cy4vwaN7GUleBMaaqtAyt0wBM0s3BZmYAVVdJHdYFQZcl9Anbo9IrnFeEKOrcoQKnUWk8RhMZksNljCGUyn0XcstSVaqcGfmlvHk+I09nPuQ9B5dGXXtXfs3dFtzUTQdD0A9TEjE9OmeZQuwvCxBhGfRFAff5R0oRcp3EGdV3oABxABT4sWBBFJSDIKAsDwVhEVydcZTRQMlBAvdwOMSDj1JcNdypJxcVUVQrHTIdMzZShmDYLhcI-DIpO4D8ANlICd1A-cOKPKxSVUfiuwGBplCcfjUNEx8MIoSSshk8sCOI+EyKgCjSComi6LAJSmNrYDdzAgwNKg0lWm0LsrlUZtg0ZNDWUBWY1jAcQcNnFkVhtOKEvijya1KEwNWxSxWhDOkmzebjnl1Z5Xned4vn0QIzVIZAIDgWRhyfShqDoTKt0PNSGRbPRPlqUlyUvIS3iE6o1SbJUopHcTrXmPM0i6oDnmC7Rag0MLmnMAYnG4i9yoaLbGiEtNZraigsNfRL-0rDdlOYs9FG4+oeipZRCWNJpnAu8zLOk99yxWp7ctMQw9EaekrFxZRtM+vTXj6C5atM9D5tWdZbpZEGvMmyoai8HRqiVep21Pd5LyeY6TGMcMRPGMyMeBGjYBoKF0vEXHssUEwKExCGvD289zAOqm+m8WmzoZ80mcBbnEDC7TLypAxmgqEYDHPOr-CAA */
  createMachine(
    {
      preserveActionOrder: true, // https://xstate.js.org/docs/guides/context.html#action-order
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
      },
      id: "ordre maskine",
      initial: "idle",
      states: {
        idle: {
          on: {
            "Tilføj vare": {
              actions: "Tilføj vare til ordre",
              target: "Ordre opbygges",
            },
          },
        },
        "Ordre opbygges": {
          on: {
            "Tilføj vare": {
              actions: "Tilføj vare til ordre",
            },
            "Nulstil ordre": {
              actions: "Nulstil ordre",
              target: "idle",
            },
            "Sæt aktiv dato": {
              actions: "Sæt aktiv dato",
            },
            "Bekræft ordre": "Bekræfter ordre",
            "Start udskift aktiv dato": "Udskifter dato",
            "Start tilføj dato": "Tilføjer dato",
          },
        },
        "Udskifter dato": {
          on: {
            "Udskift aktiv dato": {
              actions: "Udskift aktiv dato",
              target: "Ordre opbygges",
            },
            "Slet aktiv dato": {
              actions: "Slet aktiv dato",
              target: "Ordre opbygges",
            },
            Afbryd: "Ordre opbygges",
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
            Afbryd: "Ordre opbygges",
          },
        },
        "Bekræfter ordre": {
          on: {
            "Opret ordre": "Opretter ordre id",
          },
        },
        "Opretter ordre id": {
          invoke: {
            src: "Opret ordre id",
            onDone: {
              target: "Opretter ordre linjer",
              actions: assign({
                nytOrdreId: (_: any, event) => event.data.data[0].id,
              }),
            },
            onError: {
              target: "Vi har en fejl",
              actions: assign({
                fejl: (_: any, event) => event.data.message,
              }),
            },
          },
        },
        "Opretter ordre linjer": {
          invoke: {
            src: "Opret ordre linjer",
            onDone: "Ordre afsluttet",
            onError: {
              target: "Vi har en fejl",
              actions: assign({
                fejl: (_: any, event) => event.data.message,
              }),
            },
          },
        },
        "Ordre afsluttet": {
          entry: [send("Affyr Confetti"), send("Nulstil ordre")],
          on: {
            "Nulstil ordre": {
              actions: "Nulstil ordre",
              target: "idle",
            },
          },
        },
        "Vi har en fejl": {
          on: {
            "Opret ordre": "Opretter ordre id",
          },
        },
      },
    },
    {
      actions: {
        "Tilføj vare til ordre": assign({
          varer: (context, event) => {
            if (context.varer.has(context.aktivDato.getTime())) {
              return context.varer.set(
                context.aktivDato.getTime(),
                context.varer
                  .get(context.aktivDato.getTime())!
                  .set(event.vareId, event.antal)
              );
            } else {
              return new Map([
                [
                  context.aktivDato.getTime(),
                  new Map([[event.vareId, event.antal]]),
                ],
              ]);
            }
          },
        }),
        "Nulstil ordre": assign((_) => getInitialContext()),
        "Sæt aktiv dato": assign({ aktivDato: (_, event) => event.dato }),
        "Udskift aktiv dato": assign((context, event) => {
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
          context.varer.delete(context.aktivDato.getTime());

          const varer =
            context.varer.size > 0 ? context.varer : defaultVarerMap();

          const sorteredeDatoer = sorteredeDatoerFraVarer(varer);

          return {
            aktivDato: new Date(sorteredeDatoer[0] ?? Date.now()),
            varer,
          };
        }),
      },
      guards: {
        "Dato eksisterer": (context, event) => {
          return context.varer.has(event.dato.getTime());
        },
        "Dato eksisterer ikke": (context, event) => {
          return !context.varer.has(event.dato.getTime());
        },
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
            return await supabaseClient
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
