import { ChainSystem, ChainLink } from '../src/core/ChainSystem';
import { EffectSystem } from '../src/core/EffectSystem';
import { GameState } from '../src/core/GameState';
import { Player } from '../src/types/player';
import { Card, Effect } from '../src/types/card';
import { GameContext } from '../src/core/GameContext';
import { CardType, CardLocation, CardPosition } from '../src/types/game';

describe('ChainSystem', () => {
  let chainSystem: ChainSystem;
  let effectSystem: EffectSystem;
  let gameState: GameState;
  let gameContext: GameContext;
  let player1: Player;
  let player2: Player;
  let testCard1: Card;
  let testCard2: Card;
  let testEffect1: Effect;
  let testEffect2: Effect;

  beforeEach(() => {
    // Create test players
    player1 = {
      id: 'p1',
      name: 'Player 1',
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
      name: 'Player 2',
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

    // Create test effects with mock functions
    testEffect1 = {
      id: 'effect1',
      type: 'quick',
      condition: jest.fn(() => true),
      cost: jest.fn(),
      resolution: jest.fn()
    };

    testEffect2 = {
      id: 'effect2',
      type: 'trigger',
      condition: jest.fn(() => true),
      resolution: jest.fn()
    };

    // Create test cards
    testCard1 = {
      id: 'card1',
      name: 'Test Card 1',
      description: 'A test card',
      type: CardType.MONSTER,
      location: CardLocation.MONSTER_ZONE,
      position: CardPosition.FACE_UP_ATTACK,
      counters: 0,
      effects: [testEffect1]
    };

    testCard2 = {
      id: 'card2',
      name: 'Test Card 2',
      description: 'Another test card',
      type: CardType.SPELL,
      location: CardLocation.SPELL_ZONE,
      counters: 0,
      effects: [testEffect2]
    };

    // Initialize systems
    chainSystem = new ChainSystem();
    effectSystem = new EffectSystem();
    gameState = new GameState(player1, player2);

    // Create game context
    gameContext = {
      gameState,
      effectSystem,
      chainSystem,
      currentPlayer: player1,
      opponent: player2
    };
  });

  describe('addToChain', () => {
    test('should add a chain link to the chain', () => {
      const chainLink: ChainLink = {
        effect: testEffect1,
        card: testCard1,
        player: player1
      };

      chainSystem.addToChain(chainLink);

      // Since chain is private, we test indirectly by checking if resolveChain processes it
      const resolveEffectSpy = jest.spyOn(effectSystem, 'resolveEffect');
      chainSystem.resolveChain(gameContext);

      expect(resolveEffectSpy).toHaveBeenCalledWith(testEffect1, gameContext);
    });

    test('should add multiple chain links in correct order', () => {
      const chainLink1: ChainLink = {
        effect: testEffect1,
        card: testCard1,
        player: player1
      };

      const chainLink2: ChainLink = {
        effect: testEffect2,
        card: testCard2,
        player: player2
      };

      chainSystem.addToChain(chainLink1);
      chainSystem.addToChain(chainLink2);

      const resolveEffectSpy = jest.spyOn(effectSystem, 'resolveEffect');
      chainSystem.resolveChain(gameContext);

      // Chain resolves in reverse order (LIFO)
      expect(resolveEffectSpy).toHaveBeenNthCalledWith(1, testEffect2, gameContext);
      expect(resolveEffectSpy).toHaveBeenNthCalledWith(2, testEffect1, gameContext);
    });
  });

  describe('resolveChain', () => {
    test('should resolve effects in reverse order', () => {
      const chainLink1: ChainLink = {
        effect: testEffect1,
        card: testCard1,
        player: player1
      };

      const chainLink2: ChainLink = {
        effect: testEffect2,
        card: testCard2,
        player: player2
      };

      chainSystem.addToChain(chainLink1);
      chainSystem.addToChain(chainLink2);

      const resolveEffectSpy = jest.spyOn(effectSystem, 'resolveEffect');
      chainSystem.resolveChain(gameContext);

      // Verify order: last added resolves first
      expect(resolveEffectSpy).toHaveBeenNthCalledWith(1, testEffect2, expect.any(Object));
      expect(resolveEffectSpy).toHaveBeenNthCalledWith(2, testEffect1, expect.any(Object));
    });

    test('should set current player to effect activator during resolution', () => {
      const chainLink: ChainLink = {
        effect: testEffect1,
        card: testCard1,
        player: player2 // Different from original current player
      };

      chainSystem.addToChain(chainLink);

      let playerDuringResolution: Player | null = null;
      const mockResolution = jest.fn((ctx: GameContext) => {
        playerDuringResolution = ctx.currentPlayer;
      });
      testEffect1.resolution = mockResolution;

      const originalPlayer = gameContext.currentPlayer;
      chainSystem.resolveChain(gameContext);

      // Player should be set to the effect activator during resolution
      expect(playerDuringResolution).toBe(player2);
      // Player should be restored after resolution
      expect(gameContext.currentPlayer).toBe(originalPlayer);
    });

    test('should clear the chain after resolution', () => {
      const chainLink: ChainLink = {
        effect: testEffect1,
        card: testCard1,
        player: player1
      };

      chainSystem.addToChain(chainLink);
      chainSystem.resolveChain(gameContext);

      // Add another effect to verify chain was cleared
      chainSystem.addToChain(chainLink);
      const resolveEffectSpy = jest.spyOn(effectSystem, 'resolveEffect');
      chainSystem.resolveChain(gameContext);

      // Should only be called once for the second resolution
      expect(resolveEffectSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('askForChainResponses', () => {
    test('should call resolveChain when no chain possibilities exist', async () => {
      const resolveChainSpy = jest.spyOn(chainSystem, 'resolveChain');
      
      await chainSystem.askForChainResponses(gameContext);
      
      expect(resolveChainSpy).toHaveBeenCalledWith(gameContext);
    });

    test('should handle chain possibilities and still resolve', async () => {
      // Mock the private method to return true
      const checkChainPossibilitiesSpy = jest.spyOn(
        chainSystem as any, 
        'checkChainPossibilities'
      ).mockReturnValue(true);
      
      const resolveChainSpy = jest.spyOn(chainSystem, 'resolveChain');
      
      await chainSystem.askForChainResponses(gameContext);
      
      expect(checkChainPossibilitiesSpy).toHaveBeenCalledWith(gameContext);
      expect(resolveChainSpy).toHaveBeenCalledWith(gameContext);
    });
  });

  describe('integration test', () => {
    test('should handle a complete chain sequence', async () => {
      testEffect1.resolution = jest.fn();
      testEffect2.resolution = jest.fn();

      const chainLink1: ChainLink = {
        effect: testEffect1,
        card: testCard1,
        player: player1
      };

      const chainLink2: ChainLink = {
        effect: testEffect2,
        card: testCard2,
        player: player2
      };

      // Build chain
      chainSystem.addToChain(chainLink1);
      chainSystem.addToChain(chainLink2);

      // Resolve chain
      await chainSystem.askForChainResponses(gameContext);

      // Both effects should have been resolved
      expect(testEffect1.resolution).toHaveBeenCalled();
      expect(testEffect2.resolution).toHaveBeenCalled();
    });
  });
});