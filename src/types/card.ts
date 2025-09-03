// types/card.ts
import { CardLocation, CardPosition, CardType, MonsterAttribute, MonsterType } from './game.js';
import { type GameContext } from '../core/GameContext.js';
export interface Card {
  id: string;
  name: string;
  description: string;
  type: CardType;
  
  // Monster-specific attributes
  attribute?: MonsterAttribute;
  monsterType?: MonsterType;
  level?: number;
  attack?: number;
  defense?: number;
  
  // Spell/Trap-specific attributes
  spellType?: string;
  trapType?: string;
  
  // Game state
  location: CardLocation;
  position?: CardPosition;
  counters: number;
  
  // Effect-related
  effects: Effect[];
}

export interface Effect {
  id: string;
  type: 'ignition' | 'trigger' | 'continuous' | 'quick'; // Effect type
  condition: (ctx: GameContext) => boolean; // Activation condition
  cost?: (ctx: GameContext) => void; // Cost
  resolution: (ctx: GameContext) => void; // Effect resolution
}