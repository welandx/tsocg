// types/player.ts
import type { Card } from "./card.js";
export interface Player {
  id: string;
  name: string;
  lifePoints: number;
  deck: Card[];
  hand: Card[];
  field: Field;
  graveyard: Card[];
  banished: Card[];
  extraDeck: Card[];
}

export interface Field {
  monsterZones: (Card | null)[];
  spellTrapZones: (Card | null)[];
  fieldZone: Card | null;
  pendulumZones: (Card | null)[];
}