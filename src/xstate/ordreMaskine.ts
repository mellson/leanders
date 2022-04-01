import { assign, createMachine } from "xstate";

export const ordreMaskine =
  /** @xstate-layout N4IgpgJg5mDOIC5QHsBOFVgAQFsCGsA1gJYB2YAdMRADZgDEAKgJIAyAYgPICiAUgPoA1AIIAlbolAAHZLGIAXYslKSQAD0QBGAGzaKABkOGAzNoCsADgCcV-RYA0IAJ5aA7K4o2vxn5tdnXOwBfIMc0DGx8IjJKACM4RRo6VCY2Lj4hMQkkEBk5RWVVDQQfKwNtACYAFhtdTWMq-TNHFwRNfU1PLytdcwtXCzMqkLD0TFwCEnIKeNhE5PpOAAVxRlU8hSUVHOKzTQqKfZqrM11TWwqWrRsum2sazR1NKuHQkHDxqKm4hOIksBSADkAKqsADKLFY61km0KO0QFWM+kOVQsVWMtiG7WMrmMVwQtluNiqFTsFgxwTeH0ikxiFGQUkw8nkAMWK24jEYHOh+S2RUQrm0yOMFgqFn2xjMJ1R2nxmhu3XuVke2merzepGQEDgqmpE2i02odB5sO2oGKJLl4oovTOJP05l0FhG7zGNINPzmf2SJoKZvUiElxht-Rq2gGdisOOazmuwe6JwG-R6ZmMLr1XzpDKZLNQvr58IQqrMFAC4oqFTMVZs+iqcqjRMTFmT5jTVLd+u+9Ld-DwADNYDQAK7MsDyfNw82IazC1zHOfuVzPVz1+PdMst1PpjuZ8gT-3FTQOWNtCwGIwXy-PEIhIA */
  createMachine(
    {
      context: { aktivDato: new Date(), varer: new Map() },
      tsTypes: {} as import("./ordreMaskine.typegen").Typegen0,
      schema: {
        context: {} as {
          aktivDato: Date;
          varer: Map<Date, Map<number, number>>;
        },
        events: {} as
          | { type: "TILFOEJ_VARE"; vareId: number; antal: number }
          | { type: "OPRET" }
          | { type: "OPRETTET" }
          | { type: "NULSTIL" },
      },
      id: "ordre maskine",
      initial: "idle",
      states: {
        idle: {
          on: {
            TILFOEJ_VARE: {
              actions: "tilfoejVareTilOrdre",
              target: "bestiller",
            },
          },
        },
        bestiller: {
          on: {
            TILFOEJ_VARE: {
              actions: "tilfoejVareTilOrdre",
            },
            OPRET: {
              target: "opretter",
            },
            NULSTIL: {
              actions: "nulstil",
              target: "idle",
            },
          },
        },
        opretter: {
          on: {
            OPRETTET: {
              target: "ordre_afsluttet",
            },
          },
        },
        ordre_afsluttet: {},
      },
    },
    {
      actions: {
        tilfoejVareTilOrdre: assign((context, event) => {
          if (context.varer.has(context.aktivDato)) {
            return {
              varer: context.varer.set(
                context.aktivDato,
                context.varer
                  .get(context.aktivDato)!
                  .set(event.vareId, event.antal)
              ),
            };
          } else {
            return {
              varer: new Map([
                [context.aktivDato, new Map([[event.vareId, event.antal]])],
              ]),
            };
          }
        }),
        nulstil: assign((_) => {
          return {
            varer: new Map(),
          };
        }),
      },
    }
  );
