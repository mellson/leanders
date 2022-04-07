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
  /** @xstate-layout N4IgpgJg5mDOIC5QHsBOFVgAQFsCGsA1gJYB2YAdMRADZgDEAKgJIAyAYgPICiAUgPoA1AIIAlbolAAHZLGIAXYslKSQAD0QBGAGzaKABkOGAzNoCsADgCcV-RYA0IAJ5aA7K4o2vxn5tdnXOwBfIMc0DGx8IjJKACM4RRo6VCY2Lj4hMQkkEBk5RWVVDQQfKwNtACYAFhtdTWMq-TNHFwRNfU1PLytdcwtXCzMqkLD0TFwCEnIKeNhE5PpOAAVxRlU8hSUVHOKzTQqKfZqrM11TWwqWrRsum2sazR1NKuHQkHDxqKm4hOIksBSADkAKqsADKLFY61km0KO0QFWM+kOVQsVWMtiG7WMrmMVwQtluNiqFTsFgxwTeH0ikxiFGQUkw8nkAMWK24jEYHOh+S2RUQrm0yOMFgqFn2xjMJ1R2nxmhu3XuVke2merzepGQEDgqmpE2i02odB5sO2oGKJLl4oovTOJP05l0FhG7zGNINPzmf2SJoKZvUiElxht-Rq2gGdisOOazmuwe6JwG-R6ZmMLr1XzpDKZLNQvr58IQqrMFAC4oqFTMVZs+iqcqjRMTFmT5jTVLd+u+9Ld-DwADNYDQAK7MsDyfNw82IazC1zHOfuVzPVz1+PdMst1PpjuZ8gT-3FTQOWNtCwGIwXy-PEIhIA */
  createMachine(
    {
      context: {
        aktivDato: imorgen,
        varer: defaultVarerMap(),
      },
      tsTypes: {} as import("./ordreMaskine.typegen").Typegen0,
      schema: {
        context: {} as OrdreMaskineContext,
        events: {} as
          | { type: "Tilføj vare"; vareId: number; antal: number }
          | { type: "Sæt aktiv dato"; dato: Date }
          | { type: "Udskift aktiv dato"; dato: Date }
          | { type: "Slet aktiv dato" }
          | { type: "Tilføj dato"; dato: Date }
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
            "Opret ordre": {
              target: "Opretter ordre",
            },
            "Nulstil ordre": {
              actions: "Nulstil ordre",
              target: "idle",
            },
            "Sæt aktiv dato": {
              actions: "Sæt aktiv dato",
            },
            "Udskift aktiv dato": {
              actions: "Udskift aktiv dato",
            },
            "Tilføj dato": {
              actions: "Tilføj dato",
            },
            "Slet aktiv dato": {
              actions: "Slet aktiv dato",
            },
          },
        },
        "Opretter ordre": {
          on: {
            "Ordre oprettet": {
              target: "Ordre afsluttet",
            },
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
        "Tilføj dato": assign({
          aktivDato: (_, event) => event.dato,
          varer: (context, event) => {
            if (context.varer.has(event.dato.getTime())) {
              return context.varer;
            } else {
              return context.varer.set(event.dato.getTime(), new Map());
            }
          },
        }),
        "Slet aktiv dato": assign((context) => {
          context.varer.delete(context.aktivDato.getTime());

          const varer =
            context.varer.size > 0 ? context.varer : defaultVarerMap();

          const sorteredeDatoer = sorteredeDatoerFraVarer(varer);

          return {
            aktivDato: new Date(sorteredeDatoer[0]),
            varer,
          };
        }),
      },
    }
  );
