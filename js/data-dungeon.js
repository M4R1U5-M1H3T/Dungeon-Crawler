'use strict';

const EnemyRepository = (() => {
  const _data = [
    // ── Regular enemies ─────────────────────────────────────────
    {
      id:'bug_goblin', name:'Goblinul Bug', sprite:'👺',
      hp:40, maxHp:40, dmg:[8,14],
      xp:30, gold:15, topic:'variabile', maxDiff:2,
      flavor:'Trăiește în variabilele nedefinite și erori de tip!',
    },
    {
      id:'logic_witch', name:'Vrăjitoarea Logicii', sprite:'🧙‍♀️',
      hp:55, maxHp:55, dmg:[10,18],
      xp:45, gold:20, topic:'operatori', maxDiff:2,
      flavor:'Manipulează operatorii logici pentru a-ți zăpăci mintea.',
    },
    {
      id:'loop_lich', name:'Lich-ul Buclei', sprite:'💀',
      hp:70, maxHp:70, dmg:[12,20],
      xp:60, gold:25, topic:'bucle', maxDiff:2,
      flavor:'Te va prinde în bucle infinite pentru eternitate!',
    },
    {
      id:'string_specter', name:'Spectrul Șirurilor', sprite:'👻',
      hp:65, maxHp:65, dmg:[11,17],
      xp:50, gold:22, topic:'șiruri', maxDiff:2,
      flavor:'Un fantom format din caractere ASCII corupte.',
    },
    {
      id:'list_demon', name:'Demonul Listelor', sprite:'😈',
      hp:80, maxHp:80, dmg:[14,22],
      xp:70, gold:30, topic:'liste', maxDiff:2,
      flavor:'Amestecă indecșii și provoacă IndexError!',
    },
    {
      id:'func_phantom', name:'Fantoma Funcțiilor', sprite:'🌀',
      hp:75, maxHp:75, dmg:[13,21],
      xp:65, gold:28, topic:'funcții', maxDiff:3,
      flavor:'O funcție recursivă care s-a pierdut în stack.',
    },
    {
      id:'dict_daemon', name:'Demonul Dicționarelor', sprite:'📖',
      hp:85, maxHp:85, dmg:[14,22],
      xp:75, gold:32, topic:'dicționare', maxDiff:2,
      flavor:'Confundă cheile cu valorile și provoacă KeyError!',
    },
    // ── Floor 4 – Writing enemies (use write-type challenges) ───
    {
      id:'scribe_wraith', name:'Strigoi Scriptor', sprite:'🖊️',
      hp:90, maxHp:90, dmg:[15,23],
      xp:80, gold:35, topic:null, maxDiff:2, questionType:'write',
      flavor:'Îți cere să scrii cod corect – sau suferi consecințele!',
    },
    {
      id:'algo_golem', name:'Golemul Algoritmilor', sprite:'🤖',
      hp:100, maxHp:100, dmg:[16,25],
      xp:90, gold:40, topic:null, maxDiff:3, questionType:'write',
      flavor:'Un golem construit din linii de cod incorect. Rezolvă sau pieri!',
    },

    // ── Bosses ──────────────────────────────────────────────────
    {
      id:'boss_type_lord', name:'Lordul Tipurilor', sprite:'🐉',
      hp:120, maxHp:120, dmg:[18,28],
      xp:120, gold:60, topic:null, maxDiff:2, isBoss:true,
      flavor:'Stăpânul Criptei. Cunoaște toate tipurile de date!',
    },
    {
      id:'boss_loop_master', name:'Maestrul Buclelor', sprite:'🔮',
      hp:160, maxHp:160, dmg:[22,33],
      xp:170, gold:85, topic:null, maxDiff:3, isBoss:true,
      flavor:'Maestrul Labirintului. Controlează toate buclele din cod!',
    },
    {
      id:'boss_syntax_error', name:'Marea Eroare de Sintaxă', sprite:'🌑',
      hp:210, maxHp:210, dmg:[26,40],
      xp:260, gold:130, topic:null, maxDiff:3, isBoss:true,
      flavor:'Forma finală a haosului. Codul tău moare la contactul cu ea!',
    },
    {
      id:'boss_grand_master', name:'Marele Maestru al Sintaxei', sprite:'📜',
      hp:180, maxHp:180, dmg:[20,32],
      xp:300, gold:150, topic:null, maxDiff:3, isBoss:true, questionType:'write',
      flavor:'Cel mai temut programator din dungeon. Te va pune să scrii cod perfect!',
    },
  ];

  return {
    getById:  (id)           => _data.find(e => e.id === id),
    getRandom:(excludeIds=[])=> {
      const pool = _data.filter(e => !e.isBoss && !excludeIds.includes(e.id));
      return pool[Math.floor(Math.random() * pool.length)];
    },
  };
})();


const DungeonRepository = (() => {
  const _floors = [
    {
      id:1, name:'Cripta Variabilelor',
      rooms:[
        { type:'COMBAT',   id:'bug_goblin',      icon:'👺' },
        { type:'DOOR',     topic:'variabile',     icon:'🚪' },
        { type:'TREASURE', potions:1, gold:10,    icon:'💎' },
        { type:'COMBAT',   id:'logic_witch',      icon:'🧙‍♀️' },
        { type:'BOSS',     id:'boss_type_lord',   icon:'♛' },
      ],
    },
    {
      id:2, name:'Labirintul Buclelor',
      rooms:[
        { type:'DOOR',     topic:'operatori',     icon:'🚪' },
        { type:'COMBAT',   id:'loop_lich',        icon:'💀' },
        { type:'TREASURE', potions:2, gold:20,    icon:'💎' },
        { type:'DOOR',     topic:'bucle',         icon:'🚪' },
        { type:'COMBAT',   id:'string_specter',   icon:'👻' },
        { type:'BOSS',     id:'boss_loop_master', icon:'♛' },
      ],
    },
    {
      id:3, name:'Citadela Erorii',
      rooms:[
        { type:'COMBAT',   id:'list_demon',       icon:'😈' },
        { type:'DOOR',     topic:'șiruri',        icon:'🚪' },
        { type:'TREASURE', potions:2, gold:30,    icon:'💎' },
        { type:'DOOR',     topic:'liste',         icon:'🚪' },
        { type:'COMBAT',   id:'func_phantom',     icon:'🌀' },
        { type:'COMBAT',   id:'dict_daemon',      icon:'📖' },
        { type:'BOSS',     id:'boss_syntax_error',icon:'♛' },
      ],
    },
    {
      id:4, name:'Sala Scriptorilor',
      rooms:[
        { type:'COMBAT',   id:'scribe_wraith',    icon:'🖊️' },
        { type:'WRITE_DOOR', topic:'scriere',     icon:'✍️' },
        { type:'TREASURE', potions:2, gold:35,    icon:'💎' },
        { type:'COMBAT',   id:'algo_golem',       icon:'🤖' },
        { type:'WRITE_DOOR', topic:'scriere',     icon:'✍️' },
        { type:'COMBAT',   id:'scribe_wraith',    icon:'🖊️' },
        { type:'BOSS',     id:'boss_grand_master',icon:'♛' },
      ],
    },
  ];

  return {
    get:   (n) => _floors.find(f => f.id === n),
    total: ()  => _floors.length,
  };
})();