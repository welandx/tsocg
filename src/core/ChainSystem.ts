// core/ChainSystem.ts
import { type Player } from '../types/player.js';
import {type Card, type Effect} from '../types/card.js';
import { type GameContext } from './GameContext.js';

export interface ChainLink {
  effect: Effect;
  card: Card;
  player: Player;
}

export class ChainSystem {
  private chain: ChainLink[] = [];
  private resolving: boolean = false;
  
  addToChain(link: ChainLink): void {
    this.chain.push(link);
  }
  
  // Ask both players for chain responses
  async askForChainResponses(ctx: GameContext): Promise<void> {
    let currentPlayer = ctx.currentPlayer;
    let opponent = ctx.opponent;
    
  // In actual implementation, player interaction is needed (in non-UI environments, possibly via callback)
  // Simplified: auto handling
    const canChain = this.checkChainPossibilities(ctx);
    
    if (canChain) {
  // Should wait for player responses here
  // Simplified: directly resolve chain
      this.resolveChain(ctx);
    } else {
      this.resolveChain(ctx);
    }
  }
  
  // Resolve the entire chain
  resolveChain(ctx: GameContext): void {
    this.resolving = true;
    
  // Process the chain in reverse order
    while (this.chain.length > 0) {
      const link = this.chain.pop()!;
  // Set current player as effect activator
      const originalPlayer = ctx.currentPlayer;
      ctx.currentPlayer = link.player;
      
  // Resolve effect
      ctx.effectSystem.resolveEffect(link.effect, ctx);
      
  // Restore current player
      ctx.currentPlayer = originalPlayer;
    }
    
    this.resolving = false;
  }
  
  private checkChainPossibilities(ctx: GameContext): boolean {
  // Check if either player can chain effects
  // Simplified implementation
    return false;
  }
}