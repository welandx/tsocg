// types/card.ts
import { CardLocation, CardPosition, CardType, MonsterAttribute, MonsterType } from './game.js';

export interface Card {
  id: string;
  name: string;
  description: string;
  type: CardType;
  
  // 怪兽特有属性
  attribute?: MonsterAttribute;
  monsterType?: MonsterType;
  level?: number;
  attack?: number;
  defense?: number;
  
  // 法术陷阱特有属性
  spellType?: string;
  trapType?: string;
  
  // 游戏状态
  location: CardLocation;
  position?: CardPosition;
  counters: number;
  
  // 效果相关
  effects: Effect[];
}

export interface Effect {
  id: string;
  type: ' ignition' | ' trigger' | ' continuous' | ' quick'; // 效果类型
  condition: (ctx: GameContext) => boolean; // 发动条件
  cost?: (ctx: GameContext) => void; // 代价
  resolution: (ctx: GameContext) => void; // 效果处理
}