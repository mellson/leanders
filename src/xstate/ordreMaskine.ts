import { createMachine } from "xstate";

export const ordreMaskine =
  /** @xstate-layout N4IgpgJg5mDOIC5QHsBOFVlQOgJYQBswBiAF1wIDMAPgK0VAAdlZdzkA7BkAD0QEYAbP2wAGceIAsAdkEAmGaJkAaEAE9EATkHZNevXNGaFAVkGSAHAF8rqtBizYARnHIEiqYskaZS3ZqzsXEi8iADMFhbYkmHSMiYWognS0iaqGgjauvrGRqbm1rYg9pg43r6kWF4+YKSVfiEBbLic3HwI8pLYJvwmCRbCkvzS-JLpWjo5ucaSZrM2RRzIEHDcJY74RP4sza0h7ZJy45mi2XoDohaHESk2duilzq4UHtuBLcGg7Qpd8ibiCk00liJk0x00pxyFyuchu0juxQejnKtUqqDeu0+oQQMk02BGRiS-F6gnMs3BkP00OuFlkCPWZSRAH0AIaUWAEACudVqGKCbUQwK6oyScQSoxGFgpZ001NhtME9KR6MaO35+wEUvUmoWViAA */
  createMachine({
    context: {},
    id: "ordrer",
    initial: "idle",
    states: {
      idle: {
        on: {
          tilføj: {
            target: "bestiller",
          },
        },
      },
      bestiller: {
        on: {
          opret: {
            target: "opretter",
          },
        },
      },
      opretter: {
        on: {
          oprettet: {
            target: "ordre_afsluttet",
          },
        },
      },
      ordre_afsluttet: {},
    },
  });
