// core/GameState.ts
//import { Phase, Player, Card, Effect } from '../types';
import {type Player} from '../types/player.js';
import { Phase } from '../types/game.js';


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
    const player = this.players[this.currentPlayerIndex];
    if (!player) {
      throw new Error('当前玩家索引无效');
    }
    return player;
  }
  
  getOpponentPlayer(): Player {
    const opponentIndex = this.currentPlayerIndex === 0 ? 1 : 0;
    const player = this.players[opponentIndex];
    if (!player) {
      throw new Error('对手玩家索引无效');
    }
    return player;
  }
  
  getCurrentPhase(): Phase {
    return this.currentPhase;
  }
  
  setPhase(phase: Phase): void {
    this.currentPhase = phase;
  // Phase change event can be triggered here
  }
  
  nextPhase(): void {
    const phases = Object.values(Phase).filter(
      (v) => typeof v === 'string' || typeof v === 'number'
    ) as Phase[];
    const currentIndex = phases.indexOf(this.currentPhase);
    if (currentIndex === -1) {
      throw new Error('当前阶段无效');
    }
    const nextPhase = phases[(currentIndex + 1) % phases.length];
    if (nextPhase === undefined) {
      throw new Error('无法确定下一个阶段');
    }
    this.currentPhase = nextPhase;

    if (this.currentPhase === Phase.DRAW) {
      this.endTurn();
    }
  }
  
  endTurn(): void {
    this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
    this.turnCount++;
  }
  
  // Other state management methods...
}