import { IconType } from 'react-icons';
import { FiCoffee, FiHome, FiMapPin, FiShoppingBag } from 'react-icons/fi';

interface Route {
  href: string;
  label: string;
  icon: IconType;
}

export const routes: Route[] = [
  { href: '/', label: 'Hjem', icon: FiHome },
  { href: '/bestil', label: 'Bestil', icon: FiShoppingBag },
  { href: '/om', label: 'Om', icon: FiCoffee },
  { href: '/kontakt', label: 'Kontakt', icon: FiMapPin },
];
