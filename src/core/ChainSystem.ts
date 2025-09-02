// core/ChainSystem.ts
import { Player, Card, Effect, GameContext } from '../types';

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
  
  // 询问双方是否连锁
  async askForChainResponses(ctx: GameContext): Promise<void> {
    let currentPlayer = ctx.currentPlayer;
    let opponent = ctx.opponent;
    
    // 实际实现中，这里需要与玩家交互（在无UI环境中可能是通过回调）
    // 简化版：自动处理
    const canChain = this.checkChainPossibilities(ctx);
    
    if (canChain) {
      // 这里应该等待玩家响应
      // 简化处理：直接解析连锁
      this.resolveChain(ctx);
    } else {
      this.resolveChain(ctx);
    }
  }
  
  // 解析整个连锁
  resolveChain(ctx: GameContext): void {
    this.resolving = true;
    
    // 逆序处理连锁
    while (this.chain.length > 0) {
      const link = this.chain.pop()!;
      // 设置当前玩家为效果发动者
      const originalPlayer = ctx.currentPlayer;
      ctx.currentPlayer = link.player;
      
      // 解析效果
      ctx.effectSystem.resolveEffect(link.effect, ctx);
      
      // 恢复当前玩家
      ctx.currentPlayer = originalPlayer;
    }
    
    this.resolving = false;
  }
  
  private checkChainPossibilities(ctx: GameContext): boolean {
    // 检查双方是否有可以连锁的效果
    // 简化实现
    return false;
  }
}