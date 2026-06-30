'use strict';

// ============================================================
//  Clasa a IX-a — Bazele Python & Structuri Liniare
//  variabile · operatori · condiționale · bucle · liste ·
//  funcții · sortare · căutare · fișiere · stive & cozi · scriere
// ============================================================
const enemies9 = [
  { id:'bug_goblin',     name:'Goblinul Bug',          sprite:'👺',  hp:40,  maxHp:40,  dmg:[8,14],  xp:30,  gold:15, topic:'variabile',    maxDiff:2, flavor:'Trăiește în variabilele nedefinite și în erorile de tip!' },
  { id:'logic_witch',    name:'Vrăjitoarea Logicii',   sprite:'🧙‍♀️', hp:55,  maxHp:55,  dmg:[10,18], xp:45,  gold:20, topic:'operatori',    maxDiff:2, flavor:'Manipulează operatorii logici pentru a-ți zăpăci mintea.' },
  { id:'cond_cultist',   name:'Cultistul Condiției',   sprite:'🔱',  hp:60,  maxHp:60,  dmg:[11,18], xp:48,  gold:21, topic:'condiționale', maxDiff:2, flavor:'Te prinde mereu pe ramura greșită a lui if / else!' },
  { id:'loop_lich',      name:'Lich-ul Buclei',        sprite:'💀',  hp:70,  maxHp:70,  dmg:[12,20], xp:60,  gold:25, topic:'bucle',        maxDiff:2, flavor:'Te va prinde în bucle infinite pentru eternitate!' },
  { id:'list_demon',     name:'Demonul Listelor',      sprite:'😈',  hp:80,  maxHp:80,  dmg:[14,22], xp:70,  gold:30, topic:'liste',        maxDiff:2, flavor:'Amestecă indecșii și provoacă IndexError!' },
  { id:'func_phantom',   name:'Fantoma Funcțiilor',    sprite:'🌀',  hp:75,  maxHp:75,  dmg:[13,21], xp:65,  gold:28, topic:'funcții',      maxDiff:3, flavor:'O funcție care s-a pierdut în propriul apel.' },
  { id:'sort_shade',     name:'Umbra Sortării',        sprite:'🔀',  hp:78,  maxHp:78,  dmg:[13,21], xp:62,  gold:27, topic:'sortare',      maxDiff:2, flavor:'Amestecă elementele listelor tale în haos permanent!' },
  { id:'search_seeker',  name:'Căutătorul Binar',      sprite:'⚡',  hp:85,  maxHp:85,  dmg:[14,22], xp:68,  gold:30, topic:'cautare',      maxDiff:3, flavor:'Înjumătățește tot ce întâlnește – inclusiv speranțele tale!' },
  { id:'file_fiend',     name:'Demonul Fișierelor',    sprite:'📂',  hp:82,  maxHp:82,  dmg:[14,21], xp:64,  gold:28, topic:'fisiere',      maxDiff:2, flavor:'Corupe fișierele și provoacă FileNotFoundError la tot pasul!' },
  { id:'stack_stalker',  name:'Persecutorul Stivei',   sprite:'📚',  hp:88,  maxHp:88,  dmg:[15,23], xp:72,  gold:32, topic:'stive_cozi',   maxDiff:2, flavor:'Push și pop – te urmărește prin LIFO și FIFO!' },
  { id:'scribe_wraith',  name:'Strigoiul Scriptor',    sprite:'🖊️', hp:90,  maxHp:90,  dmg:[15,23], xp:80,  gold:35, topic:null, maxDiff:2, questionType:'write', flavor:'Îți cere să scrii cod corect – sau suferi consecințele!' },
  { id:'algo_golem',     name:'Golemul Algoritmilor',  sprite:'🤖',  hp:100, maxHp:100, dmg:[16,25], xp:90,  gold:40, topic:null, maxDiff:3, questionType:'write', flavor:'Un golem construit din linii de cod incorect. Rezolvă sau pieri!' },
  { id:'boss9_type_lord',  name:'Lordul Tipurilor',        sprite:'🐉', hp:120, maxHp:120, dmg:[18,28], xp:120, gold:60,  topic:null, maxDiff:2, isBoss:true, flavor:'Stăpânul Criptei. Cunoaște toate tipurile de date!' },
  { id:'boss9_loop_master',name:'Maestrul Buclelor',       sprite:'🔮', hp:160, maxHp:160, dmg:[22,33], xp:170, gold:85,  topic:null, maxDiff:3, isBoss:true, flavor:'Maestrul Labirintului. Controlează toate buclele din cod!' },
  { id:'boss9_algo',       name:'Oracolul Algoritmilor',   sprite:'⚔️', hp:185, maxHp:185, dmg:[24,36], xp:215, gold:108, topic:null, maxDiff:3, isBoss:true, flavor:'Sortează și caută la viteza luminii. Eficiența lui: O(n log n)!' },
  { id:'boss9_grand_master',name:'Marele Maestru al Sintaxei',sprite:'📜', hp:200, maxHp:200, dmg:[26,38], xp:300, gold:150, topic:null, maxDiff:3, isBoss:true, questionType:'write', flavor:'Cel mai temut programator din criptă. Te va pune să scrii cod perfect!' },
];

const floors9 = [
  {
    id:1, name:'Cripta Variabilelor',
    rooms:[
      { type:'COMBAT',   id:'bug_goblin',     icon:'👺' },
      { type:'DOOR',     topic:'variabile',   icon:'🚪' },
      { type:'TREASURE', potions:1, gold:10,  icon:'💎' },
      { type:'COMBAT',   id:'logic_witch',    icon:'🧙‍♀️' },
      { type:'DOOR',     topic:'operatori',   icon:'🚪' },
      { type:'COMBAT',   id:'cond_cultist',   icon:'🔱' },
      { type:'BOSS',     id:'boss9_type_lord',icon:'♛' },
    ],
  },
  {
    id:2, name:'Labirintul Buclelor',
    rooms:[
      { type:'DOOR',     topic:'condiționale',  icon:'🚪' },
      { type:'COMBAT',   id:'loop_lich',        icon:'💀' },
      { type:'TREASURE', potions:1, gold:20,    icon:'💎' },
      { type:'DOOR',     topic:'bucle',         icon:'🚪' },
      { type:'COMBAT',   id:'list_demon',       icon:'😈' },
      { type:'DOOR',     topic:'liste',         icon:'🚪' },
      { type:'COMBAT',   id:'func_phantom',     icon:'🌀' },
      { type:'BOSS',     id:'boss9_loop_master',icon:'♛' },
    ],
  },
  {
    id:3, name:'Cavoul Algoritmilor',
    rooms:[
      { type:'COMBAT',   id:'sort_shade',     icon:'🔀' },
      { type:'DOOR',     topic:'sortare',     icon:'🚪' },
      { type:'TREASURE', potions:1, gold:30,  icon:'💎' },
      { type:'DOOR',     topic:'cautare',     icon:'🚪' },
      { type:'COMBAT',   id:'search_seeker',  icon:'⚡' },
      { type:'COMBAT',   id:'sort_shade',     icon:'🔀' },
      { type:'BOSS',     id:'boss9_algo',     icon:'♛' },
    ],
  },
  {
    id:4, name:'Sala Structurilor Liniare',
    rooms:[
      { type:'COMBAT',    id:'stack_stalker',     icon:'📚' },
      { type:'DOOR',      topic:'stive_cozi',     icon:'🚪' },
      { type:'TREASURE',  potions:1, gold:35,     icon:'💎' },
      { type:'COMBAT',    id:'file_fiend',        icon:'📂' },
      { type:'DOOR',      topic:'fisiere',        icon:'🚪' },
      { type:'WRITE_DOOR',topic:'scriere',        icon:'✍️' },
      { type:'COMBAT',    id:'scribe_wraith',     icon:'🖊️' },
      { type:'COMBAT',    id:'algo_golem',        icon:'🤖' },
      { type:'BOSS',      id:'boss9_grand_master',icon:'♛' },
    ],
  },
];

// ============================================================
//  Clasa a X-a — Tablouri, Șiruri & Recursivitate
//  șiruri · dicționare · tupluri · tablouri · matrici · recursivitate · scriere
// ============================================================
const enemies10 = [
  { id:'string_specter', name:'Spectrul Șirurilor',    sprite:'👻',  hp:68,  maxHp:68,  dmg:[11,18], xp:50,  gold:22, topic:'șiruri',        maxDiff:2, flavor:'Un fantom format din caractere ASCII corupte.' },
  { id:'tuple_twin',     name:'Gemenii Imutabili',     sprite:'⛓️',  hp:64,  maxHp:64,  dmg:[10,17], xp:46,  gold:20, topic:'tupluri',       maxDiff:2, flavor:'Tupluri care nu se schimbă niciodată – și nici nu te iartă!' },
  { id:'dict_daemon',    name:'Demonul Dicționarelor', sprite:'📖',  hp:85,  maxHp:85,  dmg:[14,22], xp:75,  gold:32, topic:'dicționare',    maxDiff:2, flavor:'Confundă cheile cu valorile și provoacă KeyError!' },
  { id:'array_shade',    name:'Umbra Tabloului',       sprite:'🌫️', hp:75,  maxHp:75,  dmg:[12,19], xp:55,  gold:24, topic:'tablouri',      maxDiff:2, flavor:'O umbră formată din indecși greșiți și erori IndexError!' },
  { id:'matrix_golem',   name:'Golemul Matricilor',    sprite:'🟦',  hp:88,  maxHp:88,  dmg:[14,22], xp:64,  gold:28, topic:'matrici',       maxDiff:2, flavor:'Construit din linii și coloane corupte. Transpunerea ta e greșită!' },
  { id:'recursion_revenant',name:'Revenantul Recursiv',sprite:'🌀',  hp:82,  maxHp:82,  dmg:[14,22], xp:62,  gold:27, topic:'recursivitate', maxDiff:3, flavor:'Se cheamă pe sine la infinit, fără condiție de oprire!' },
  { id:'fib_fiend',      name:'Demonul Fibonacci',     sprite:'🐚',  hp:74,  maxHp:74,  dmg:[12,20], xp:52,  gold:23, topic:'recursivitate', maxDiff:2, flavor:'Crește exponențial, consumând toate resursele tale!' },
  { id:'scribe10',       name:'Scribul Vectorilor',    sprite:'🖋️', hp:95,  maxHp:95,  dmg:[15,24], xp:82,  gold:36, topic:null, maxDiff:3, questionType:'write', flavor:'Scrie cod pe vectori și fișiere – sau pieri!' },
  { id:'boss10_text',    name:'Tăcutul Șirurilor',     sprite:'👑',  hp:135, maxHp:135, dmg:[19,29], xp:135, gold:68,  topic:null, maxDiff:2, isBoss:true, flavor:'Stăpânul textului și al cheilor. Indexare și slicing sunt armele lui!' },
  { id:'boss10_array',   name:'Regele Vectorilor',     sprite:'🏰',  hp:160, maxHp:160, dmg:[22,32], xp:165, gold:82,  topic:null, maxDiff:3, isBoss:true, flavor:'Stăpânul tuturor tablourilor. Cunoaște fiecare index pe dinafară!' },
  { id:'boss10_matrix',  name:'Lordul Matricilor',     sprite:'🏯',  hp:185, maxHp:185, dmg:[24,35], xp:200, gold:100, topic:null, maxDiff:3, isBoss:true, flavor:'Controlează toate matricile din regat. Transpunerea îi e armă!' },
  { id:'boss10_recursion',name:'Spiritul Infinitului', sprite:'♾️',  hp:210, maxHp:210, dmg:[27,40], xp:260, gold:130, topic:null, maxDiff:3, isBoss:true, questionType:'write', flavor:'Recursivitate fără sfârșit. Scrie condiția de oprire sau rătăcești veșnic!' },
];

const floors10 = [
  {
    id:1, name:'Tărâmul Șirurilor',
    rooms:[
      { type:'COMBAT',   id:'string_specter', icon:'👻' },
      { type:'DOOR',     topic:'șiruri',      icon:'🚪' },
      { type:'TREASURE', potions:1, gold:12,  icon:'💎' },
      { type:'COMBAT',   id:'tuple_twin',     icon:'⛓️' },
      { type:'DOOR',     topic:'tupluri',     icon:'🚪' },
      { type:'BOSS',     id:'boss10_text',    icon:'♛' },
    ],
  },
  {
    id:2, name:'Biblioteca Dicționarelor',
    rooms:[
      { type:'DOOR',     topic:'dicționare',  icon:'🚪' },
      { type:'COMBAT',   id:'dict_daemon',    icon:'📖' },
      { type:'TREASURE', potions:1, gold:22,  icon:'💎' },
      { type:'DOOR',     topic:'tablouri',    icon:'🚪' },
      { type:'COMBAT',   id:'array_shade',    icon:'🌫️' },
      { type:'BOSS',     id:'boss10_array',   icon:'♛' },
    ],
  },
  {
    id:3, name:'Cetatea Matricilor',
    rooms:[
      { type:'COMBAT',   id:'matrix_golem',   icon:'🟦' },
      { type:'DOOR',     topic:'matrici',     icon:'🚪' },
      { type:'TREASURE', potions:1, gold:30,  icon:'💎' },
      { type:'DOOR',     topic:'tablouri',    icon:'🚪' },
      { type:'COMBAT',   id:'array_shade',    icon:'🌫️' },
      { type:'BOSS',     id:'boss10_matrix',  icon:'♛' },
    ],
  },
  {
    id:4, name:'Abisul Recursivității',
    rooms:[
      { type:'COMBAT',    id:'fib_fiend',         icon:'🐚' },
      { type:'DOOR',      topic:'recursivitate',  icon:'🚪' },
      { type:'TREASURE',  potions:1, gold:38,     icon:'💎' },
      { type:'COMBAT',    id:'recursion_revenant',icon:'🌀' },
      { type:'WRITE_DOOR',topic:'scriere_10',     icon:'✍️' },
      { type:'COMBAT',    id:'scribe10',          icon:'🖋️' },
      { type:'BOSS',      id:'boss10_recursion',  icon:'♛' },
    ],
  },
];

// ============================================================
//  Clasa a XI-a — Algoritmi Avansați, Grafuri & OOP
//  backtracking · grafuri (BFS/DFS) · OOP · scriere
// ============================================================
const enemies11 = [
  { id:'graph_wraith',    name:'Strigoiul Grafului',   sprite:'🕸️', hp:82,  maxHp:82,  dmg:[14,22], xp:62,  gold:27, topic:'grafuri',      maxDiff:2, flavor:'Te încurcă în muchii și noduri până uiți pe unde ai intrat!' },
  { id:'bfs_phantom',     name:'Fantoma BFS',          sprite:'🌐',  hp:90,  maxHp:90,  dmg:[15,23], xp:70,  gold:31, topic:'grafuri',      maxDiff:3, flavor:'Parcurge totul în lățime, nivel cu nivel, și te prinde din coadă!' },
  { id:'backtrack_banshee',name:'Banshee Backtracking',sprite:'👹',  hp:92,  maxHp:92,  dmg:[16,24], xp:72,  gold:32, topic:'backtracking', maxDiff:3, flavor:'Explorează toate căile posibile și le blochează pe toate!' },
  { id:'oop_oracle',      name:'Oracolul Claselor',    sprite:'🔮',  hp:95,  maxHp:95,  dmg:[17,26], xp:75,  gold:33, topic:'OOP',          maxDiff:3, flavor:'Invocă instanțe, moșteniri și polimorfism împotriva ta!' },
  { id:'scribe11',        name:'Scribul Obiectelor',   sprite:'🪶',  hp:100, maxHp:100, dmg:[16,25], xp:85,  gold:38, topic:null, maxDiff:3, questionType:'write', flavor:'Îți cere clase și recursii scrise perfect!' },
  { id:'boss11_graph',    name:'Suveranul Grafurilor', sprite:'🗺️', hp:175, maxHp:175, dmg:[23,34], xp:185, gold:92,  topic:null, maxDiff:3, isBoss:true, flavor:'Stăpânul tuturor drumurilor. BFS și DFS îi sunt supuse!' },
  { id:'boss11_backtrack',name:'Labirintul Viu',       sprite:'🌑',  hp:195, maxHp:195, dmg:[25,36], xp:210, gold:105, topic:null, maxDiff:3, isBoss:true, flavor:'Generează toate permutările posibile ale agoniei tale!' },
  { id:'boss11_oop',      name:'Marele Arhitect OOP',  sprite:'🐍',  hp:230, maxHp:230, dmg:[29,42], xp:290, gold:145, topic:null, maxDiff:3, isBoss:true, questionType:'write', flavor:'Stăpânul obiectelor, claselor și moștenirii. Scrie cod OOP perfect!' },
];

const floors11 = [
  {
    id:1, name:'Pădurea Grafurilor',
    rooms:[
      { type:'COMBAT',   id:'graph_wraith',   icon:'🕸️' },
      { type:'DOOR',     topic:'grafuri',     icon:'🚪' },
      { type:'TREASURE', potions:1, gold:14,  icon:'💎' },
      { type:'COMBAT',   id:'bfs_phantom',    icon:'🌐' },
      { type:'DOOR',     topic:'grafuri',     icon:'🚪' },
      { type:'BOSS',     id:'boss11_graph',   icon:'♛' },
    ],
  },
  {
    id:2, name:'Câmpul Backtracking',
    rooms:[
      { type:'DOOR',     topic:'backtracking',   icon:'🚪' },
      { type:'COMBAT',   id:'backtrack_banshee', icon:'👹' },
      { type:'TREASURE', potions:1, gold:25,     icon:'💎' },
      { type:'DOOR',     topic:'backtracking',   icon:'🚪' },
      { type:'COMBAT',   id:'graph_wraith',      icon:'🕸️' },
      { type:'BOSS',     id:'boss11_backtrack',  icon:'♛' },
    ],
  },
  {
    id:3, name:'Cetatea OOP-ului',
    rooms:[
      { type:'COMBAT',   id:'oop_oracle',     icon:'🔮' },
      { type:'DOOR',     topic:'OOP',         icon:'🚪' },
      { type:'TREASURE', potions:1, gold:32,  icon:'💎' },
      { type:'DOOR',     topic:'OOP',         icon:'🚪' },
      { type:'COMBAT',   id:'oop_oracle',     icon:'🔮' },
      { type:'COMBAT',   id:'backtrack_banshee',icon:'👹' },
      { type:'BOSS',     id:'boss11_oop',     icon:'♛' },
    ],
  },
  {
    id:4, name:'Sanctuarul Marelui Arhitect',
    rooms:[
      { type:'COMBAT',    id:'oop_oracle',    icon:'🔮' },
      { type:'WRITE_DOOR',topic:'scriere_11', icon:'✍️' },
      { type:'TREASURE',  potions:1, gold:40, icon:'💎' },
      { type:'COMBAT',    id:'scribe11',      icon:'🪶' },
      { type:'WRITE_DOOR',topic:'scriere_11', icon:'✍️' },
      { type:'COMBAT',    id:'bfs_phantom',   icon:'🌐' },
      { type:'BOSS',      id:'boss11_oop',    icon:'♛' },
    ],
  },
];

const dungeonData = {
  9:  { floors: floors9,  enemies: enemies9  },
  10: { floors: floors10, enemies: enemies10 },
  11: { floors: floors11, enemies: enemies11 },
};

module.exports = dungeonData;
