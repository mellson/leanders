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
  /** @xstate-layout N4IgpgJg5mDOIC5QHsBOFVgAQFsCGsA1gJYB2YAdMRADZgDEAKsTQGYAfAVlgG56aJQAB2SxiAF2LJSgkAA9EAWgAsAVgBMFAJxaAbOt3LlARkPGAzLoA0IAJ6ILuigHZ1y86oAM6gBzHXPqoAvkE2aBjY+ERklADy6JhYyEIARrZQMLBMLBzcfAJIICJiktKyCgiKetrOus6equbqHqrK1naIyloubk1qnhaeHiFhCZEEJOQU8RFJqemZ9LFCmOJJY7LFElIyhRWKzqoUurrePlrOWgYDqlo29gjGqj497qq16lrGXXUjIOGJKKTOJjOZpDJwegAOQArjRYJIaOsIptRNsynslCZum0vMYtA1dOdPJ5nPdEOZPC4fM4jOp1CTfM4LH8AeNolMZolkuDFgBlABnazwhEkPCwEDw4mQqJKO3KSnexgobXMWmUnz86q0qnJlQZVPUh1plxMugJPmUrNBQJi01BPIWkIAqhBoqxhaLiOLJdLZejdqB9t9zBRKe8GqoiVpLepdR19SSKEb3spTaYLVbQv8bRM7VzsI6IVlmGwuBKpTLCltSoH5EoDC8fJ4dOZLVG9Oq9YoDcnjWn1RnPJbrbNbZyHfNi-Q+XRPWKK37q2jawrKhrlBRLSTjAy9P5Gt3eymTYPzcOs6Mx3nOSswOJxGBUMjMEtJ6tH+J-avMQg3EdWl8BpKXUYwGg1PUnheVw3g+L4fmcEJs1IZAIDgWQ2VwG9KGoOhv3lX9FHeJwdH0VpdHxQJ6Ug5QqTVMD9CeElnHMWpR0BbD7VmItMnwjEgwbWoKA0Q5vE8Exmz0SCNFeFpjGbEktGGbNMPHOI7wfJ8XzAPi6wqZ4KAPMwNEUwxPHaB4nk0GC5IUltlKvDiORBWY8FYWAaBhTSv2XOV+PrBA1ReBkiXOC4mmZaTrN6VRVHkkl7OCFTc2c3S10UU4qVIuM2kojR1CPFi+2ItU41i9wkKCIA */
  createMachine(
    {
      context: { aktivDato: imorgen, varer: defaultVarerMap() },
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
