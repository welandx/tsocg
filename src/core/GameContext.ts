// core/GameContext.ts
import { GameState } from './GameState.js';
import { EffectSystem } from './EffectSystem.js';
import { ChainSystem } from './ChainSystem.js';
import { type Player } from '../types/player.js';

export interface GameContext {
  gameState: GameState;
  effectSystem: EffectSystem;
  chainSystem: ChainSystem;
  currentPlayer: Player;
  opponent: Player;
  eventData?: any; // 用于传递事件相关的数据
}