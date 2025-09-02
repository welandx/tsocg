// core/GameContext.ts
import { GameState } from './GameState.js';
import { EffectSystem } from './EffectSystem.js';
import { ChainSystem } from './ChainSystem.js';
import { Player } from '../types/player.js';

export interface GameContext {
  gameState: GameState;
  effectSystem: EffectSystem;
  chainSystem: ChainSystem;
  currentPlayer: Player;
  opponent: Player;
  // 其他可能需要的上下文信息
}