'use strict';

const enemies9 = [
  { id:'bug_goblin',     name:'Goblinul Bug',             sprite:'👺',  hp:40,  maxHp:40,  dmg:[8,14],  xp:30,  gold:15, topic:'variabile',  maxDiff:2, flavor:'Trăiește în variabilele nedefinite și erori de tip!' },
  { id:'logic_witch',    name:'Vrăjitoarea Logicii',      sprite:'🧙‍♀️', hp:55,  maxHp:55,  dmg:[10,18], xp:45,  gold:20, topic:'operatori',   maxDiff:2, flavor:'Manipulează operatorii logici pentru a-ți zăpăci mintea.' },
  { id:'loop_lich',      name:'Lich-ul Buclei',           sprite:'💀',  hp:70,  maxHp:70,  dmg:[12,20], xp:60,  gold:25, topic:'bucle',       maxDiff:2, flavor:'Te va prinde în bucle infinite pentru eternitate!' },
  { id:'string_specter', name:'Spectrul Șirurilor',       sprite:'👻',  hp:65,  maxHp:65,  dmg:[11,17], xp:50,  gold:22, topic:'șiruri',      maxDiff:2, flavor:'Un fantom format din caractere ASCII corupte.' },
  { id:'list_demon',     name:'Demonul Listelor',         sprite:'😈',  hp:80,  maxHp:80,  dmg:[14,22], xp:70,  gold:30, topic:'liste',       maxDiff:2, flavor:'Amestecă indecșii și provoacă IndexError!' },
  { id:'func_phantom',   name:'Fantoma Funcțiilor',       sprite:'🌀',  hp:75,  maxHp:75,  dmg:[13,21], xp:65,  gold:28, topic:'funcții',     maxDiff:3, flavor:'O funcție recursivă care s-a pierdut în stack.' },
  { id:'dict_daemon',    name:'Demonul Dicționarelor',    sprite:'📖',  hp:85,  maxHp:85,  dmg:[14,22], xp:75,  gold:32, topic:'dicționare',  maxDiff:2, flavor:'Confundă cheile cu valorile și provoacă KeyError!' },
  { id:'scribe_wraith',  name:'Strigoi Scriptor',         sprite:'🖊️', hp:90,  maxHp:90,  dmg:[15,23], xp:80,  gold:35, topic:null, maxDiff:2, questionType:'write', flavor:'Îți cere să scrii cod corect – sau suferi consecințele!' },
  { id:'algo_golem',     name:'Golemul Algoritmilor',     sprite:'🤖',  hp:100, maxHp:100, dmg:[16,25], xp:90,  gold:40, topic:null, maxDiff:3, questionType:'write', flavor:'Un golem construit din linii de cod incorect. Rezolvă sau pieri!' },
  { id:'boss_type_lord',    name:'Lordul Tipurilor',          sprite:'🐉', hp:120, maxHp:120, dmg:[18,28], xp:120, gold:60,  topic:null, maxDiff:2, isBoss:true, flavor:'Stăpânul Criptei. Cunoaște toate tipurile de date!' },
  { id:'boss_loop_master',  name:'Maestrul Buclelor',         sprite:'🔮', hp:160, maxHp:160, dmg:[22,33], xp:170, gold:85,  topic:null, maxDiff:3, isBoss:true, flavor:'Maestrul Labirintului. Controlează toate buclele din cod!' },
  { id:'boss_syntax_error', name:'Marea Eroare de Sintaxă',   sprite:'🌑', hp:210, maxHp:210, dmg:[26,40], xp:260, gold:130, topic:null, maxDiff:3, isBoss:true, flavor:'Forma finală a haosului. Codul tău moare la contactul cu ea!' },
  { id:'boss_grand_master', name:'Marele Maestru al Sintaxei',sprite:'📜', hp:180, maxHp:180, dmg:[20,32], xp:300, gold:150, topic:null, maxDiff:3, isBoss:true, questionType:'write', flavor:'Cel mai temut programator din dungeon. Te va pune să scrii cod perfect!' },
];

const floors9 = [
  {
    id:1, name:'Cripta Variabilelor',
    rooms:[
      { type:'COMBAT',   id:'bug_goblin',    icon:'👺' },
      { type:'DOOR',     topic:'variabile',  icon:'🚪' },
      { type:'TREASURE', potions:1, gold:10, icon:'💎' },
      { type:'COMBAT',   id:'logic_witch',   icon:'🧙‍♀️' },
      { type:'BOSS',     id:'boss_type_lord',icon:'♛' },
    ],
  },
  {
    id:2, name:'Labirintul Buclelor',
    rooms:[
      { type:'DOOR',     topic:'operatori',  icon:'🚪' },
      { type:'COMBAT',   id:'loop_lich',     icon:'💀' },
      { type:'TREASURE', potions:1, gold:20, icon:'💎' },
      { type:'DOOR',     topic:'bucle',      icon:'🚪' },
      { type:'COMBAT',   id:'string_specter',icon:'👻' },
      { type:'BOSS',     id:'boss_loop_master',icon:'♛' },
    ],
  },
  {
    id:3, name:'Citadela Erorii',
    rooms:[
      { type:'COMBAT',   id:'list_demon',    icon:'😈' },
      { type:'DOOR',     topic:'șiruri',     icon:'🚪' },
      { type:'TREASURE', potions:1, gold:30, icon:'💎' },
      { type:'DOOR',     topic:'liste',      icon:'🚪' },
      { type:'COMBAT',   id:'func_phantom',  icon:'🌀' },
      { type:'COMBAT',   id:'dict_daemon',   icon:'📖' },
      { type:'BOSS',     id:'boss_syntax_error',icon:'♛' },
    ],
  },
  {
    id:4, name:'Sala Scriptorilor',
    rooms:[
      { type:'COMBAT',    id:'scribe_wraith', icon:'🖊️' },
      { type:'WRITE_DOOR',topic:'scriere',    icon:'✍️' },
      { type:'TREASURE',  potions:1, gold:35, icon:'💎' },
      { type:'COMBAT',    id:'algo_golem',    icon:'🤖' },
      { type:'WRITE_DOOR',topic:'scriere',    icon:'✍️' },
      { type:'COMBAT',    id:'scribe_wraith', icon:'🖊️' },
      { type:'BOSS',      id:'boss_grand_master',icon:'♛' },
    ],
  },
];

const enemies10 = [
  { id:'array_shade',    name:'Umbra Tabloului',      sprite:'🌫️', hp:65,  maxHp:65,  dmg:[10,17], xp:45,  gold:20, topic:'tablouri', maxDiff:2, flavor:'O umbră formată din indecși greșiți și erori IndexError!' },
  { id:'matrix_golem',   name:'Golemul Matricilor',   sprite:'🟦', hp:80,  maxHp:80,  dmg:[13,20], xp:58,  gold:26, topic:'matrici',  maxDiff:2, flavor:'Construit din linii și coloane corupte. Transpunerea ta e greșită!' },
  { id:'sort_spirit',    name:'Spiritul Sortării',    sprite:'🔀', hp:75,  maxHp:75,  dmg:[12,19], xp:52,  gold:23, topic:'sortare',  maxDiff:2, flavor:'Amestecă elementele listelor tale în haos permanent!' },
  { id:'binary_beast',   name:'Bestia Binară',        sprite:'⚡', hp:90,  maxHp:90,  dmg:[15,23], xp:68,  gold:30, topic:'cautare',  maxDiff:3, flavor:'Înjumătățește tot ce întâlnește – inclusiv speranțele tale!' },
  { id:'file_fiend',     name:'Demonul Fișierelor',   sprite:'📂', hp:85,  maxHp:85,  dmg:[14,21], xp:62,  gold:27, topic:'fisiere',  maxDiff:2, flavor:'Corupt fișierele și provoacă FileNotFoundError la tot pasul!' },
  { id:'merge_phantom',  name:'Fantoma Interclasării',sprite:'🔗', hp:70,  maxHp:70,  dmg:[11,18], xp:48,  gold:21, topic:'tablouri', maxDiff:3, flavor:'Amestecă vectorii sortați până nu mai poți deosebi ordinea!' },
  { id:'boss10_array',   name:'Regele Vectorilor',    sprite:'👑', hp:140, maxHp:140, dmg:[20,30], xp:140, gold:70,  topic:'tablouri', maxDiff:3, isBoss:true, flavor:'Stăpânul tuturor tablourilor. Cunoaște fiecare index pe dinafară!' },
  { id:'boss10_matrix',  name:'Lordul Matricilor',    sprite:'🏯', hp:170, maxHp:170, dmg:[23,34], xp:180, gold:90,  topic:'matrici',  maxDiff:3, isBoss:true, flavor:'Controlează toate matricile din regat. Transpunerea îi e armă!' },
  { id:'boss10_algo',    name:'Maestrul Algoritmilor',sprite:'⚔️', hp:200, maxHp:200, dmg:[26,38], xp:215, gold:108, topic:'sortare',  maxDiff:3, isBoss:true, flavor:'Sortează și caută la viteza luminii. Eficiența lui: O(n log n)!' },
  { id:'boss10_arch',    name:'Arhimagul Fișierelor', sprite:'📜', hp:210, maxHp:210, dmg:[27,40], xp:260, gold:130, topic:null, maxDiff:3, isBoss:true, questionType:'write', flavor:'Scrie programe perfecte sau vei rătăci în fișierele corupte!' },
];

const floors10 = [
  {
    id:1, name:'Tărâmul Tablourilor',
    rooms:[
      { type:'COMBAT',   id:'array_shade',    icon:'🌫️' },
      { type:'DOOR',     topic:'tablouri',    icon:'🚪' },
      { type:'TREASURE', potions:1, gold:12,  icon:'💎' },
      { type:'COMBAT',   id:'merge_phantom',  icon:'🔗' },
      { type:'BOSS',     id:'boss10_array',   icon:'♛' },
    ],
  },
  {
    id:2, name:'Cetatea Matricilor',
    rooms:[
      { type:'DOOR',     topic:'tablouri',    icon:'🚪' },
      { type:'COMBAT',   id:'matrix_golem',   icon:'🟦' },
      { type:'TREASURE', potions:1, gold:22,  icon:'💎' },
      { type:'DOOR',     topic:'matrici',     icon:'🚪' },
      { type:'COMBAT',   id:'sort_spirit',    icon:'🔀' },
      { type:'BOSS',     id:'boss10_matrix',  icon:'♛' },
    ],
  },
  {
    id:3, name:'Abisul Algoritmilor',
    rooms:[
      { type:'COMBAT',   id:'sort_spirit',    icon:'🔀' },
      { type:'DOOR',     topic:'sortare',     icon:'🚪' },
      { type:'TREASURE', potions:1, gold:30,  icon:'💎' },
      { type:'DOOR',     topic:'cautare',     icon:'🚪' },
      { type:'COMBAT',   id:'binary_beast',   icon:'⚡' },
      { type:'COMBAT',   id:'sort_spirit',    icon:'🔀' },
      { type:'BOSS',     id:'boss10_algo',    icon:'♛' },
    ],
  },
  {
    id:4, name:'Fortăreața Fișierelor',
    rooms:[
      { type:'COMBAT',    id:'file_fiend',    icon:'📂' },
      { type:'WRITE_DOOR',topic:'scriere_10', icon:'✍️' },
      { type:'TREASURE',  potions:1, gold:38, icon:'💎' },
      { type:'COMBAT',    id:'binary_beast',  icon:'⚡' },
      { type:'WRITE_DOOR',topic:'scriere_10', icon:'✍️' },
      { type:'COMBAT',    id:'file_fiend',    icon:'📂' },
      { type:'BOSS',      id:'boss10_arch',   icon:'♛' },
    ],
  },
];

const enemies11 = [
  { id:'recursion_revenant', name:'Revenantul Recursiv',   sprite:'🌀', hp:75,  maxHp:75,  dmg:[14,21], xp:55,  gold:24, topic:'recursivitate', maxDiff:3, flavor:'Se cheamă pe sine la infinit, fără condiție de oprire!' },
  { id:'backtrack_banshee',  name:'Banshee Backtracking',  sprite:'👹', hp:90,  maxHp:90,  dmg:[16,24], xp:70,  gold:30, topic:'backtracking',  maxDiff:3, flavor:'Explorează toate căile posibile și le blochează pe toate!' },
  { id:'stack_stalker',      name:'Persecutorul Stivei',   sprite:'📚', hp:80,  maxHp:80,  dmg:[14,22], xp:60,  gold:27, topic:'structuri_date', maxDiff:2, flavor:'Pop și push – te urmărește prin toate apelurile recursive!' },
  { id:'oop_oracle',         name:'Oracolul Claselor',     sprite:'🔮', hp:95,  maxHp:95,  dmg:[17,26], xp:75,  gold:33, topic:'OOP',            maxDiff:3, flavor:'Invocă instanțe, moșteniri și polimorfism împotriva ta!' },
  { id:'hanoi_horror',       name:'Groaza Hanoi',          sprite:'🗼', hp:85,  maxHp:85,  dmg:[15,23], xp:65,  gold:28, topic:'recursivitate', maxDiff:3, flavor:'3 discuri, infinit de apeluri. Ești pierdut pe stivă!' },
  { id:'fib_fiend',          name:'Demonul Fibonacci',     sprite:'🐚', hp:70,  maxHp:70,  dmg:[12,20], xp:50,  gold:22, topic:'recursivitate', maxDiff:2, flavor:'Crește exponențial, consumând toate resursele tale!' },
  { id:'boss11_recursion',   name:'Spiritul Infinitului',  sprite:'♾️', hp:160, maxHp:160, dmg:[22,32], xp:165, gold:82,  topic:'recursivitate', maxDiff:3, isBoss:true, flavor:'Recursivitate fără sfârșit. Condiția de oprire nu există pentru el!' },
  { id:'boss11_backtrack',   name:'Labirintul Viu',        sprite:'🌑', hp:190, maxHp:190, dmg:[25,36], xp:205, gold:103, topic:'backtracking',  maxDiff:3, isBoss:true, flavor:'Generează toate permutările posibile ale agoniei tale!' },
  { id:'boss11_struct',      name:'Arhitectul Datelor',    sprite:'🏗️', hp:210, maxHp:210, dmg:[27,38], xp:230, gold:115, topic:'structuri_date', maxDiff:3, isBoss:true, flavor:'Construiește structuri de date impenetrabile din codul tău defect!' },
  { id:'boss11_oop',         name:'Marele Arhitect OOP',   sprite:'🐍', hp:230, maxHp:230, dmg:[29,42], xp:290, gold:145, topic:null, maxDiff:3, isBoss:true, questionType:'write', flavor:'Stăpânul obiectelor, claselor și moștenirii. Scrie cod OOP perfect!' },
];

const floors11 = [
  {
    id:1, name:'Labirintul Recursivității',
    rooms:[
      { type:'COMBAT',   id:'fib_fiend',          icon:'🐚' },
      { type:'DOOR',     topic:'recursivitate',   icon:'🚪' },
      { type:'TREASURE', potions:1, gold:14,       icon:'💎' },
      { type:'COMBAT',   id:'recursion_revenant', icon:'🌀' },
      { type:'BOSS',     id:'boss11_recursion',   icon:'♛' },
    ],
  },
  {
    id:2, name:'Câmpul Backtracking',
    rooms:[
      { type:'DOOR',     topic:'recursivitate',   icon:'🚪' },
      { type:'COMBAT',   id:'backtrack_banshee',  icon:'👹' },
      { type:'TREASURE', potions:1, gold:25,       icon:'💎' },
      { type:'DOOR',     topic:'backtracking',    icon:'🚪' },
      { type:'COMBAT',   id:'hanoi_horror',       icon:'🗼' },
      { type:'BOSS',     id:'boss11_backtrack',   icon:'♛' },
    ],
  },
  {
    id:3, name:'Citadela Structurilor',
    rooms:[
      { type:'COMBAT',   id:'stack_stalker',      icon:'📚' },
      { type:'DOOR',     topic:'structuri_date',  icon:'🚪' },
      { type:'TREASURE', potions:1, gold:32,       icon:'💎' },
      { type:'DOOR',     topic:'structuri_date',  icon:'🚪' },
      { type:'COMBAT',   id:'stack_stalker',      icon:'📚' },
      { type:'COMBAT',   id:'backtrack_banshee',  icon:'👹' },
      { type:'BOSS',     id:'boss11_struct',      icon:'♛' },
    ],
  },
  {
    id:4, name:'Cetatea OOP-ului',
    rooms:[
      { type:'COMBAT',    id:'oop_oracle',     icon:'🔮' },
      { type:'WRITE_DOOR',topic:'scriere_11',  icon:'✍️' },
      { type:'TREASURE',  potions:1, gold:40,  icon:'💎' },
      { type:'COMBAT',    id:'oop_oracle',     icon:'🔮' },
      { type:'WRITE_DOOR',topic:'scriere_11',  icon:'✍️' },
      { type:'COMBAT',    id:'oop_oracle',     icon:'🔮' },
      { type:'BOSS',      id:'boss11_oop',     icon:'♛' },
    ],
  },
];

const dungeonData = {
  9:  { floors: floors9,  enemies: enemies9  },
  10: { floors: floors10, enemies: enemies10 },
  11: { floors: floors11, enemies: enemies11 },
};

module.exports = dungeonData;
