import { IconType } from "react-icons";
import { FiCoffee, FiHome, FiMapPin } from "react-icons/fi";

interface Route {
  href: string;
  label: string;
  icon: IconType;
}

export const routes: Route[] = [
  { href: "/", label: "Bestil", icon: FiHome },
  { href: "/om", label: "Om", icon: FiCoffee },
  { href: "/kontakt", label: "Kontakt", icon: FiMapPin },
];
