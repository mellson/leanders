import { assign, createMachine } from "xstate";

export const ordreMaskine =
  /** @xstate-layout N4IgpgJg5mDOIC5QHsBOFVgAQFsCGsA1gJYB2YAdMRADZgDEAKgJIAyAYgPICiAUgPoA1AIIAlbolAAHZLGIAXYslKSQAD0QBGAGwAGCgE4jR3QCZdAZgAsFgBwBWCwBoQATy16KV4wc2nr2vZBAL7BLmgY2PhEZJQARnCKNHSoTGxcfEJiEkggMnKKyqoaCBbWFLrapt62Vo6aAOx1Lu4IvhW6nZr2BrZ22hb2pqHh6Ji4BCTkFAmwSSn0nAAK4oyq+QpKKrkl9roNFH57lQ1mvrpWDS1atgYdXZq9DbcN2tojIBHj0VOUyFKYeTyMCpZarRjcNa5DaFbagEoNIIUOymWqWKyonrXBCaW73XSaR62Z4GV7vD6kZAQOCqL5RSaxKi0MDrWSbIo7RAY7GNKz4vzVeynR4fOkTGLTWbzEGsgpbYqIay2CjaYneXENXxvbo8vr43QGRzEoWmBqisb0iV-AFgIEy6Fs2EKhDaTT6IW2PynKo2Ky6iz6w12RENU3myLi34UOn8PAAM1gNAArnb5LL2XD1IhbA5kYjLL5bD7tP7A0aQ2Gwp8LZHYumnZycbZdfiLKZ20ELH4HKFQkA */
  createMachine(
    {
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
      context: {
        aktivDato: new Date(),
        varer: new Map(),
      },
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
