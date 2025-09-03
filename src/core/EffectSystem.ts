// core/EffectSystem.ts
import { type GameContext } from './GameContext.js';
import type { Player } from '../types/player.js';
import type { Card, Effect} from '../types/card.js';

export class EffectSystem {
  private activatedEffects: Array<{
    effect: Effect;
    activator: Player;
    card: Card;
    targets?: any[];
  }> = [];
  
  // Check and trigger timing effects
  checkTriggerEffects(ctx: GameContext, eventType: string, eventData: any): void {
    const allCards = this.getAllCardsInPlay(ctx);
    
    for (const card of allCards) {
      for (const effect of card.effects) {
        if (effect.type === 'trigger' && this.checkEffectCondition(effect, ctx, eventData)) {
          this.activateEffect(effect, card, ctx.currentPlayer, ctx);
        }
      }
    }
  }
  
  // Activate effect
  activateEffect(effect: Effect, card: Card, player: Player, ctx: GameContext): void {
    if (effect.cost) {
      effect.cost(ctx);
    }
    
    this.activatedEffects.push({
      effect,
      activator: player,
      card,
      targets: [] // In practice, need to determine targets
    });
    
  // Add to chain system
    ctx.chainSystem.addToChain({
      effect,
      card,
      player
    });
  }
  
  // Resolve effect
  resolveEffect(effect: Effect, ctx: GameContext): void {
    effect.resolution(ctx);
  }
  
  private getAllCardsInPlay(ctx: GameContext): Card[] {
  // Implementation to get all cards in play
    return [];
  }
  
  private checkEffectCondition(effect: Effect, ctx: GameContext, eventData: any): boolean {
    return effect.condition({ ...ctx, eventData });
  }
}