import { assign, createMachine } from "xstate";
import {
  defaultVarerMap,
  imorgen,
  sorteredeDatoerFraVarer,
} from "../utils/ordre";

export interface OrdreMaskineContext {
  aktivDato: Date;
  varer: Map<number, Map<number, number>>;
}

export const ordreMaskine =
  /** @xstate-layout N4IgpgJg5mDOIC5QHsBOFVgAQFsCGsA1gJYB2YAdMRADZgDEAKsTQGYAfAVlgG56aJQAB2SxiAF2LJSgkAA9EAJgAsARgoBOZQFZFGgOwAGVYf2rtANm0AaEAE8l+gMyaNb-bo2GvT7coC+-rZoGNj4RGSUAPLomFjIQgBGdlAwsEwsHNx8AkggImKS0rIKCNrahhSKABzaqsqGhhYainrVtg5l5RSGOmrVTqruyhaBwbFhBCTkFDGh8UkpafRRQpji8ROyBRJSMnmlzhYUOoOGdfr6DU4aHYhWLr3aTvoWFiPKii9jICFx4dNohMFslUnB6AA5ACuNFgkhom1C21Eu2KB0QTlaFHe1TUjRUGm0bgsdwQTgslTcbiGBkUhichmqPz+kwiMzmcQSoOWAGUAGcbPCESQ8LAQPDiZDIwp7EqISzqVQ1aoDfTubQeUkjao9PqKDw3fTVN6jIK-YEAyKzYFcpbgnnifgbKEQCKsQXC4ii8WS6Wo-agUqKCyKhoWL7mCkvEn2e7NVxuG51ar0xTaZkWqZWjnYW1g9IOp1YeFZMUSqV5HZFAPyDFKnp+Cy4vwaN7GUleBMaaqtAyt0wBM0s3BZmYAVVdJHdYFQZcl9Anbo9IrnFeEKOrcoQKnUWk8RhMZksNljCGUyn0XcstSVaqcGfmlvHk+I09nPuQ9B5dGXXtXfs3dFtzUTQdD0A9TEjE9OmeZQuwvCxBhGfRFAff5R0oRcp3EGdV3oABxABT4sWBBFJSDIKAsDwVhEVydcZTRQMlBAvdwOMSDj1JcNdypJxcVUVQrHTIdMzZShmDYLhcI-DIpO4D8ANlICd1A-cOKPKxSVUfiuwGBplCcfjUNEx8MIoSSshk8sCOI+EyKgCjSComi6LAJSmNrYDdzAgwNKg0lWm0LsrlUZtg0ZNDWUBWY1jAcQcNnFkVhtOKEvijya1KEwNWxSxWhDOkmzebjnl1Z5Xned4vn0QIzVIZAIDgWRhyfShqDoTKt0PNSGRbPRPlqUlyUvIS3iE6o1SbJUopHcTrXmPM0i6oDnmC7Rag0MLmnMAYnG4i9yoaLbGiEtNZraigsNfRL-0rDdlOYs9FG4+oeipZRCWNJpnAu8zLOk99yxWp7ctMQw9EaekrFxZRtM+vTXj6C5atM9D5tWdZbpZEGvMmyoai8HRqiVep21Pd5LyeY6TGMcMRPGMyMeBGjYBoKF0vEXHssUEwKExCGvD289zAOqm+m8WmzoZ80mcBbnEDC7TLypAxmgqEYDHPOr-CAA */
  createMachine(
    {
      context: { aktivDato: imorgen, varer: defaultVarerMap() },
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
          | { type: "Opret ordre" }
          | { type: "Ordre oprettet" }
          | { type: "Nulstil ordre" },
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
            "Opret ordre": "Opretter ordre",
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
        "Opretter ordre": {
          on: {
            "Ordre oprettet": "Ordre afsluttet",
          },
        },
        "Ordre afsluttet": {},
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
        "Nulstil ordre": assign({
          aktivDato: (_) => imorgen,
          varer: (_) => defaultVarerMap(),
        }),
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
    }
  );
