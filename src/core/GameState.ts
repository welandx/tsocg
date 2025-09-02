// core/GameState.ts
import { Phase, Player, Card, Effect } from '../types';

export class GameState {
  private players: [Player, Player];
  private currentPlayerIndex: number;
  private currentPhase: Phase;
  private turnCount: number;
  
  constructor(player1: Player, player2: Player) {
    this.players = [player1, player2];
    this.currentPlayerIndex = 0;
    this.currentPhase = Phase.DRAW;
    this.turnCount = 1;
  }
  
  getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }
  
  getOpponentPlayer(): Player {
    return this.players[this.currentPlayerIndex === 0 ? 1 : 0];
  }
  
  getCurrentPhase(): Phase {
    return this.currentPhase;
  }
  
  setPhase(phase: Phase): void {
    this.currentPhase = phase;
    // 这里可以触发阶段变更事件
  }
  
  nextPhase(): void {
    const phases = Object.values(Phase);
    const currentIndex = phases.indexOf(this.currentPhase);
    this.currentPhase = phases[(currentIndex + 1) % phases.length];
    
    if (this.currentPhase === Phase.DRAW) {
      this.endTurn();
    }
  }
  
  endTurn(): void {
    this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
    this.turnCount++;
  }
  
  // 其他状态管理方法...
}