import { ordreMaskine } from "@/xstate/ordreMaskine";
import { createContext } from "react";
import { ActorRefFrom } from "xstate";

interface AppContextType {
  ordreActor: ActorRefFrom<typeof ordreMaskine>;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);
