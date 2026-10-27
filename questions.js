/* Questões adaptadas do Material de Estudo C NP2 e atividades autorais.
   page indica a página do PDF que fundamenta o tema. Trechos isolados
   pressupõem stdio.h e um contexto de função válido, quando necessário. */
(function () {
  const items = [];
  function q(id, topic, title, options, answer, explanation, wrong, page, difficulty = 'intermediário', code = '', exam = '') {
    const item = { id, topic, title, options, answer, explanation, wrong, page, difficulty };
    if (code) item.code = code;
    if (exam) item.exam = exam;
    items.push(item);
  }

  q('pdf1-01','ponteiros','Um sistema de estoque executa o trecho abaixo. O que é impresso?',
    ['40','35','O endereço de qtd','-5','Erro de compilação'],1,
    'p aponta para qtd. Ler *p fornece 40; escrever *p = *p - 5 armazena 35 na própria qtd.',
    ['A escrita indireta modifica qtd; seu valor inicial não é preservado.','','O formato %d imprime o inteiro qtd, não um endereço.','A expressão calcula 40 - 5, não apenas -5.','O ponteiro tem tipo compatível e foi inicializado corretamente.'],67,'básico',
    'int qtd = 40;\nint *p = &qtd;\n*p = *p - 5;\nprintf("%d", qtd);','pdf1');
  q('pdf1-02','arquivos','Uma loja quer registrar vendas em log.txt, preservar as anteriores e criar o arquivo caso não exista. Qual modo usar?',
    ['"r"','"w"','"a"','"r+"','"rb"'],2,
    'O modo a permite acrescentar ao final e cria o arquivo se ele não existir.',
    ['r permite leitura e exige arquivo existente.','w apaga o conteúdo de um arquivo existente.','','r+ exige arquivo existente e não força cada escrita para o final.','rb é leitura binária, sem escrita.'],67,'básico','','pdf1');
  q('pdf1-03','funcoes','Qual é a saída deste programa, considerando stdio.h incluído?',
    ['14','7','0','Valor indeterminado','Erro, pois dobra não tem return'],1,
    'x é uma cópia de n. A função dobra modifica apenas essa cópia, e n continua 7. Funções void podem terminar sem return.',
    ['14 é o valor da cópia x dentro de dobra.','','Nenhuma instrução zera n.','n foi inicializada com 7.','Uma função void não precisa retornar um valor.'],67,'básico',
    'void dobra(int x) { x = x * 2; }\nint main(void) {\n  int n = 7;\n  dobra(n);\n  printf("%d", n);\n  return 0;\n}','pdf1');
  q('pdf1-04','ponteiros','Qual valor o trecho imprime?',
    ['10','12','14','6','Um endereço de memória'],1,
    'p aponta para v[0]. *(p+3) vale v[3], isto é, 8. p[1] vale 4. A soma é 12.',
    ['10 seria 6 + 4, mas o índice 3 corresponde ao quarto elemento.','','14 não é a soma dos elementos indicados.','6 é v[2], que não é a expressão pedida.','As duas expressões acessam valores inteiros, não endereços.'],68,'intermediário',
    'int v[5] = {2, 4, 6, 8, 10};\nint *p = v;\nprintf("%d", *(p+3) + p[1]);','pdf1');
  q('pdf1-05','ponteiros','Qual operação não é permitida pela linguagem C? Considere ponteiros int* válidos e espaço suficiente no mesmo vetor para os deslocamentos.',
    ['p++;','p1 == p2','p = p + 3;','p = p1 + p2;','*p1 = *p2;'],3,
    'Não existe soma de dois ponteiros em C. É possível somar um inteiro a um ponteiro dentro dos limites apropriados.',
    ['Incrementar um ponteiro é permitido quando respeita os limites do objeto.','A igualdade entre ponteiros compatíveis é permitida.','Somar três desloca por três elementos, dentro da premissa.','','Esta atribuição copia um valor int entre os objetos apontados.'],68,'intermediário','','pdf1');
  q('pdf1-06','structs','Sobre struct ficha { int matricula; char nome[45]; float salario; };, qual afirmação é correta?',
    ['A definição já cria um funcionário.','Uma variável struct ficha f1 só pode ser acessada com f1->salario.','Uma struct precisa conter somente membros do mesmo tipo.','Após declarar struct ficha f1, o salário é acessado por f1.salario.','Uma struct não pode conter outra struct.'],3,
    'A definição apresenta o tipo. A declaração de f1 cria um objeto desse tipo, e o operador ponto acessa seus membros.',
    ['Uma definição de tipo sem declarador de objeto não cria f1 nem outro funcionário.','A seta é usada com ponteiro para struct; f1 é um objeto struct.','Uma struct pode reunir tipos diferentes.','','Estruturas podem conter membros de outros tipos struct completos.'],68,'básico','','pdf1');
  q('pdf1-07','vetores','Supondo sizeof(double)=8, sizeof(char)=1 e sizeof(int)=4, qual é a soma dos tamanhos dos três vetores?',
    ['75 bytes','200 bytes','240 bytes','280 bytes','320 bytes'],3,
    'notas: 25 × 8 = 200; nome: 40 × 1 = 40; idade: 10 × 4 = 40. Soma dos sizeof dos vetores: 280 bytes.',
    ['Somar quantidades de elementos ignora os diferentes tamanhos dos tipos.','200 bytes correspondem somente a notas.','240 bytes deixam de contar um dos vetores de 40 bytes.','','Com as premissas dadas, o total é 200 + 40 + 40.'],68,'intermediário',
    'double notas[25];\nchar nome[40];\nint idade[10];','pdf1');
  q('pdf1-08','funcoes','Qual é o valor retornado por f(4)?',
    ['4','10','24','9','A função não para'],1,
    'f(4)=4+f(3)=4+3+f(2)=4+3+2+f(1)=4+3+2+1=10. O caso n==1 encerra as chamadas.',
    ['4 é apenas a primeira parcela.','','24 seria o fatorial, calculado com multiplicação.','9 deixa de incluir o retorno 1 do caso-base.','Partindo de 4, n decresce até 1 e alcança o caso-base.'],69,'intermediário',
    'int f(int n) {\n  if (n == 1) return 1;\n  return n + f(n - 1);\n}','pdf1');
  q('pdf1-09','arquivos','I. fprintf/fscanf trabalham com dados formatados. II. fwrite recebe endereço, tamanho de cada item, quantidade e arquivo. III. fclose retorna 1 no sucesso. Quais estão corretas?',
    ['I, apenas','II, apenas','I e II, apenas','II e III, apenas','I, II e III'],2,
    'I e II são verdadeiras. fclose retorna zero no sucesso e EOF quando detecta erro.',
    ['II também descreve corretamente os argumentos de fwrite.','I também é verdadeira.','','III é falsa e I é verdadeira.','III é falsa: sucesso de fclose é indicado por zero.'],69,'intermediário','','pdf1');
  q('pdf1-10','funcoes','Qual é a saída, considerando stdio.h incluído?',
    ['5','6','9','10','Erro: duas variáveis x'],1,
    'O x local de f oculta o global e passa de 8 para 9. Ao retornar, main altera o global de 5 para 6.',
    ['main acrescenta 1 ao global após chamar f.','','9 é o valor local em f antes do retorno.','A alteração local não se soma à global.','Variáveis de escopos diferentes podem compartilhar o mesmo nome.'],69,'intermediário',
    'int x = 5;\nvoid f(void) { int x = 8; x++; }\nint main(void) {\n  f();\n  x = x + 1;\n  printf("%d", x);\n  return 0;\n}','pdf1');

  q('pdf2-01','strings','Qual é o valor de sizeof(s)?',
    ['3','4','5','8','1'],2,
    'O vetor contém U, N, I, P e o terminador nulo \\0. sizeof(char) é 1, portanto sizeof(s) é 5.',
    ['São quatro letras, além do terminador.','4 é o número de caracteres antes do terminador, como strlen(s).','','O vetor tem exatamente cinco elementos char.','1 é sizeof de um elemento char, não do vetor inteiro.'],71,'básico',
    'char s[] = "UNIP";','pdf2');
  q('pdf2-02','matrizes','Supondo sizeof(int)=4, quantos bytes ocupa int tab[3][4]?',
    ['12','16','28','48','7'],3,
    'São 3 linhas × 4 colunas = 12 elementos. Cada int ocupa 4 bytes nesta hipótese, totalizando 48.',
    ['12 é o número de elementos, não o número de bytes.','16 é o tamanho de uma linha de quatro inteiros.','As dimensões se multiplicam; não se somam.','','3 + 4 não determina o tamanho da matriz.'],71,'básico','','pdf2');
  q('pdf2-03','funcoes','Sobre uma variável local automática comum (sem static), qual afirmação está correta?',
    ['Seu tempo de vida necessariamente vai do início ao fim do programa.','Qualquer função pode usar seu nome diretamente.','Seu tempo de vida acompanha a execução do bloco ao qual pertence.','Duas funções não podem ter locais com o mesmo nome.','Ela é declarada fora de todas as funções.'],2,
    'Uma local automática pertence a um bloco e seu tempo de vida acompanha esse bloco. A ressalva sem static evita confundir escopo local com duração estática.',
    ['Isso descreve duração estática, não a local automática da pergunta.','O nome tem escopo de bloco, não acesso global.','','Locais de funções diferentes são objetos distintos e podem ter o mesmo nome.','Uma declaração fora de funções tem escopo de arquivo.'],71,'básico','','pdf2');
  q('pdf2-04','funcoes','media2 é definida depois de main e chamada dentro de main. O que deve aparecer antes dessa chamada?',
    ['#define media2','float media2(float, float);','As variáveis a e b como globais','Obrigatoriamente #include <media2.h>','Nada: a declaração anterior é dispensável'],1,
    'O protótipo informa ao compilador o tipo retornado e os tipos dos parâmetros antes da chamada.',
    ['Uma macro vazia não declara uma função e pode até apagar o nome do código.','','Variáveis globais não substituem a declaração da função.','Não é necessário inventar um cabeçalho; o protótipo pode estar no mesmo arquivo.','C moderno exige que a função seja declarada antes do uso.'],71,'básico','','pdf2');
  q('pdf2-05','ponteiros','Após troca(v, v+2), qual é o conteúdo de v?',
    ['{5, 6, 7}','{7, 6, 5}','{6, 5, 7}','{5, 7, 6}','{7, 7, 5}'],1,
    'v se converte em endereço de v[0]; v+2 aponta para v[2]. A variável temporária permite trocar 5 e 7.',
    ['A função escreve nos elementos originais por meio dos ponteiros.','','A chamada não passa o endereço de v[1].','Os elementos trocados são o primeiro e o terceiro.','v[1] não é modificado e continua 6.'],71,'intermediário',
    'void troca(int *pa, int *pb) {\n  int t = *pa;\n  *pa = *pb;\n  *pb = t;\n}\n/* No main: */\nint v[3] = {5, 6, 7};\ntroca(v, v+2);','pdf2');
  q('pdf2-06','arquivos','Sobre EOF e feof, assinale a afirmação correta. Esta questão ajusta a simplificação do PDF ao C padrão.',
    ['feof retorna zero quando o indicador de fim está ativo.','EOF é uma função que fecha arquivos.','EOF é uma constante inteira negativa; feof testa o indicador de fim, ativado por uma tentativa de leitura que encontra o fim.','getc nunca retorna EOF.','feof só pode ser usado em arquivos binários.'],2,
    'EOF é uma macro com valor int negativo (frequentemente -1, mas não obrigatoriamente). feof não prevê o fim: consulta um indicador estabelecido por uma operação de leitura.',
    ['Quando o indicador de fim está ativo, feof retorna um valor diferente de zero.','Quem fecha o fluxo é fclose.','','getc retorna EOF quando encontra o fim ou detecta erro.','feof é aplicável a fluxos de texto e binários.'],72,'intermediário','','pdf2');
  q('pdf2-07','ponteiros','Em um modelo didático com endereços em bytes, sizeof(char)=1 e sizeof(double)=8, pc está em 1000 e pd em 2000. Ambos estão dentro de vetores com próximo elemento válido. Após pc++; pd++;, quais endereços representam?',
    ['1001 e 2001','1001 e 2008','1008 e 2008','1004 e 2004','1000 e 2000'],1,
    'O incremento avança um elemento do tipo apontado. Assim, char* avança 1 byte e double* avança 8 nesta hipótese.',
    ['O passo de pd é sizeof(double), e não um byte.','','O passo de pc é sizeof(char), isto é, um byte.','Os tipos não são int, e seus tamanhos foram explicitados.','O pós-incremento altera o ponteiro ao terminar a expressão.'],72,'intermediário','','pdf2');
  q('pdf2-08','arquivos','clientes.txt já contém 200 cadastros. Se fopen("clientes.txt", "w") tiver sucesso, o que acontece?',
    ['Os cadastros são preservados e toda nova escrita vai para o final.','O arquivo abre apenas para leitura.','A abertura falha obrigatoriamente porque o arquivo existe.','O conteúdo anterior é truncado: os cadastros são apagados.','O conteúdo anterior é convertido em binário.'],3,
    'O modo w abre para escrita e trunca um arquivo já existente. A perda do conteúdo acontece na abertura bem-sucedida, mesmo antes de fprintf.',
    ['Esse é o comportamento de a, não de w.','w significa escrita, não leitura.','A existência do arquivo não é uma falha para w.','','A letra b seleciona modo binário, mas nem ela converte conteúdo anterior.'],72,'básico','','pdf2');
  q('pdf2-09','ponteiros','Qual é a saída?',
    ['-6','6','12','Um endereço','Erro de compilação'],1,
    'v é um vetor de dois ponteiros. *v[0] acessa b=9 e *v[1] acessa a=3, portanto 9-3=6.',
    ['Isso inverteria a ordem da subtração.','','O operador é subtração, não soma.','As desreferências produzem os valores inteiros.','A declaração de vetor de ponteiros e as atribuições são válidas.'],72,'intermediário',
    'int a = 3, b = 9;\nint *v[2];\nv[0] = &b;\nv[1] = &a;\nprintf("%d", *v[0] - *v[1]);','pdf2');
  q('pdf2-10','np1','Sobre #define TAM 10, qual afirmação é correta?',
    ['TAM é um objeto int de quatro bytes.','A diretiva precisa terminar com ponto e vírgula.','O pré-processador substitui usos da macro TAM pela sequência de tokens 10.','Pode-se mudar a macro com TAM = 20; em tempo de execução.','A diretiva só pode aparecer dentro de main.'],2,
    'Uma macro realiza substituição no pré-processamento. Ela não cria, por si só, um objeto chamado TAM e não recebe atribuições em execução.',
    ['A macro não declara uma variável int.','O ponto e vírgula passaria a fazer parte do texto substituído.','','TAM = 20 se expandiria para 10 = 20, que não é uma atribuição válida.','Macros podem ser definidas fora de main e não seguem escopo de bloco.'],72,'básico','','pdf2');

  q('q021','ponteiros','Em int x=4; int *p=&x;, o que representam p e *p, respectivamente?',
    ['O valor 4 e o endereço de x','O endereço de x e o valor 4','Dois inteiros iguais a 4','O endereço de p e o endereço de x','O endereço de x e o endereço de p'],1,
    'p armazena o endereço do objeto x. O operador * acessa o objeto apontado, cujo valor é 4.',
    ['A ordem foi invertida.','','p é um ponteiro, não uma segunda cópia int de x.','O endereço do próprio ponteiro seria &p.','*p acessa x, não o endereço do ponteiro.'],33,'básico');
  q('q022','ponteiros','Qual instrução modifica i para 75?',
    ['k = 75;','*k = 75;','p = 75;','*p = 75;','p = &k;'],3,
    'p aponta para i. Escrever em *p modifica i; a variável k é apenas uma cópia independente.',
    ['Essa instrução altera k, não i.','k não é um ponteiro e não pode ser desreferenciado.','Atribuir esse inteiro ao ponteiro viola as restrições de tipo e não escreve em i.','','Essa instrução muda o destino de p, mas não o valor de i.'],39,'básico',
    'int i = 42;\nint k = i;\nint *p = &i;');
  q('q023','ponteiros','Após executar o trecho, quais são v[0], *p e o índice apontado por p?',
    ['11, 20, índice 1','10, 21, índice 1','11, 11, índice 0','10, 20, índice 0','20, 11, índice 1'],0,
    '(*p)++ incrementa o primeiro elemento de 10 para 11. Depois p++ avança o ponteiro para v[1], que vale 20.',
    ['','A primeira operação altera v[0], não v[1].','A segunda operação desloca o ponteiro para o próximo elemento.','As duas operações têm efeitos: uma no valor e outra no ponteiro.','Nenhuma instrução troca os valores dos elementos.'],36,'intermediário',
    'int v[3] = {10, 20, 30};\nint *p = v;\n(*p)++;\np++;');
  q('q024','ponteiros','Qual é a saída? As duas expressões aparecem em chamadas separadas.',
    ['30 30','12 30','12 12','10 20','Um comportamento indefinido'],1,
    '*v+2 significa v[0]+2, isto é, 12. *(v+2) acessa v[2], que vale 30.',
    ['Na primeira expressão, * tem precedência maior que +.','','Os parênteses fazem a segunda expressão acessar o terceiro elemento.','A primeira soma 2 ao valor e a segunda usa índice 2.','Ambos os acessos são válidos e não há alterações conflitantes.'],36,'intermediário',
    'int v[] = {10, 20, 30};\nprintf("%d ", *v + 2);\nprintf("%d", *(v + 2));');
  q('q025','ponteiros','Qual trecho desreferencia um ponteiro que não aponta para objeto válido?',
    ['int x=1; int *p=&x; *p=2;','int v[2]={1,2}; int *p=v; p++; printf("%d", *p);','int *p=NULL; *p=7;','int x=1; int *p=&x; printf("%d", *p);','int v[2]={1,2}; int *p=&v[1]; p--;'],2,
    'NULL representa um ponteiro nulo. Ele pode ser armazenado e comparado, mas não pode ser desreferenciado. *p=7 tem comportamento indefinido.',
    ['p aponta para x, que existe e pode ser modificado.','O incremento leva ao segundo elemento válido.','','p aponta para o inteiro inicializado x.','O decremento leva do segundo ao primeiro elemento do mesmo vetor.'],33,'básico');
  q('q026','ponteiros','Qual afirmação é precisa sobre int v[5] e int *p=v?',
    ['v e p são objetos do mesmo tipo e tamanho.','v é um ponteiro constante armazenado em memória.','p++ e v++ são igualmente válidos.','v é um vetor; em muitas expressões ele é convertido em ponteiro para o primeiro elemento.','sizeof(v) sempre é igual a sizeof(p).'],3,
    'Vetor e ponteiro são tipos diferentes. A conversão de v para &v[0] em muitas expressões explica as equivalências de indexação. Em sizeof(v), o vetor não é convertido.',
    ['v contém cinco ints; p é um único objeto ponteiro.','A frase ponteiro constante do PDF é uma simplificação incorreta de tipo.','v não é um objeto modificável por incremento; p pode avançar dentro dos limites.','','sizeof(v) mede os cinco ints; sizeof(p) mede o ponteiro.'],35,'desafio');
  q('q027','ponteiros','O que este trecho imprime?',
    ['2 8','8 8','2 2','8 2','Endereços de x e y'],1,
    '*p = *q copia o conteúdo de y para x, sem mudar os endereços guardados em p e q. Ambos os inteiros passam a valer 8.',
    ['x é alterado pela atribuição indireta.','','A origem é y=8, não x=2.','Não há troca: só uma cópia de y para x.','O printf recebe x e y e usa %d.'],36,'intermediário',
    'int x=2, y=8;\nint *p=&x, *q=&y;\n*p = *q;\nprintf("%d %d", x, y);');
  q('q028','ponteiros','Qual é a saída após copiar o ponteiro?',
    ['9 8','2 9','9 9','2 8','Comportamento indefinido'],1,
    'p=q faz p apontar para y. *p=9 altera y e deixa x em 2.',
    ['p já não aponta para x quando ocorre a escrita.','','A cópia de ponteiro não conecta os valores de x e y.','Há uma escrita válida em y.','Os ponteiros têm tipos compatíveis e y está vivo.'],36,'intermediário',
    'int x=2, y=8;\nint *p=&x, *q=&y;\np=q;\n*p=9;\nprintf("%d %d", x, y);');
  q('q029','ponteiros','Qual é a declaração de um vetor de dez ponteiros para int?',
    ['int (*x)[10];','int x*10;','int *x[10];','int x[10];','int **x[10];'],2,
    'Os colchetes ligam-se ao nome antes do asterisco: x é vetor de 10 elementos; cada elemento é ponteiro para int.',
    ['Essa declaração é de um ponteiro para um vetor de dez ints.','A sintaxe de declaração é inválida.','','Essa declaração cria dez ints, não dez ponteiros.','Cada elemento seria ponteiro para ponteiro para int.'],40,'intermediário');
  q('q030','ponteiros','Qual acesso com índice negativo é válido?',
    ['int v[3]={1,2,3}; printf("%d", v[-1]);','int v[3]={1,2,3}; int *p=&v[2]; printf("%d", p[-1]);','int v[3]={1,2,3}; printf("%d", v[3]);','int *p=NULL; printf("%d", p[-1]);','Todo índice negativo é sempre inválido.'],1,
    'Com p=&v[2], p[-1] equivale a *(p-1), isto é, v[1]=2. O critério é permanecer dentro do mesmo vetor, não simplesmente o sinal do índice.',
    ['v[-1] acessa antes do primeiro elemento, fora do vetor.','','v[3] está uma posição além do último elemento e não pode ser lido.','Um ponteiro nulo não permite esse deslocamento nem acesso.','Um índice negativo em um ponteiro interior pode alcançar um elemento válido.'],36,'desafio');

  q('q031','funcoes','Qual é a saída?',
    ['25 25','5 25','5 5','25 5','Erro, pois a função tem parâmetro int'],1,
    'quadrado recebe uma cópia de a, calcula 25 e a retorna para b. O valor original de a continua 5.',
    ['A função altera apenas seu parâmetro local n.','','b recebe o resultado retornado, que é 25.','A ordem é a seguido de b, e a não foi modificado.','Uma função pode receber e retornar ints normalmente.'],19,'básico',
    'int quadrado(int n) { n=n*n; return n; }\n/* No main: */\nint a=5;\nint b=quadrado(a);\nprintf("%d %d", a, b);');
  q('q032','funcoes','Como C passa argumentos quando chamamos altera(&x)?',
    ['C muda automaticamente para passagem por referência nativa.','C entrega à função o próprio objeto ponteiro do chamador.','C copia o valor do endereço; a função pode usá-lo para modificar x.','C copia x e nunca permite modificá-lo indiretamente.','C move x para dentro da função.'],2,
    'Em C, todos os argumentos são passados por valor. Aqui, o valor copiado é um endereço. Escrever através desse ponteiro modifica o objeto original, efeito chamado didaticamente de passagem por referência.',
    ['A expressão por referência descreve o efeito obtido com ponteiros, não outro mecanismo nativo de passagem.','O parâmetro ponteiro é um objeto local próprio da função.','','A cópia é do endereço, pelo qual x pode ser acessado.','O objeto x permanece em seu local e tempo de vida.'],42,'desafio');
  q('q033','funcoes','Qual é a saída? n é positivo.',
    ['3.00 27.00','10.00 27.00','10.00 1000.00','3.00 1000.00','27.00 10.00'],1,
    'volume calcula v usando o valor inicial 3: 3³=27. Em seguida, escreve 10 no objeto original. O retorno continua sendo 27.',
    ['A atribuição *p=10 altera n.','','v foi calculado antes de *p mudar.','n é alterado e o cálculo não usa 10.','O printf mostra primeiro n e depois r.'],37,'intermediário',
    'float volume(float *p) {\n  float v = (*p)*(*p)*(*p);\n  *p = 10;\n  return v;\n}\n/* No main: */\nfloat n=3;\nfloat r=volume(&n);\nprintf("%.2f %.2f", n, r);');
  q('q034','funcoes','Para trocar os valores originais de a e b, qual chamada combina com void troca(int *x, int *y)?',
    ['troca(a, b);','troca(*a, *b);','troca(&a, &b);','troca(int a, int b);','troca(&a, b);'],2,
    'Se a e b são ints, &a e &b produzem os endereços int* esperados pelos parâmetros.',
    ['Os valores inteiros não são os endereços esperados.','a e b não são ponteiros e não podem ser desreferenciados.','','Tipos aparecem na declaração, não dessa forma nos argumentos da chamada.','O segundo argumento também precisa ser um endereço.'],42,'básico');
  q('q035','funcoes','Qual declaração significa função sem parâmetros e sem valor de retorno?',
    ['int f(void);','void f(int x);','float f(void);','void f(void);','void *f(void);'],3,
    'O primeiro void indica ausência de valor de retorno. O void entre parênteses declara uma lista sem parâmetros.',
    ['Essa função retorna int.','Essa função recebe um parâmetro int.','Essa função retorna float.','','Essa função retorna um ponteiro void*, que é um valor.'],41,'básico');
  q('q036','funcoes','Qual nome corresponde a um parâmetro formal?',
    ['soma, que é o nome da função','a e b, declarados na lista da função','stdio.h, o cabeçalho','O número 8 passado pelo chamador','return, a instrução'],1,
    'a e b são parâmetros formais locais à função. Os valores usados na chamada, como 8 e 2, são argumentos.',
    ['soma identifica a função, não um parâmetro.','','Um cabeçalho não é parâmetro.','8 é um argumento na chamada; o parâmetro formal é o nome que o recebe.','return encerra a função e pode fornecer um resultado.'],18,'básico',
    'int soma(int a, int b) { return a+b; }\n/* Chamada: soma(8, 2) */');
  q('q037','funcoes','Qual é a saída das duas chamadas?',
    ['1 1','1 2','0 1','2 2','Erro: static só pode ser global'],1,
    'n tem escopo local, mas duração estática: é inicializada uma vez e preserva o valor entre chamadas. Isso distingue escopo de tempo de vida.',
    ['Isso ocorreria com uma local automática reinicializada a cada chamada.','','O incremento ocorre antes do retorno; a primeira chamada retorna 1.','A primeira chamada retorna 1, e a segunda retorna 2.','static também pode ser usado em variáveis locais.'],66,'desafio',
    'int contador(void) {\n  static int n=0;\n  n++;\n  return n;\n}\n/* No main: */\nprintf("%d ", contador());\nprintf("%d", contador());');
  q('q038','funcoes','Para n inteiro não negativo e pequeno, qual caso-base permite calcular também 0! corretamente?',
    ['if (n == 1) return 0;','if (n <= 1) return 1;','if (n == 0) return 0;','if (n > 1) return 1;','Não usar caso-base'],1,
    '0!=1 e 1!=1. O teste n<=1 cobre os dois casos no domínio informado. Para n>1, usa-se n*fatorial(n-1).',
    ['1! vale 1, não zero.','','0! é definido como 1.','Esse teste encerraria valores maiores sem calcular o produto.','Sem condição de parada, a recursão não termina adequadamente.'],20,'intermediário');
  q('q039','funcoes','O que é correto sobre recursividade?',
    ['É sempre mais rápida que um laço.','É proibida no C padrão.','Uma função recursiva nunca pode ter variáveis locais.','Precisa de progressão em direção a uma condição de parada; chamadas podem consumir memória.','Toda função recursiva deve retornar void.'],3,
    'O algoritmo precisa alcançar o caso-base. Chamadas normalmente exigem recursos e recursão profunda pode esgotá-los; a escolha entre recursão e iteração depende do problema.',
    ['Desempenho depende do algoritmo e da implementação.','C permite chamadas recursivas.','Cada chamada pode ter suas próprias locais automáticas.','','Funções recursivas podem retornar int, float e outros tipos.'],20,'intermediário');
  q('q040','funcoes','Uma função incrementa apenas sua cópia do ponteiro p. O que é impresso no chamador?',
    ['20','10','11','Um endereço','Comportamento indefinido'],1,
    'avanca recebe uma cópia do endereço. p++ muda apenas essa cópia local; q continua apontando para v[0].',
    ['20 seria o valor acessado pelo p local depois do incremento, não por q.','','O código não incrementa nenhum elemento do vetor.','A expressão *q fornece o valor inteiro do elemento.','O deslocamento local e a leitura do chamador são válidos.'],40,'desafio',
    'void avanca(int *p) { p++; }\n/* No main: */\nint v[]={10,20};\nint *q=v;\navanca(q);\nprintf("%d", *q);');

  q('q041','arquivos','Qual modo permite ler e escrever, exige arquivo existente e não o trunca na abertura?',
    ['"r+"','"w+"','"a"','"w"','"rb"'],0,
    'r+ abre um arquivo existente para leitura e escrita sem truncá-lo. Isso não significa que escritas posteriores nunca possam substituir dados.',
    ['','w+ permite ler e escrever, mas trunca ou cria.','a permite escrita no final, sem leitura.','w abre somente para escrita e trunca ou cria.','rb abre somente para leitura binária.'],8,'básico');
  q('q042','arquivos','Qual verificação detecta falha de fopen?',
    ['if (fp == EOF)','if (fp == 1)','if (fp == NULL)','if (*fp == 0)','if (feof(fp)) antes de verificar fp'],2,
    'fopen retorna um ponteiro FILE* válido no sucesso e NULL na falha. if(!fp) é uma forma equivalente de testar o ponteiro nulo.',
    ['EOF é um inteiro usado por operações de entrada/saída, não o retorno de fopen.','O sucesso não é indicado pelo endereço numérico 1.','','FILE é um tipo de biblioteca; não se testa seu conteúdo desse modo.','Não se deve passar um ponteiro nulo para feof.'],9,'básico');
  q('q043','arquivos','Após abrir fp para escrita binária, qual chamada grava três elementos completos do vetor Produto p[3]?',
    ['fwrite(p, sizeof(Produto), 3, fp);','fread(p, sizeof(Produto), 3, fp);','fwrite(fp, sizeof(Produto), 3, p);','fwrite(p, 3, 1, fp);','fprintf(fp, "%s", p);'],0,
    'A ordem é endereço, tamanho de cada elemento, quantidade e fluxo. O retorno esperado no sucesso completo é 3, que também deve ser verificado.',
    ['','fread realiza leitura, não gravação.','O primeiro argumento deve apontar para os dados; o último é o fluxo.','Essa chamada gravaria apenas três bytes, não três Produtos.','Um vetor de structs não é uma string para %s.'],11,'intermediário');
  q('q044','arquivos','O que significa fread(v, sizeof(int), 5, fp) retornar 3?',
    ['Foram lidos exatamente três bytes.','Foram lidos três elementos completos do tamanho solicitado.','A função necessariamente leu cinco elementos.','O arquivo foi fechado.','O valor do terceiro inteiro era 3.'],1,
    'fread retorna a quantidade de elementos completos lidos. Um retorno menor que o solicitado exige verificar fim de arquivo e/ou erro; não use como inicializados os elementos não obtidos.',
    ['Como o tamanho é sizeof(int), o retorno conta elementos, não bytes.','','O retorno 3 informa que não foram obtidos cinco elementos completos.','fread não fecha o fluxo.','O retorno não é o conteúdo de nenhum elemento.'],11,'intermediário');
  q('q045','arquivos','Qual tipo deve armazenar o retorno de fgetc para distinguir todos os bytes de EOF?',
    ['char','float','int','FILE','void'],2,
    'fgetc retorna um unsigned char convertido para int, ou EOF. Armazenar em int preserva a distinção entre um byte válido e a indicação negativa.',
    ['char pode não representar EOF de maneira distinta de todos os bytes.','O retorno e o teste de EOF são definidos com tipo int.','','FILE representa o estado de um fluxo, não um caractere retornado.','void não armazena um valor.'],12,'intermediário');
  q('q046','arquivos','Qual laço processa apenas leituras de um int que realmente tiveram sucesso?',
    ['while (!feof(fp)) { fscanf(fp,"%d",&x); usa(x); }','while (fscanf(fp,"%d",&x) == 1) { usa(x); }','while (fscanf(fp,"%d",&x) != 0) { usa(x); }','while (fp != NULL) { usa(x); }','while (x != EOF) { usa(x); }'],1,
    'Com uma conversão %d, o retorno 1 significa que o inteiro foi atribuído com sucesso. Isso evita processar um valor antigo após uma leitura malsucedida.',
    ['feof só revela fim depois de uma operação de leitura; o corpo pode usar um valor antigo.','','EOF costuma ser negativo e diferente de zero: essa condição não trata corretamente o fim.','Um fluxo aberto continua com ponteiro não nulo mesmo no fim do arquivo.','x é um dado; ele não informa por si só se a última leitura funcionou.'],12,'desafio');
  q('q047','arquivos','Qual par corresponde a escrever e ler dados formatados de um arquivo?',
    ['printf e scanf','fwrite e fputc','fgets e fclose','fprintf e fscanf','fopen e rewind'],3,
    'fprintf escreve dados segundo um formato em um fluxo; fscanf tenta ler e converter dados segundo um formato.',
    ['printf usa saída padrão e scanf usa entrada padrão; o par com FILE* é fprintf/fscanf.','fwrite grava blocos e fputc grava um caractere.','fgets lê uma linha e fclose fecha o fluxo.','','fopen abre, e rewind reposiciona.'],7,'básico');
  q('q048','arquivos','Sobre o buffer de saída e fclose, qual é a correta?',
    ['fclose sempre retorna 1.','fclose descarta obrigatoriamente os dados pendentes.','fclose tenta descarregar dados pendentes e fecha o fluxo; retorna zero no sucesso.','Depois de fclose, o mesmo FILE* pode continuar sendo usado normalmente.','Buffer é o arquivo permanente no disco.'],2,
    'A biblioteca pode manter dados temporariamente no buffer. fclose tenta enviá-los e encerra o fluxo; falhas de fechamento também precisam ser consideradas.',
    ['O retorno de sucesso é zero.','No fechamento normal, tenta-se descarregar os dados pendentes.','','Usar um fluxo depois de fechado é inválido; seria preciso abrir novamente.','Buffer é armazenamento temporário, normalmente em memória.'],9,'intermediário');
  q('q049','arquivos','Qual função reposiciona um fluxo no início e limpa seus indicadores de erro e fim?',
    ['ftell(fp)','feof(fp)','rewind(fp)','fclose(fp)','fwrite(fp)'],2,
    'rewind reposiciona no início e limpa os indicadores de erro e fim. ftell apenas consulta a posição.',
    ['ftell consulta a posição, sem reposicionar.','feof consulta o indicador de fim.','','fclose encerra o fluxo.','fwrite grava dados e precisa de quatro argumentos.'],13,'básico');
  q('q050','arquivos','Qual afirmação sobre gravar structs diretamente com fwrite é correta?',
    ['O arquivo é automaticamente texto CSV.','O formato binário sempre é idêntico em qualquer computador.','O tamanho da struct sempre é a soma exata dos campos.','Pode haver padding e diferenças de representação; a gravação bruta não garante portabilidade.','fwrite salva apenas o nome do tipo.'],3,
    'fwrite grava a representação em bytes do objeto, incluindo eventuais preenchimentos. Tamanhos, alinhamento e ordem dos bytes podem variar entre implementações.',
    ['CSV exige formatação textual dos campos.','Máquinas e compiladores podem usar representações diferentes.','O alinhamento pode inserir preenchimento entre os membros ou ao final.','','O nome do tipo não é gravado automaticamente; são gravados bytes do objeto.'],28,'desafio');

  q('q051','vetores','Qual é o último índice válido de int idade[10]?',
    ['10','9','11','1','Depende do tamanho de int'],1,
    'Os dez elementos têm índices de 0 a 9. O tamanho em bytes do tipo não altera a faixa de índices.',
    ['10 é a quantidade; idade[10] fica fora dos limites.','','11 também está fora do vetor.','1 é apenas o segundo elemento.','A indexação depende da quantidade de elementos, não dos bytes por int.'],23,'básico');
  q('q052','vetores','Qual é o conteúdo após esta inicialização?',
    ['{2, 4, indeterminado, indeterminado}','{2, 4, 2, 4}','{2, 4, 0, 0}','{0, 0, 2, 4}','Erro de compilação'],2,
    'Na inicialização parcial com chaves, os elementos restantes são inicializados com zero.',
    ['Isso não ocorre em uma inicialização parcial; os demais são zerados.','A lista não é repetida automaticamente.','','Os valores explícitos preenchem os primeiros elementos.','Uma lista de inicializadores menor que o vetor é válida.'],23,'intermediário',
    'int v[4] = {2, 4};');
  q('q053','vetores','Supondo int v[6] declarado neste bloco, qual expressão calcula sua quantidade de elementos?',
    ['sizeof(v)','sizeof(v) / sizeof(v[0])','sizeof(v[0]) / sizeof(v)','sizeof(v) * sizeof(int)','v / sizeof(int)'],1,
    'sizeof(v) mede todos os elementos em bytes. Dividir pelo tamanho de um elemento fornece 6. Essa técnica não funciona do mesmo modo para um parâmetro ajustado a ponteiro.',
    ['sizeof(v) retorna bytes, não a quantidade de elementos.','','A divisão está invertida.','Multiplicar produz uma medida sem utilidade para contar elementos.','Não é permitido dividir um ponteiro por um inteiro.'],22,'intermediário');
  q('q054','strings','Para armazenar uma string C com até 19 caracteres ASCII, incluindo espaço para o terminador, qual declaração é adequada?',
    ['char s[19];','char s[20];','int s;','char s;','char *s; sem apontar para armazenamento'],1,
    'São necessárias 19 posições para os caracteres e uma para \\0: vinte elementos char. O limite é de bytes; textos multibyte exigem atenção adicional.',
    ['Dezenove posições permitem no máximo dezoito caracteres ASCII mais o terminador.','','Um único int não é um vetor de caracteres.','Um char armazena apenas um elemento.','Declarar só um ponteiro não reserva espaço para os caracteres.'],24,'básico');
  q('q055','strings','Qual é a saída?',
    ['8 8','9 9','8 9','9 8','7 8'],3,
    'sizeof(s) conta os nove elementos do vetor, incluindo \\0. strlen(s) conta os oito caracteres anteriores ao terminador.',
    ['sizeof inclui o terminador nulo.','strlen não inclui o terminador.','A ordem solicitada é sizeof primeiro, strlen depois.','','A palavra possui oito letras.'],24,'intermediário',
    'char s[]="primeiro";\nprintf("%zu %zu", sizeof(s), strlen(s));\n/* stdio.h e string.h incluídos */');
  q('q056','strings','Qual chamada lê uma linha com espaços para char nome[30], limitando o número de bytes gravados?',
    ['gets(nome);','scanf("%s", nome);','fgets(nome, sizeof(nome), stdin);','scanf("%s", &nome);','strcpy(nome, stdin);'],2,
    'fgets recebe a capacidade e lê no máximo capacidade-1 caracteres, terminando com \\0 quando tem sucesso. Pode preservar o \\n se ele couber.',
    ['gets não limita o tamanho e foi removida do padrão C11.','%s para em espaço e, sem largura máxima, pode exceder o vetor.','','%s exige char*, e &nome tem tipo ponteiro para vetor; além disso não limita a leitura.','stdin é um fluxo, não uma string de origem para strcpy.'],50,'intermediário');
  q('q057','strings','Após executar o trecho com capacidade suficiente, qual é o conteúdo de s?',
    ['"Maria"','"Ola, "','"Ola, Maria"','"MariaOla, "','Erro: strings não podem ser concatenadas'],2,
    'strcat acrescenta a string origem ao fim da string destino e escreve um terminador nulo no novo fim.',
    ['Isso corresponderia a copiar a origem com strcpy.','strcat altera o destino quando há espaço suficiente.','','O primeiro argumento é o destino; sua parte inicial vem primeiro.','strcat realiza concatenação válida com espaço suficiente.'],13,'básico',
    'char s[30]="Ola, ";\nstrcat(s,"Maria");');
  q('q058','strings','Qual teste verifica se duas strings a e b têm o mesmo conteúdo?',
    ['a == b','strcmp(a,b) == 1','strcmp(a,b) == 0','strcpy(a,b) == 0','sizeof(a) == sizeof(b)'],2,
    'strcmp retorna zero quando as sequências de caracteres são iguais. Seu retorno positivo ou negativo indica ordem, sem obrigação de ser exatamente 1 ou -1.',
    ['A comparação == entre ponteiros compara endereços, não o texto.','A igualdade é indicada por zero.','','strcpy copia e não é uma função de comparação.','Vetores do mesmo tamanho podem armazenar textos diferentes.'],60,'intermediário');
  q('q059','matrizes','Qual expressão acessa a nota do quarto aluno na segunda prova?',
    ['nota[4][2]','nota[3][1]','nota[4,2]','nota[1][3]','nota[2][4]'],1,
    'Os índices começam em zero: quarto aluno corresponde à linha 3, e segunda prova à coluna 1.',
    ['Esses índices indicariam quinto aluno e terceira prova.','','Em C, a indexação bidimensional usa dois pares de colchetes.','Essa opção troca a linha e a coluna.','Além de trocar a interpretação, a coluna 4 fica fora das três provas.'],25,'básico',
    'float nota[5][3];');
  q('q060','matrizes','Em C, qual é a ordem dos elementos de int a[2][3] na memória?',
    ['a[0][0], a[1][0], a[0][1], a[1][1], a[0][2], a[1][2]','a[0][0], a[0][1], a[0][2], a[1][0], a[1][1], a[1][2]','A ordem muda aleatoriamente a cada execução.','Somente a diagonal é contígua.','As linhas precisam ter tamanhos diferentes.'],1,
    'C armazena os arrays multidimensionais por linhas: todos os elementos da primeira linha, depois os da segunda.',
    ['Essa é uma disposição por colunas, diferente do modelo de arrays do C.','','A ordem dos elementos do array é definida.','Todos os elementos de cada linha e as linhas estão dispostos consecutivamente.','As linhas de a têm sempre três ints.'],26,'intermediário');
  q('q061','matrizes','Qual é a soma da diagonal principal?',
    ['15','12','45','6','18'],0,
    'A diagonal principal usa índices iguais: m[0][0]+m[1][1]+m[2][2]=1+5+9=15.',
    ['','12 pode resultar de somar uma coluna, mas não esta diagonal.','45 é a soma de todos os elementos.','6 é a soma da primeira linha.','18 é a soma da última coluna.'],26,'intermediário',
    'int m[3][3]={{1,2,3},{4,5,6},{7,8,9}};');
  q('q062','structs','Qual expressão acessa o número de um endereço aninhado em func1?',
    ['func1.numero.endereco','func1[endereco][numero]','func1.endereco.numero','func1->endereco->numero','struct.func1.numero'],2,
    'func1 é um objeto struct, cujo membro endereco também é um objeto struct. Cada nível é acessado com ponto.',
    ['A ordem deve seguir os membros: primeiro endereco, depois numero.','Colchetes são indexação; aqui os membros possuem nomes.','','Setas seriam usadas para ponteiros; não são os tipos informados.','struct é uma palavra-chave, não o nome de um objeto.'],28,'básico',
    'struct Endereco { int numero; };\nstruct Ficha { struct Endereco endereco; };\nstruct Ficha func1;');
  q('q063','structs','Qual expressão é equivalente a p->nota quando p é um ponteiro válido para struct Aluno?',
    ['*p.nota','(*p).nota','&p.nota','p[nota]','p.nota'],1,
    'A seta combina a desreferência do ponteiro e o acesso ao membro: p->nota equivale a (*p).nota.',
    ['Sem os parênteses, o ponto se liga a p antes do asterisco, mas p é ponteiro.','','Essa não é a operação de desreferenciar a struct e acessar nota.','nota é nome de membro, não índice do vetor.','O ponto espera um objeto struct, não um ponteiro para ele.'],28,'intermediário');
  q('q064','structs','O que faz typedef struct { int codigo; float nota; } Aluno;?',
    ['Cria automaticamente um aluno com codigo zero.','Cria um apelido de tipo, permitindo declarar Aluno a;','Grava o registro em um arquivo.','Garante que sizeof(Aluno) seja 8 em qualquer implementação.','Transforma cada campo em variável global independente.'],1,
    'typedef cria um nome alternativo para o tipo. Um objeto só é declarado quando usamos esse tipo em uma declaração como Aluno a.',
    ['Não há declaração de objeto nessa instrução.','','Uma definição de tipo não executa operações de arquivo.','O tamanho depende de tipos, alinhamento e possíveis preenchimentos.','Os campos pertencem a cada objeto struct; não são globais independentes.'],11,'básico');

  q('q065','np1','Quais são os valores finais de a, b e i?',
    ['3, 4, 4','4, 5, 5','3, 5, 5','4, 4, 4','3, 3, 5'],2,
    'a=i++ usa 3 e depois i passa a 4. b=++i primeiro leva i a 5 e então armazena 5 em b.',
    ['A segunda instrução também incrementa i.','O pós-incremento usa o valor antigo 3 para a.','','Há dois incrementos e o primeiro fornece 3.','O pré-incremento fornece o valor já incrementado 5.'],54,'intermediário',
    'int i=3;\nint a=i++;\nint b=++i;');
  q('q066','np1','Qual é o resultado da expressão inteira?',
    ['11','7','6','14','3'],0,
    '6/2=3. 11%3=2. Multiplicar por 4 resulta 8. A soma final é 3+8=11.',
    ['','7 ocorreria com 11%2, mas o divisor do resto é 3.','6 não respeita as operações dadas.','O resto de 11 por 3 é 2, não uma divisão decimal.','Falta acrescentar a parcela do resto multiplicado por 4.'],52,'intermediário',
    '6 / 2 + 11 % 3 * 4');
  q('q067','np1','Qual valor é armazenado em x?',
    ['1.5','1.0','2.0','0.0','A atribuição não compila'],1,
    'Os operandos 3 e 2 são ints, portanto 3/2 resulta no inteiro 1. Só depois o resultado é convertido para float.',
    ['Para obter 1.5, um operando deve ser real, como 3.0f/2.','','A divisão inteira descarta a fração; não arredonda para 2.','3/2 não é zero.','A conversão de int para float é permitida.'],53,'básico',
    'float x = 3 / 2;');
  q('q068','np1','Qual é o valor final de x?',
    ['15','21','17','10','7'],1,
    'x *= 2+1 equivale, neste caso, a x = x*(2+1). Primeiro a soma fornece 3; depois 7×3=21.',
    ['15 resultaria de 7*2+1, que não é a expansão correta.','','Não há uma operação que produza 17.','Não se trata de x += 2+1.','A atribuição composta altera x.'],53,'intermediário',
    'int x=7;\nx *= 2+1;');
  q('q069','np1','Qual é o resultado?',
    ['0','1','2','-1','Depende do compilador'],1,
    '!0 vale 1; 0&&1 vale 0; 1||0 vale 1. Os operadores lógicos produzem 0 ou 1.',
    ['A negação de zero é verdadeira.','','|| não soma valores; produz 0 ou 1.','Operadores lógicos não retornam -1.','A semântica desses operadores é definida pela linguagem.'],55,'básico',
    '!0 || 0 && 1');
  q('q070','np1','O que é impresso?',
    ['nao 0','sim 0','sim 5','nao 5','Erro: atribuição nunca é permitida em if'],2,
    'x=5 é uma atribuição cuja expressão vale 5, considerado verdadeiro. Assim, o primeiro ramo imprime sim e o novo valor 5.',
    ['O valor de x é alterado para 5 e a condição é verdadeira.','A atribuição muda x antes de printf.','','O valor não zero seleciona o primeiro ramo.','É uma construção válida, embora possa ser um engano quando se queria ==.'],56,'intermediário',
    'int x=0;\nif (x=5) printf("sim %d", x);\nelse printf("nao %d", x);');
  q('q071','np1','Qual é a saída?',
    ['0','1','5','6','O laço não termina'],3,
    'do...while executa o corpo antes do primeiro teste. i passa de 5 para 6; então 6<0 é falso e o laço termina.',
    ['Nenhuma atribuição zera i.','Uma iteração é a quantidade de execuções, não o valor final de i.','O corpo é executado mesmo com condição inicialmente falsa.','','Após a primeira execução, a condição é falsa.'],59,'básico',
    'int i=5;\ndo { i++; } while (i<0);\nprintf("%d", i);');
  q('q072','np1','O que o trecho imprime?',
    ['A','B','BC','ABC','Nenhuma letra'],2,
    'O switch começa no case 2. Sem break entre os cases 2 e 3, executa B e C; o break do case 3 encerra o switch.',
    ['O valor 2 seleciona o case 2, não o 1.','Falta considerar a continuação para o case 3.','','A execução não volta para o case 1.','Há um case correspondente ao valor 2.'],58,'intermediário',
    'int n=2;\nswitch(n) {\n  case 1: printf("A");\n  case 2: printf("B");\n  case 3: printf("C"); break;\n  default: printf("D");\n}');
  q('q073','np1','Quantas vezes o printf é executado e qual valor imprime?',
    ['Quatro vezes: 1, 2, 3, 4','Uma vez: 5','Cinco vezes: 1, 2, 3, 4, 5','Zero vezes','Erro de sintaxe'],1,
    'O ponto e vírgula imediatamente após o for é um corpo vazio. O laço termina com i=5; só então o printf é executado uma vez.',
    ['Isso ocorreria sem o ponto e vírgula depois do for.','','A condição i<5 não inclui uma iteração com i=5.','O printf está fora do laço e é alcançado após seu término.','Um corpo vazio é sintaticamente válido, embora possa ser um erro lógico.'],60,'intermediário',
    'int i;\nfor(i=1; i<5; i++);\nprintf("%d", i);');
  q('q074','np1','Qual é a saída final?',
    ['10','15','12','9','0'],2,
    'continue pula apenas i=3. A soma é 1+2+4+5=12, e o incremento do for continua ocorrendo normalmente.',
    ['A soma dos valores efetivamente adicionados é 12.','15 incluiria o valor 3, que é pulado.','','9 não corresponde aos valores adicionados.','O laço executa e soma quatro valores.'],61,'intermediário',
    'int soma=0;\nfor(int i=1; i<=5; i++) {\n  if(i==3) continue;\n  soma+=i;\n}\nprintf("%d", soma);');
  q('q075','np1','Qual é a saída? O código usa avaliação de curto-circuito.',
    ['1 1','0 0','0 1','1 0','Comportamento indefinido'],1,
    'O lado esquerdo de && é zero. Portanto, i++ não é avaliado. r vale 0 e i permanece 0.',
    ['A condição é falsa e o incremento é pulado.','','O lado direito não é executado.','O resultado de 0&&qualquer_expressão é 0.','O curto-circuito é definido e não há modificações conflitantes.'],55,'desafio',
    'int i=0;\nint r = 0 && i++;\nprintf("%d %d", r, i);');
  q('q076','np1','Com double x;, qual chamada de scanf usa o tipo correto de argumento e conversão?',
    ['scanf("%f", &x);','scanf("%lf", &x);','scanf("%d", x);','scanf("%lf", x);','scanf("%s", &x);'],1,
    'Em scanf, %lf espera double*, enquanto %f espera float*. O endereço &x tem tipo double*.',
    ['%f em scanf espera float*, incompatível com double*.','','%d espera int*, e x nem sequer é um endereço.','scanf precisa do endereço onde escrever o double.','%s espera um vetor de char, não double*.'],50,'intermediário');
  q('q077','np1','Com int x;, a leitura scanf("%i", &x) recebe 0x10. Qual é o valor decimal de x?',
    ['0','10','16','100','A leitura falha sempre'],2,
    '%i reconhece a base a partir do prefixo. 0x indica hexadecimal; 0x10 corresponde a dezesseis em decimal.',
    ['O prefixo hexadecimal é aceito por %i.','10 seria a interpretação decimal dos dígitos, ignorando o prefixo.','','0x10 não representa cem.','Essa entrada é válida para a conversão %i.'],49,'intermediário');
  q('q078','np1','Qual identificador é válido nas regras básicas de nomes usadas no material?',
    ['1ANO','salario mensal','SAL/HORA','salario_mensal','for'],3,
    'salario_mensal começa com letra e usa apenas letras e sublinhado. Não é palavra reservada.',
    ['Um identificador não pode começar com dígito.','Espaços não fazem parte de um identificador.','A barra é um operador, não parte do nome.','','for é uma palavra-chave da linguagem.'],49,'básico');
  q('q079','np1','Qual é a conclusão correta sobre este código em C?',
    ['Sempre imprime 1 2.','Sempre imprime 2 1.','Sempre imprime 1 1.','Tem comportamento indefinido por modificar i duas vezes sem sequenciamento entre os argumentos.','É igual a duas chamadas separadas de printf.'],3,
    'A avaliação dos argumentos não estabelece sequenciamento entre essas duas modificações de i. Não existe saída única garantida; uma execução observada não torna a expressão correta.',
    ['Não há garantia de avaliação da esquerda para a direita, e o problema é mais forte: comportamento indefinido.','Escolher uma ordem possível não resolve as modificações não sequenciadas.','Essa saída também não é garantida pelo C.','','Chamadas separadas estabelecem uma sequência entre as expressões completas.'],54,'desafio',
    'int i=1;\nprintf("%d %d", i++, i++);');
  q('q080','np1','Qual alternativa evita depender de fflush(stdin) para ignorar espaços e a quebra de linha antes de ler um único caractere?',
    ['scanf(" %c", &op);','scanf("%c", op);','fflush(stdin); em todo compilador C','gets(&op);','scanf("%s", &op);'],0,
    'O espaço antes de %c faz scanf consumir espaços em branco anteriores. fflush(stdin) não tem comportamento definido pelo C padrão para esse uso; para leitura de linhas, prefira fgets e tratamento explícito.',
    ['','%c precisa de char*, e op sem & é apenas o valor do caractere.','Algumas extensões tratam isso, mas o comportamento não é portátil no C padrão.','gets foi removida e um único char não comporta uma string.','%s grava uma sequência mais o terminador e pode exceder o espaço de um char.'],50,'desafio');

  window.QUESTIONS = items;
})();
