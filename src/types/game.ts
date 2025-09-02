// types/game.ts
enum Phase {
  DRAW = 'DRAW',
  STANDBY = 'STANDBY',
  MAIN1 = 'MAIN1',
  BATTLE_START = 'BATTLE_START',
  BATTLE_STEP = 'BATTLE_STEP',
  DAMAGE_STEP = 'DAMAGE_STEP',
  MAIN2 = 'MAIN2',
  END = 'END'
}

enum CardLocation {
  DECK = 'DECK',
  HAND = 'HAND',
  MONSTER_ZONE = 'MONSTER_ZONE',
  SPELL_ZONE = 'SPELL_ZONE',
  GRAVEYARD = 'GRAVEYARD',
  BANISHED = 'BANISHED',
  EXTRA_DECK = 'EXTRA_DECK'
}

enum CardPosition {
  FACE_UP_ATTACK = 'FACE_UP_ATTACK',
  FACE_DOWN_ATTACK = 'FACE_DOWN_ATTACK', // 实际上不存在，但为完整性保留
  FACE_UP_DEFENSE = 'FACE_UP_DEFENSE',
  FACE_DOWN_DEFENSE = 'FACE_DOWN_DEFENSE'
}

enum CardType {
  MONSTER = 'MONSTER',
  SPELL = 'SPELL',
  TRAP = 'TRAP'
}

enum MonsterAttribute {
  DARK = 'DARK',
  DIVINE = 'DIVINE',
  EARTH = 'EARTH',
  FIRE = 'FIRE',
  LIGHT = 'LIGHT',
  WATER = 'WATER',
  WIND = 'WIND'
}

enum MonsterType {
  AQUA = 'AQUA', // 水族
  BEAST = 'BEAST', // 兽族
  BEAST_WARRIOR = 'BEAST_WARRIOR', // 兽战士族
  CREATOR_GOD = 'CREATOR_GOD', // 创造神族
  CYBERSE = 'CYBERSE', // 电子界族
  DINOSAUR = 'DINOSAUR', // 恐龙族
  DIVINE_BEAST = 'DIVINE_BEAST', // 幻神兽族
  DRAGON = 'DRAGON', // 龙族
  FAIRY = 'FAIRY', // 天使族
  FIEND = 'FIEND', // 恶魔族
  FISH = 'FISH', // 鱼族
  INSECT = 'INSECT', // 昆虫族
  MACHINE = 'MACHINE', // 机械族
  PLANT = 'PLANT', // 植物族
  PSYCHIC = 'PSYCHIC', // 念动力族
  PYRO = 'PYRO', // 炎族
  REPTILE = 'REPTILE', // 爬虫类族
  ROCK = 'ROCK', // 岩石族
  SEA_SERPENT = 'SEA_SERPENT', // 海龙族
  SPELLCASTER = 'SPELLCASTER', // 魔法师族
  THUNDER = 'THUNDER', // 雷族
  WARRIOR = 'WARRIOR', // 战士族
  WINGED_BEAST = 'WINGED_BEAST', // 鸟兽族
  WYRM = 'WYRM', // 龙仪族
  ZOMBIE = 'ZOMBIE' // 不死族
}

export {
  Phase,
  CardLocation,
  CardPosition,
  CardType,
  MonsterAttribute,
  MonsterType
};