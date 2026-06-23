const CHAPTERS = {
  9: [
    {
      id: 'variabile',
      name: 'Variabile & Tipuri',
      icon: '📦',
      summary: 'Stocarea și tipurile datelor în Python.',
      sections: [
        {
          title: 'Ce este o variabilă?',
          body: 'O variabilă este un nume care referă o valoare în memorie. Python este dinamic: tipul se deduce automat.',
          code: `x = 10          # int
nume = "Ana"    # str
pret = 9.99     # float
activ = True    # bool`,
        },
        {
          title: 'Tipuri de bază',
          body: 'int, float, str, bool, NoneType. Funcția type() returnează tipul.',
          code: `print(type(42))        # <class 'int'>
print(type(3.14))      # <class 'float'>
print(type("salut"))   # <class 'str'>
print(type(True))      # <class 'bool'>`,
        },
        {
          title: 'Conversii de tip',
          body: 'int(), float(), str() convertesc între tipuri. Citirea de la tastatură returnează mereu str.',
          code: `n = int(input("Introdu un număr: "))
x = float("3.14")
s = str(42)         # "42"`,
        },
        {
          title: 'Atribuire multiplă',
          body: 'Python permite atribuiri multiple pe aceeași linie.',
          code: `a, b, c = 1, 2, 3
a = b = 0
a, b = b, a    # swap fără variabilă temporară`,
        },
        {
          title: 'Pitfall comun',
          body: '⚠️ Împărțirea între int returnează float în Python 3. Folosește // pentru împărțire întreagă.',
          code: `print(7 / 2)    # 3.5  (float!)
print(7 // 2)   # 3   (int)
print(7 % 2)    # 1   (rest)`,
        },
      ],
    },
    {
      id: 'operatori',
      name: 'Operatori',
      icon: '⚡',
      summary: 'Aritmetici, comparație, logici și pe biți.',
      sections: [
        {
          title: 'Operatori aritmetici',
          body: '+, -, *, /, //, %, ** (putere)',
          code: `print(2 ** 8)    # 256
print(17 % 5)   # 2 (rest împărțire)
print(9 // 2)   # 4 (câtul întreg)`,
        },
        {
          title: 'Operatori de comparație',
          body: '== != < > <= >= returnează True sau False.',
          code: `x = 5
print(x == 5)   # True
print(x != 3)   # True
print(x >= 10)  # False`,
        },
        {
          title: 'Operatori logici',
          body: 'and, or, not. Python evaluează leneș (short-circuit).',
          code: `print(True and False)   # False
print(True or False)    # True
print(not True)         # False
print(5 > 3 and 2 < 4)  # True`,
        },
        {
          title: 'Precedența operatorilor',
          body: 'De la cea mai mare la cea mai mică: ** > *(/ // %) > +(−) > comparații > not > and > or',
          code: `print(2 + 3 * 4)        # 14, nu 20
print((2 + 3) * 4)      # 20
print(not 3 > 5 and 2)  # True`,
        },
        {
          title: 'Operatori de atribuire compusă',
          body: '+=, -=, *=, /=, //=, **= modifică variabila pe loc.',
          code: `x = 10
x += 5    # x = 15
x *= 2    # x = 30
x //= 4   # x = 7`,
        },
      ],
    },
    {
      id: 'condiționale',
      name: 'Condiționale',
      icon: '🔀',
      summary: 'if / elif / else și expresii condiționale.',
      sections: [
        {
          title: 'Structura if / elif / else',
          body: 'Python folosește indentarea (4 spații) pentru a delimita blocurile.',
          code: `nota = int(input("Nota: "))
if nota >= 5:
    print("Promovat")
elif nota == 4:
    print("Corigent")
else:
    print("Respins")`,
        },
        {
          title: 'Condiții compuse',
          body: 'Combină condiții cu and / or / not.',
          code: `x = 7
if 1 <= x <= 10:        # echivalent cu x>=1 and x<=10
    print("în interval")

if x % 2 == 0 or x > 5:
    print("par sau > 5")`,
        },
        {
          title: 'Expresie condițională (ternary)',
          body: 'Scurtătură pentru if/else pe o singură linie.',
          code: `valoare = "par" if x % 2 == 0 else "impar"
maxim = a if a > b else b`,
        },
        {
          title: 'Condiții nested',
          body: 'Poți imbrica if-uri, dar preferă and/or când e posibil.',
          code: `if x > 0:
    if x < 100:
        print("între 0 și 100")
    else:
        print("prea mare")`,
        },
        {
          title: 'Valori falsy',
          body: '⚠️ 0, "", [], {}, None, False sunt toate falsy în Python.',
          code: `lista = []
if lista:           # False — lista goală e falsy!
    print("are elemente")
else:
    print("lista e goală")`,
        },
      ],
    },
    {
      id: 'bucle',
      name: 'Bucle',
      icon: '🔁',
      summary: 'while, for, range(), break, continue.',
      sections: [
        {
          title: 'Bucla while',
          body: 'Se repetă cât condiția e True. Atenție la bucle infinite!',
          code: `n = 1
while n <= 5:
    print(n)
    n += 1   # fără asta → buclă infinită!`,
        },
        {
          title: 'Bucla for cu range()',
          body: 'range(stop), range(start, stop), range(start, stop, step)',
          code: `for i in range(5):        # 0 1 2 3 4
    print(i)

for i in range(1, 10, 2):  # 1 3 5 7 9
    print(i)

for i in range(10, 0, -1): # countdown
    print(i)`,
        },
        {
          title: 'for pe colecții',
          body: 'Poți itera direct pe liste, string-uri, dicționare.',
          code: `fructe = ["mar", "par", "cireș"]
for f in fructe:
    print(f)

for c in "Python":
    print(c)`,
        },
        {
          title: 'break și continue',
          body: 'break iese din buclă, continue sare la iterația următoare.',
          code: `for i in range(10):
    if i == 3: continue  # sare peste 3
    if i == 7: break     # se oprește la 7
    print(i)             # 0 1 2 4 5 6`,
        },
        {
          title: 'else la buclă',
          body: 'Blocul else al unui for/while rulează dacă bucla s-a terminat fără break.',
          code: `for i in range(2, 10):
    if 8 % i == 0:
        print(i, "divide 8")
        break
else:
    print("niciun divizor găsit")`,
        },
      ],
    },
    {
      id: 'șiruri',
      name: 'Șiruri de caractere',
      icon: '📝',
      summary: 'Indexare, slicing, metode și f-strings.',
      sections: [
        {
          title: 'Indexare și slicing',
          body: 'Indexul începe de la 0. Indici negativi numără de la sfârșit.',
          code: `s = "Python"
print(s[0])       # P
print(s[-1])      # n
print(s[1:4])     # yth
print(s[::-1])    # nohtyP (inversat)`,
        },
        {
          title: 'Metode esențiale',
          body: 'Metodele de string returnează un șir nou (string-urile sunt imutabile).',
          code: `s = "  Salut Lume  "
print(s.lower())         # "  salut lume  "
print(s.upper())         # "  SALUT LUME  "
print(s.strip())         # "Salut Lume"
print(s.replace("Lume", "Python"))
print("a,b,c".split(","))  # ['a', 'b', 'c']
print(",".join(["a","b","c"])) # "a,b,c"`,
        },
        {
          title: 'f-strings (formatare modernă)',
          body: 'f-string-urile evaluează expresii între {}.',
          code: `nume = "Ana"
varsta = 17
print(f"Mă numesc {nume} și am {varsta} ani.")
print(f"2 la puterea 10 = {2**10}")
print(f"Pi ≈ {3.14159:.2f}")   # 2 zecimale`,
        },
        {
          title: 'Verificări utile',
          body: 'in, not in, startswith, endswith, isdigit, isalpha',
          code: `s = "Python3"
print("Py" in s)          # True
print(s.startswith("Py")) # True
print(s.isdigit())        # False
print("123".isdigit())    # True`,
        },
        {
          title: '⚠️ Imutabilitate',
          body: 'Nu poți modifica un caracter direct. Trebuie să creezi un șir nou.',
          code: `s = "abc"
# s[0] = "A"  → TypeError!
s = "A" + s[1:]   # "Abc" — corect`,
        },
      ],
    },
    {
      id: 'liste',
      name: 'Liste',
      icon: '📋',
      summary: 'Colecții ordonate și mutabile.',
      sections: [
        {
          title: 'Creare și acces',
          body: 'Listele pot conține orice tip, inclusiv alte liste.',
          code: `v = [3, 1, 4, 1, 5, 9]
print(v[0])       # 3
print(v[-1])      # 9
print(v[1:4])     # [1, 4, 1]
print(len(v))     # 6`,
        },
        {
          title: 'Metode importante',
          body: 'append, insert, remove, pop, sort, reverse, index, count',
          code: `v = [1, 2, 3]
v.append(4)       # [1, 2, 3, 4]
v.insert(1, 99)   # [1, 99, 2, 3, 4]
v.remove(99)      # [1, 2, 3, 4]
x = v.pop()       # x=4, v=[1, 2, 3]
v.sort(reverse=True) # [3, 2, 1]`,
        },
        {
          title: 'List comprehension',
          body: 'Mod concis de a crea liste cu o expresie.',
          code: `patrate = [x**2 for x in range(6)]
# [0, 1, 4, 9, 16, 25]

pare = [x for x in range(20) if x % 2 == 0]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]`,
        },
        {
          title: 'Funcții built-in pe liste',
          body: 'sum, min, max, sorted, len, enumerate, zip',
          code: `v = [3, 1, 4, 1, 5]
print(sum(v))         # 14
print(min(v), max(v)) # 1 5
print(sorted(v))      # [1, 1, 3, 4, 5] — v neschimbat

for i, val in enumerate(v):
    print(i, val)`,
        },
        {
          title: '⚠️ Copiere',
          body: 'Atribuirea nu copiază lista! Folosește .copy() sau v[:].',
          code: `a = [1, 2, 3]
b = a          # b și a referă ACEEAȘI listă!
b.append(4)
print(a)       # [1, 2, 3, 4] — surpriză!

c = a.copy()   # copie independentă
c.append(99)
print(a)       # [1, 2, 3, 4] — neschimbat`,
        },
      ],
    },
    {
      id: 'funcții',
      name: 'Funcții',
      icon: '⚙️',
      summary: 'def, parametri, return, scope, valori implicite.',
      sections: [
        {
          title: 'Definire și apel',
          body: 'def definește o funcție. return trimite înapoi valoarea.',
          code: `def salut(nume):
    return f"Bună, {nume}!"

mesaj = salut("Ana")
print(mesaj)  # Bună, Ana!`,
        },
        {
          title: 'Parametri cu valori implicite',
          body: 'Parametrii cu valori default devin opționali la apel.',
          code: `def putere(baza, exp=2):
    return baza ** exp

print(putere(3))    # 9  (exp implicit = 2)
print(putere(2, 10)) # 1024`,
        },
        {
          title: 'Return multiplu',
          body: 'Python poate returna mai multe valori ca tuplu.',
          code: `def min_max(v):
    return min(v), max(v)

mic, mare = min_max([3, 1, 4, 1, 5])
print(mic, mare)   # 1 5`,
        },
        {
          title: 'Scope (domeniu de vizibilitate)',
          body: 'Variabilele locale există doar înăuntrul funcției. global le face globale.',
          code: `x = 10   # global

def f():
    x = 99   # variabilă LOCALĂ — nu afectează globalul!
    print(x)  # 99

f()
print(x)  # 10 — neschimbat

def g():
    global x
    x = 99   # modifică globalul
g()
print(x)  # 99`,
        },
        {
          title: 'Funcții lambda',
          body: 'Funcții anonime pe o linie. Utile pentru sorted(), map(), filter().',
          code: `patrat = lambda x: x ** 2
print(patrat(5))  # 25

persoane = [("Ana", 17), ("Ion", 15), ("Mia", 19)]
persoane.sort(key=lambda p: p[1])  # sortare după vârstă`,
        },
      ],
    },
    {
      id: 'dicționare',
      name: 'Dicționare',
      icon: '📖',
      summary: 'Perechi cheie-valoare, acces rapid O(1).',
      sections: [
        {
          title: 'Creare și acces',
          body: 'Cheile sunt unice și imutabile (str, int, tuple). Valorile — orice.',
          code: `elev = {"nume": "Ana", "varsta": 17, "nota": 9.5}
print(elev["nume"])          # Ana
print(elev.get("adresa"))    # None (nu aruncă eroare)
print(elev.get("nota", 0))   # 9.5`,
        },
        {
          title: 'Modificare și adăugare',
          body: 'Atribuirea la o cheie nouă creează perechea; la una existentă o suprascrie.',
          code: `elev["nota"] = 10       # modifică
elev["clasa"] = "9A"    # adaugă

del elev["varsta"]
elev.pop("clasa", None)  # pop cu default — sigur`,
        },
        {
          title: 'Iterare',
          body: '.keys(), .values(), .items() returnează view-uri.',
          code: `for cheie in elev:                     # doar chei
    print(cheie)

for cheie, val in elev.items():
    print(f"{cheie}: {val}")

chei = list(elev.keys())`,
        },
        {
          title: 'Dict comprehension',
          body: 'Analog cu list comprehension, dar produce un dicționar.',
          code: `patrate = {x: x**2 for x in range(6)}
# {0:0, 1:1, 2:4, 3:9, 4:16, 5:25}

invers = {v: k for k, v in patrate.items()}`,
        },
        {
          title: '⚠️ KeyError',
          body: 'Accesarea cu [] a unei chei inexistente aruncă KeyError. Folosește .get()!',
          code: `d = {"a": 1}
# d["b"]           → KeyError!
print(d.get("b"))       # None — sigur
print(d.get("b", 0))    # 0 — valoare default`,
        },
      ],
    },
    {
      id: 'tupluri',
      name: 'Tupluri',
      icon: '🔒',
      summary: 'Secvențe imutabile, unpacking, utilizări.',
      sections: [
        {
          title: 'Creare și proprietăți',
          body: 'Tuplurile sunt ca listele, dar imutabile. Definite cu ().',
          code: `punct = (3, 7)
culori = ("rosu", "verde", "albastru")
singleton = (42,)   # virgulă obligatorie!
gol = ()

print(punct[0])     # 3
print(len(culori))  # 3`,
        },
        {
          title: 'Unpacking',
          body: 'Desface tuplul în variabile separate.',
          code: `x, y = (3, 7)
a, b, c = "RGB"    # funcționează cu orice iterabil!
primul, *rest = [1, 2, 3, 4, 5]
# primul=1, rest=[2,3,4,5]`,
        },
        {
          title: 'Tuplu ca return multiplu',
          body: 'Când returnezi mai multe valori, Python le împachetează automat ca tuplu.',
          code: `def cercul(r):
    import math
    return math.pi * r**2, 2 * math.pi * r

arie, circ = cercul(5)`,
        },
        {
          title: 'Comparație cu lista',
          body: 'Tuplul e mai rapid și poate fi cheie de dicționar (e hashabil).',
          code: `import sys
lista = [1, 2, 3]
tuplu = (1, 2, 3)
# sys.getsizeof(tuplu) < sys.getsizeof(lista)

coord = {(0, 0): "origine", (1, 0): "dreapta"}`,
        },
        {
          title: 'Metode disponibile',
          body: 'Tuplul are doar .count() și .index() (imutabil, deci fără modificări).',
          code: `t = (1, 2, 2, 3, 2)
print(t.count(2))   # 3
print(t.index(3))   # 3 (prima poziție)`,
        },
      ],
    },
  ],

  10: [
    {
      id: 'tablouri',
      name: 'Tablouri 1D',
      icon: '📊',
      summary: 'Vectori, parcurgere, operații clasice.',
      sections: [
        {
          title: 'Tabloul ca listă Python',
          body: 'În Python, tabloul (vectorul) se implementează cu lista. Accesul la element e O(1).',
          code: `v = [0] * 10           # vector de 10 zerouri
v = list(map(int, input().split()))  # citire de pe o linie

n = len(v)
for i in range(n):
    print(v[i], end=" ")`,
        },
        {
          title: 'Suma, minimul, maximul manual',
          body: 'Important de știut și fără funcții built-in.',
          code: `v = [4, 2, 7, 1, 9, 3]
s = 0
minim = v[0]
for x in v:
    s += x
    if x < minim:
        minim = x
print("suma:", s, "min:", minim)`,
        },
        {
          title: 'Eliminarea duplicatelor & frecvențe',
          body: 'set() elimină dublurile. dict sau list pentru frecvențe.',
          code: `v = [1, 2, 2, 3, 3, 3, 4]
unic = list(set(v))          # [1, 2, 3, 4] — neordonate!
unic_ord = sorted(set(v))    # [1, 2, 3, 4] — ordonate

frecv = {}
for x in v:
    frecv[x] = frecv.get(x, 0) + 1
# {1:1, 2:2, 3:3, 4:1}`,
        },
        {
          title: 'Interclasarea a doi vectori sorteazi',
          body: 'Algoritmul clasic de interclasare în O(n+m).',
          code: `def interclasare(a, b):
    rez, i, j = [], 0, 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]: rez.append(a[i]); i += 1
        else:            rez.append(b[j]); j += 1
    rez += a[i:]
    rez += b[j:]
    return rez`,
        },
        {
          title: 'Suma cumulativă (prefix sum)',
          body: 'Prefix sum permite calculul sumei unui subșir în O(1) după O(n) preprocesare.',
          code: `v = [1, 2, 3, 4, 5]
prefix = [0] * (len(v) + 1)
for i in range(len(v)):
    prefix[i+1] = prefix[i] + v[i]

# suma v[l..r] = prefix[r+1] - prefix[l]
print(prefix[4] - prefix[1])  # suma v[1..3] = 9`,
        },
      ],
    },
    {
      id: 'matrici',
      name: 'Matrici 2D',
      icon: '🔢',
      summary: 'Liste de liste, parcurgere, operații pe matrici.',
      sections: [
        {
          title: 'Creare și acces',
          body: 'O matrice e o listă de liste. m[i][j] = elementul de pe linia i, coloana j.',
          code: `m = [[1, 2, 3],
     [4, 5, 6],
     [7, 8, 9]]

print(m[1][2])   # 6

n, p = len(m), len(m[0])   # linii, coloane`,
        },
        {
          title: 'Parcurgere completă',
          body: 'Dublu for: mai întâi linii, apoi coloane.',
          code: `for i in range(n):
    for j in range(p):
        print(m[i][j], end=" ")
    print()   # newline după fiecare linie`,
        },
        {
          title: 'Diagonalele matricei pătratice',
          body: 'Diagonala principală: m[i][i]. Diagonala secundară: m[i][n-1-i].',
          code: `n = len(m)
for i in range(n):
    print("princip:", m[i][i], "secund:", m[i][n-1-i])

urma = sum(m[i][i] for i in range(n))  # trace`,
        },
        {
          title: 'Transpusa matricei',
          body: 'Transpusa schimbă liniile cu coloanele.',
          code: `def transpusa(m):
    n, p = len(m), len(m[0])
    t = [[0]*n for _ in range(p)]
    for i in range(n):
        for j in range(p):
            t[j][i] = m[i][j]
    return t

t = [[m[j][i] for j in range(n)] for i in range(p)]`,
        },
        {
          title: '⚠️ Crearea corectă a matricei',
          body: 'Nu folosi [[0]*n]*m — rândurile ar fi ACELEAȘI obiecte!',
          code: `n, m = 3, 3
gresit  = [[0]*n] * m   # GREȘIT — aceleași liste!
corect  = [[0]*n for _ in range(m)]  # OK

corect[0][0] = 9
print(corect[1][0])   # 0 — independent`,
        },
      ],
    },
    {
      id: 'sortare',
      name: 'Algoritmi de Sortare',
      icon: '🔃',
      summary: 'Bubble, selection, insertion sort — implementare și complexitate.',
      sections: [
        {
          title: 'Bubble Sort — O(n²)',
          body: 'Compară perechi adiacente și le interschimbă dacă sunt în ordine greșită.',
          code: `def bubble_sort(v):
    n = len(v)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if v[j] > v[j + 1]:
                v[j], v[j+1] = v[j+1], v[j]
    return v`,
        },
        {
          title: 'Selection Sort — O(n²)',
          body: 'La fiecare pas, găsește minimul din rest și îl pune la locul lui.',
          code: `def selection_sort(v):
    n = len(v)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if v[j] < v[min_idx]:
                min_idx = j
        v[i], v[min_idx] = v[min_idx], v[i]
    return v`,
        },
        {
          title: 'Insertion Sort — O(n²)',
          body: 'Inserează pe rând fiecare element la locul potrivit în subvectorul deja sortat.',
          code: `def insertion_sort(v):
    for i in range(1, len(v)):
        cheie = v[i]
        j = i - 1
        while j >= 0 and v[j] > cheie:
            v[j + 1] = v[j]
            j -= 1
        v[j + 1] = cheie
    return v`,
        },
        {
          title: 'sorted() și .sort() în Python',
          body: 'Python folosește Timsort — O(n log n). sorted() returnează o listă nouă; .sort() modifică pe loc.',
          code: `v = [3, 1, 4, 1, 5, 9]
print(sorted(v))                  # listă nouă
v.sort()                           # modifică v
v.sort(reverse=True)               # descrescător
persoane.sort(key=lambda p: p[1]) # după criteriu`,
        },
        {
          title: 'Complexitate comparativă',
          body: 'Bubble/Selection/Insertion: O(n²). Merge/Quick: O(n log n). Timsort (Python): O(n log n).',
          code: `# Regula practică:
# n < 1000  → orice merge
# n < 10⁶  → O(n log n) necesar
# n > 10⁷  → O(n) dacă e posibil`,
        },
      ],
    },
    {
      id: 'cautare',
      name: 'Căutare',
      icon: '🔍',
      summary: 'Căutare liniară și binară.',
      sections: [
        {
          title: 'Căutare liniară — O(n)',
          body: 'Parcurge vectorul element cu element. Funcționează pe orice vector.',
          code: `def cauta_liniar(v, tinta):
    for i in range(len(v)):
        if v[i] == tinta:
            return i
    return -1   # nu s-a găsit`,
        },
        {
          title: 'Căutare binară — O(log n)',
          body: 'Funcționează DOAR pe vectori SORTEAZI. Înjumătățește spațiul la fiecare pas.',
          code: `def cauta_binar(v, tinta):
    st, dr = 0, len(v) - 1
    while st <= dr:
        mij = (st + dr) // 2
        if v[mij] == tinta: return mij
        elif v[mij] < tinta: st = mij + 1
        else: dr = mij - 1
    return -1`,
        },
        {
          title: 'Câți pași face binary search?',
          body: 'Numărul maxim de pași = ⌊log₂(n)⌋ + 1',
          code: `# n=8  → max 4 pași
# n=16 → max 5 pași
# n=1M → max 20 pași  ← O(log n) e RAPID!

import math
print(math.ceil(math.log2(1000000)))  # 20`,
        },
        {
          title: 'bisect — modulul Python',
          body: 'Python are bisect.bisect_left / bisect_right pentru căutare binară pe liste sortate.',
          code: `import bisect
v = [1, 3, 4, 7, 9]
poz = bisect.bisect_left(v, 4)   # 2
bisect.insort(v, 5)               # inserează și menține ordinea`,
        },
        {
          title: '⚠️ Binary search pe nesortat',
          body: 'Binary search pe un vector nesortat dă rezultate greșite!',
          code: `v = [3, 1, 4, 1, 5]  # nesortat!
# cauta_binar(v, 1) → probabil -1, deși există!
# Întâi sortezi, APOI cauți binar.`,
        },
      ],
    },
    {
      id: 'fisiere',
      name: 'Fișiere Text',
      icon: '💾',
      summary: 'Citire, scriere, moduri de deschidere.',
      sections: [
        {
          title: 'Deschiderea fișierelor cu with',
          body: '"r"=citire, "w"=scriere (suprascrie), "a"=adăugare, "r+"=citire+scriere',
          code: `with open("date.txt", "r") as f:
    continut = f.read()

with open("rezultat.txt", "w") as f:
    f.write("Salut!\\n")`,
        },
        {
          title: 'Citire linie cu linie',
          body: 'Cel mai eficient mod de a citi fișiere mari.',
          code: `with open("date.txt", "r") as f:
    for linie in f:
        linie = linie.strip()  # elimină \\n
        print(linie)

# SAU toate liniile odată:
with open("date.txt") as f:
    linii = f.readlines()  # listă cu '\\n' inclus`,
        },
        {
          title: 'Citire și procesare date numerice',
          body: 'Pattern tipic: citire → split → conversie → procesare.',
          code: `with open("numere.txt") as f:
    n = int(f.readline())
    v = list(map(int, f.readline().split()))

# SAU toate numerele din fișier:
with open("numere.txt") as f:
    numere = [int(x) for line in f for x in line.split()]`,
        },
        {
          title: 'Scriere formatată',
          body: 'Folosește f-string sau format() pentru output frumos.',
          code: `rezultate = [("Ana", 9.5), ("Ion", 7.0), ("Mia", 10)]
with open("note.txt", "w") as f:
    for nume, nota in rezultate:
        f.write(f"{nume}: {nota:.1f}\\n")`,
        },
        {
          title: '⚠️ Encoding',
          body: 'Pentru caractere românești (ă, î, â, ș, ț), specifică encoding="utf-8".',
          code: `with open("roman.txt", "r", encoding="utf-8") as f:
    text = f.read()

with open("roman.txt", "w", encoding="utf-8") as f:
    f.write("Ș, ț, ă, î, â")`,
        },
      ],
    },
  ],

  11: [
    {
      id: 'recursivitate',
      name: 'Recursivitate',
      icon: '🌀',
      summary: 'Funcții care se apelează pe ele însele. Caz de bază + caz recursiv.',
      sections: [
        {
          title: 'Structura recursivității',
          body: 'Orice funcție recursivă are 2 componente: caz de bază (stop) și caz recursiv.',
          code: `def factorial(n):
    if n == 0:          # caz de bază
        return 1
    return n * factorial(n - 1)  # caz recursiv

print(factorial(5))  # 120`,
        },
        {
          title: 'Fibonacci recursiv vs. iterativ',
          body: 'Fibonacci naiv e O(2^n). Cu memoizare devine O(n).',
          code: `from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

print(fib(50))   # instant!

# Iterativ — și mai eficient în memorie:
def fib_it(n):
    a, b = 0, 1
    for _ in range(n): a, b = b, a+b
    return a`,
        },
        {
          title: 'Recursivitate pe liste și arbori',
          body: 'Recursivitatea se potrivește natural structurilor definite recursiv.',
          code: `def suma(lst):
    if not lst: return 0
    return lst[0] + suma(lst[1:])

def adancime_max(nod):
    if not nod: return 0
    return 1 + max(adancime_max(nod.stang),
                   adancime_max(nod.drept))`,
        },
        {
          title: 'Stiva de apeluri (call stack)',
          body: 'Fiecare apel recursiv ocupă memorie. Limita Python: ~1000 apeluri.',
          code: `import sys
print(sys.getrecursionlimit())  # 1000

# Pentru recursivitate profundă:
sys.setrecursionlimit(10000)

# Sau mai bine: convertește la iterativ cu stivă explicită`,
        },
        {
          title: 'Divide et Impera',
          body: 'Paradigmă: împarte în subprobleme, rezolvă recursiv, combină.',
          code: `def merge_sort(v):
    if len(v) <= 1: return v
    mij = len(v) // 2
    st = merge_sort(v[:mij])
    dr = merge_sort(v[mij:])
    return interclasare(st, dr)  # O(n log n)`,
        },
      ],
    },
    {
      id: 'backtracking',
      name: 'Backtracking',
      icon: '🌳',
      summary: 'Explorarea sistematică a soluțiilor posibile cu revenire.',
      sections: [
        {
          title: 'Șablonul general',
          body: 'BT construiește soluția pas cu pas; când un pas e invalid, revine (backtrack).',
          code: `def bt(nivel, sol, ...):
    if sol_completa(sol):
        print(sol); return
    for candidat in candidati(nivel):
        if valid(candidat, sol):
            sol.append(candidat)   # încearcă
            bt(nivel + 1, sol, ...)
            sol.pop()              # revine`,
        },
        {
          title: 'Generarea permutărilor',
          body: 'Permutările lui [1..n] se generează cu BT în O(n!).',
          code: `def permutari(v, k, sol, used):
    if k == len(v):
        print(sol[:])
        return
    for i in range(len(v)):
        if not used[i]:
            used[i] = True
            sol.append(v[i])
            permutari(v, k+1, sol, used)
            sol.pop()
            used[i] = False`,
        },
        {
          title: 'Submulțimi cu suma dată',
          body: 'Generăm submulțimi adăugând sau nu fiecare element.',
          code: `def subm(v, i, sol, tinta):
    if sum(sol) == tinta:
        print(sol[:])
    if i == len(v) or sum(sol) > tinta:
        return
    sol.append(v[i])        # includem v[i]
    subm(v, i+1, sol, tinta)
    sol.pop()               # excludem v[i]
    subm(v, i+1, sol, tinta)`,
        },
        {
          title: 'Pruning (tăierea ramurilor)',
          body: 'Condiția de oprire timpurie reduce drastic numărul de stări explorate.',
          code: `def subm_pruned(v, i, sol, tinta):
    s = sum(sol)
    if s == tinta: print(sol[:])
    if s > tinta or i >= len(v): return  # PRUNING
    sol.append(v[i])
    subm_pruned(v, i+1, sol, tinta)
    sol.pop()
    subm_pruned(v, i+1, sol, tinta)`,
        },
        {
          title: 'Problema celor N regine',
          body: 'Plasează N regine pe o tablă NxN fără să se atace.',
          code: `def regine(n, linie, col, diag1, diag2, sol):
    if linie == n: print(sol); return
    for c in range(n):
        if c not in col and (linie-c) not in diag1 and (linie+c) not in diag2:
            sol.append(c)
            regine(n, linie+1, col|{c}, diag1|{linie-c}, diag2|{linie+c}, sol)
            sol.pop()`,
        },
      ],
    },
    {
      id: 'structuri_date',
      name: 'Structuri de Date',
      icon: '🏗️',
      summary: 'Stivă, coadă, deque, liste înlănțuite.',
      sections: [
        {
          title: 'Stiva (Stack) — LIFO',
          body: 'Last In First Out. Implementare cu listă Python.',
          code: `stiva = []
stiva.append(1)   # push
stiva.append(2)
stiva.append(3)
print(stiva.pop()) # 3 — LIFO
print(stiva[-1])   # 2 — vârful stivei fără pop

# Utilizări: undo, parsare expresii, DFS`,
        },
        {
          title: 'Coada (Queue) — FIFO',
          body: 'First In First Out. Folosește collections.deque pentru O(1) la ambele capete.',
          code: `from collections import deque
coada = deque()
coada.append(1)      # enqueue la dreapta
coada.append(2)
coada.append(3)
print(coada.popleft())  # 1 — FIFO

# Utilizări: BFS, procesare în ordine`,
        },
        {
          title: 'Deque — dublu capăt',
          body: 'appendleft/popleft O(1). Util pentru sliding window și BFS.',
          code: `from collections import deque
d = deque([1, 2, 3])
d.appendleft(0)    # [0, 1, 2, 3]
d.append(4)        # [0, 1, 2, 3, 4]
d.popleft()        # 0
d.pop()            # 4
d.rotate(1)        # [3, 1, 2]`,
        },
        {
          title: 'BFS cu coadă',
          body: 'Breadth-First Search explorează graful nivel cu nivel.',
          code: `from collections import deque
def bfs(graf, start):
    viz = set()
    coada = deque([start])
    viz.add(start)
    while coada:
        nod = coada.popleft()
        print(nod)
        for vecin in graf[nod]:
            if vecin not in viz:
                viz.add(vecin)
                coada.append(vecin)`,
        },
        {
          title: 'Lista înlănțuită',
          body: 'Noduri conectate prin referințe. Insert/delete O(1) la capete, acces O(n).',
          code: `class Nod:
    def __init__(self, val):
        self.val = val
        self.urmator = None

class ListaInlantuita:
    def __init__(self): self.cap = None
    def adauga_inceput(self, val):
        nou = Nod(val)
        nou.urmator = self.cap
        self.cap = nou`,
        },
      ],
    },
    {
      id: 'OOP',
      name: 'Programare OOP',
      icon: '🏛️',
      summary: 'Clase, obiecte, moștenire, polimorfism, encapsulare.',
      sections: [
        {
          title: 'Clase și obiecte',
          body: 'Clasa = șablon. Obiectul = instanță. __init__ = constructorul.',
          code: `class Masina:
    def __init__(self, marca, an):
        self.marca = marca  # atribut
        self.an = an

    def varsta(self):        # metodă
        return 2025 - self.an

m = Masina("Dacia", 2020)
print(m.marca)       # Dacia
print(m.varsta())    # 5`,
        },
        {
          title: 'Moștenire',
          body: 'Subclasa moștenește atributele și metodele clasei de bază.',
          code: `class Animal:
    def __init__(self, nume): self.nume = nume
    def sunet(self): return "..."

class Caine(Animal):
    def sunet(self): return "Ham!"    # suprascriere

class Pisica(Animal):
    def sunet(self): return "Miau!"

c = Caine("Rex")
print(c.sunet())    # Ham!
print(c.nume)       # Rex — moștenit`,
        },
        {
          title: 'Polimorfism',
          body: 'Același apel de metodă produce comportamente diferite în funcție de tip.',
          code: `animale = [Caine("Rex"), Pisica("Tom"), Caine("Lassie")]
for a in animale:
    print(f"{a.nume}: {a.sunet()}")
# Rex: Ham!
# Tom: Miau!
# Lassie: Ham!`,
        },
        {
          title: 'Encapsulare & proprietăți',
          body: '_atribut = convenție privat. @property permite validare la atribuire.',
          code: `class Cerc:
    def __init__(self, r):
        self._r = r

    @property
    def raza(self):
        return self._r

    @raza.setter
    def raza(self, val):
        if val <= 0: raise ValueError("Raza trebuie > 0")
        self._r = val

c = Cerc(5)
c.raza = 10   # OK
c.raza = -1   # ValueError!`,
        },
        {
          title: 'Metode speciale (dunder)',
          body: '__str__, __repr__, __len__, __add__, __eq__ personalizează comportamentul.',
          code: `class Vector2D:
    def __init__(self, x, y): self.x, self.y = x, y

    def __str__(self):
        return f"({self.x}, {self.y})"

    def __add__(self, alt):
        return Vector2D(self.x + alt.x, self.y + alt.y)

    def __len__(self):
        return int((self.x**2 + self.y**2)**0.5)

v = Vector2D(3, 4)
print(v)         # (3, 4)
print(len(v))    # 5`,
        },
      ],
    },
  ],
};

export const TOPIC_TO_CHAPTER = {};
Object.entries(CHAPTERS).forEach(([grade, chapters]) => {
  chapters.forEach(ch => {
    TOPIC_TO_CHAPTER[ch.id] = ch;
  });
});

export function getChapters(grade) {
  return CHAPTERS[grade] || [];
}

export function getChapter(topicId) {
  return TOPIC_TO_CHAPTER[topicId] || null;
}

export default CHAPTERS;
