// data/CardRepository.ts
import type { Card } from '../types/card.js';
import { CardType, MonsterAttribute, CardLocation,MonsterType } from '../types/game.js';

export class CardRepository {
  private cards: Map<string, Card> = new Map();
  
  registerCard(card: Card): void {
    this.cards.set(card.id, card);
  }
  
  getCardById(id: string): Card | undefined {
    return this.cards.get(id);
  }
  
  createCardInstance(id: string): Card {
    const template = this.getCardById(id);
    if (!template) {
      throw new Error(`Card with id ${id} not found`);
    }
    
    // 创建卡片实例（深拷贝）
    return {
      ...JSON.parse(JSON.stringify(template)),
      location: 'DECK', // 重置位置
      position: undefined, // 重置位置
      counters: 0 // 重置计数器
    };
  }
  
  // 加载初始卡片数据
  loadInitialCards(): void {
    // 这里可以从JSON文件加载卡片数据
    this.registerCard({
      id: 'dark_magician',
      name: 'Dark Magician',
      type: CardType.MONSTER,
      attribute: MonsterAttribute.DARK,
      monsterType: MonsterType.SPELLCASTER,
      level: 7,
      attack: 2500,
      defense: 2100,
      description: 'The ultimate wizard in terms of attack and defense.',
      location: CardLocation.DECK,
      counters: 0,
      effects: [
        {
          id: 'dark_magician_effect',
          type: 'trigger',
          condition: (ctx) => {
            // 当此卡被召唤时
            return ctx.eventData?.type === 'SUMMON' && 
                   ctx.eventData?.card.id === 'dark_magician';
          },
          resolution: (ctx) => {
            // 可以在这里实现效果处理
            console.log('Dark Magician effect activated!');
          }
        }
      ]
    });
    
    // 注册更多卡片...
  }
}