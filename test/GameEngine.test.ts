import { GameEngine } from '../src/core/GameEngine';
import { Player } from '../src/types/player';
import { CardPosition, CardType, CardLocation } from '../src/types/game';

describe('GameEngine', () => {
  let player1: Player;
  let player2: Player;
  let engine: GameEngine;

  beforeEach(() => {
    player1 = {
      id: 'p1',
      name: 'Alice',
      deck: [],
      hand: [],
      field: {
        monsterZones: [null, null, null, null, null],
        spellTrapZones: [null, null, null, null, null],
        fieldZone: null,
        pendulumZones: [null, null]
      },
      lifePoints: 8000,
      graveyard: [],
      banished: [],
      extraDeck: []
    };
    player2 = {
      id: 'p2',
      name: 'Bob',
      deck: [],
      hand: [],
      field: {
        monsterZones: [null, null, null, null, null],
        spellTrapZones: [null, null, null, null, null],
        fieldZone: null,
        pendulumZones: [null, null]
      },
      lifePoints: 8000,
      graveyard: [],
      banished: [],
      extraDeck: []
    };
    // 添加简单卡牌到牌组
    for (let i = 0; i < 10; i++) {
      player1.deck.push({
        id: `c${i}`,
        name: `Card${i}`,
        description: '',
        type: CardType.MONSTER,
        location: CardLocation.DECK,
        counters: 0,
        effects: [],
      });
      player2.deck.push({
        id: `c${i+10}`,
        name: `Card${i+10}`,
        description: '',
        type: CardType.MONSTER,
        location: CardLocation.DECK,
        counters: 0,
        effects: [],
      });
    }
    engine = new GameEngine(player1, player2);
  });

  test('should initialize game and draw initial hands', () => {
    engine.initializeGame();
    expect(player1.hand.length).toBe(5);
    expect(player2.hand.length).toBe(5);
    expect(player1.deck.length).toBe(5);
    expect(player2.deck.length).toBe(5);
  });

  test('should summon a monster from hand to field', () => {
    engine.initializeGame();
    const cardId = player1.hand[0].id;
    engine.summonMonster(cardId, CardPosition.FACE_UP_ATTACK);
    expect(player1.hand.length).toBe(4);
    expect(player1.field.monsterZones.filter(z => z !== null).length).toBe(1);
    expect(player1.field.monsterZones.some(z => z && z.id === cardId)).toBe(true);
  });
});
