// core/GameEngine.ts
import { GameState } from './GameState.js';
import { EffectSystem } from './EffectSystem.js';
import { ChainSystem } from './ChainSystem.js';
import { CardRepository } from '../data/CardRepository.js';
import { type Player } from '../types/player.js';
import { type GameContext } from './GameContext.js';
import { CardLocation, CardType, CardPosition} from '../types/game.js';


export class GameEngine {
  private gameState: GameState;
  private effectSystem: EffectSystem;
  private chainSystem: ChainSystem;
  private cardRepository: CardRepository;
  private context: GameContext;
  
  constructor(player1: Player, player2: Player) {
    this.cardRepository = new CardRepository();
    this.cardRepository.loadInitialCards();
    
    this.gameState = new GameState(player1, player2);
    this.effectSystem = new EffectSystem();
    this.chainSystem = new ChainSystem();
    
    this.context = {
      gameState: this.gameState,
      effectSystem: this.effectSystem,
      chainSystem: this.chainSystem,
      get currentPlayer() { return this.gameState.getCurrentPlayer(); },
      get opponent() { return this.gameState.getOpponentPlayer(); }
    };
  }
  
  // 初始化游戏
  initializeGame(): void {
    // 设置初始手牌、洗牌等
    this.drawInitialHands();
    
    // 开始第一回合
    this.startTurn();
  }
  drawInitialHands() {
    const player1 = this.gameState.getCurrentPlayer();
    const player2 = this.gameState.getOpponentPlayer();

    for (let i = 0; i < 5; i++) {
      this.drawCard(player1);
      this.drawCard(player2);
    }
  }
  
  // 开始回合
  startTurn(): void {
    const phase = this.gameState.getCurrentPhase();
    // 处理抽牌阶段
    if (phase === 'DRAW') { // 兼容枚举和字符串
      this.drawPhase();
    }
    // 处理其他阶段...
  }
  
  // 抽牌阶段
  drawPhase(): void {
    const player = this.gameState.getCurrentPlayer();
    
    // 在游戏王中，先手玩家在第一回合不抽牌
    if (!(this.gameState.getTurnCount() === 1 && this.gameState.getCurrentPlayerIndex() === 0)) {
      this.drawCard(player);
    }
    
    // 触发抽牌时点
    this.effectSystem.checkTriggerEffects(this.context, 'DRAW_PHASE', {
      player: player.id
    });
    
    // 进入下一阶段
    this.gameState.nextPhase();
    this.startTurn(); // 继续处理下一阶段
  }
  
  // 抽牌
  drawCard(player: Player): void {
    if (player.deck.length > 0) {
      const card = player.deck.shift();
      if (!card) return;
      player.hand.push(card);
      card.location = CardLocation.HAND;
      // 触发抽卡时点
      this.effectSystem.checkTriggerEffects(this.context, 'DRAW_CARD', {
        player: player.id,
        card: card.id
      });
    }
  }
  
  // 其他游戏操作：召唤、攻击、发动效果等...
  
  // 召唤怪兽
  summonMonster(cardId: string, position: CardPosition): void {
    const player = this.gameState.getCurrentPlayer();
    const cardIndex = player.hand.findIndex(c => c.id === cardId);
    
    if (cardIndex === -1) {
      throw new Error('Card not in hand');
    }
    
    const card = player.hand[cardIndex];
    if (!card) {
      throw new Error('Card not found in hand');
    }
    // 检查召唤条件
    if (card.type !== CardType.MONSTER) {
      throw new Error('Only monsters can be summoned');
    }
    // 从手牌移除
    player.hand.splice(cardIndex, 1);
    // 放置到场上
    const emptyZoneIndex = player.field.monsterZones.findIndex(zone => zone === null || zone === undefined);
    if (emptyZoneIndex === -1) {
      throw new Error('No empty monster zones');
    }
    player.field.monsterZones[emptyZoneIndex] = card;
    card.location = CardLocation.MONSTER_ZONE;
    card.position = position;
    // 触发召唤时点
    this.effectSystem.checkTriggerEffects(this.context, 'SUMMON', {
      player: player.id,
      card: card.id,
      position: position
    });
    // 询问连锁
    this.chainSystem.askForChainResponses(this.context);
  }
}