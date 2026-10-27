window.LESSONS = [
  {
    "id": "p01",
    "topic": "ponteiros",
    "title": "Endereço e conteúdo: entenda & e *",
    "page": 31,
    "minutes": 15,
    "summary": "Aprenda a separar a variável, seu endereço e o valor guardado em um ponteiro.",
    "objectives": [
      "Distinguir x, &x, p, *p e &p.",
      "Modificar uma variável indiretamente.",
      "Reconhecer um ponteiro ainda inválido para acesso."
    ],
    "sections": [
      {
        "heading": "Uma variável tem valor e endereço",
        "body": "Imagine uma caixa chamada x, guardando 10. A caixa ocupa um lugar na memória: &x obtém esse endereço. Um ponteiro guarda um endereço, não uma cópia do conteúdo da caixa. Em int *p = &x, p aponta para x. Depois dessa declaração, *p acessa a mesma variável que x. &p é outra coisa: o endereço da própria caixa que guarda o ponteiro."
      },
      {
        "heading": "Leia cada linha em voz alta",
        "body": "p = &x significa “p recebe o endereço de x”. *p = 25 significa “vá ao endereço guardado em p e escreva 25”. Portanto, x passa a valer 25; p continua apontando para x. Na declaração, o asterisco indica o tipo ponteiro. Em uma expressão, ele indica indireção. Observe que a atribuição inicial de um endereço não altera x.",
        "code": "#include <stdio.h>\nint main(void) {\n    int x = 10;\n    int *p = &x;\n    printf(\"%d %d\\n\", x, *p);\n    *p = 25;\n    printf(\"%d %d\\n\", x, *p);\n    printf(\"x esta em %p\\n\", (void *)&x);\n    return 0;\n}"
      },
      {
        "heading": "O tipo e a validade importam",
        "body": "int *p declara um ponteiro para int. Já int *p, q declara um ponteiro p e um inteiro q. Antes de usar *p, p deve apontar para um objeto válido do tipo adequado. Inicializar com NULL ajuda a representar “ainda não aponta para um objeto”, mas não autoriza *p. Não deduza o tamanho do ponteiro pelo tamanho do tipo apontado: consulte sizeof p. Endereços impressos podem mudar entre execuções."
      }
    ],
    "pitfall": "p = 75 não é uma maneira válida de colocar 75 em x. Para alterar x por meio de um ponteiro válido, use *p = 75.",
    "recall": {
      "prompt": "Se x = 8, p = &x e depois *p = 12, quanto valem x e *p? O endereço guardado em p muda?",
      "answer": "x e *p valem 12. p mantém o endereço de x; somente o conteúdo do objeto apontado mudou."
    }
  },
  {
    "id": "p02",
    "topic": "ponteiros",
    "title": "Copiar endereços ou copiar valores?",
    "page": 36,
    "minutes": 15,
    "summary": "Construa testes de mesa para p = q, *p = *q e redirecionamento de ponteiros.",
    "objectives": [
      "Explicar a diferença entre p = q e *p = *q.",
      "Acompanhar dois ponteiros ao mesmo objeto.",
      "Separar endereço simbólico e valor em uma tabela."
    ],
    "sections": [
      {
        "heading": "Duas operações com efeitos diferentes",
        "body": "Se p aponta para a e q aponta para b, p = q copia o endereço guardado em q. A partir daí, ambos apontam para b, e a não muda. Em *p = *q, os endereços não mudam: copia-se o valor do objeto apontado por q para o objeto apontado por p. Antes de executar uma dessas linhas, desenhe setas entre os ponteiros e as variáveis."
      },
      {
        "heading": "Um roteiro de teste de mesa",
        "body": "No programa, *p = *q torna a igual a 8. Em seguida, p = q redireciona p para b. A última escrita altera b para 20. A saída é 8 20 20 20. Use colunas separadas: a, b, “p aponta para”, “q aponta para”. Não invente um número de endereço; escrever &a ou &b é suficiente para raciocinar.",
        "code": "#include <stdio.h>\nint main(void) {\n    int a = 2, b = 8;\n    int *p = &a, *q = &b;\n    *p = *q;\n    p = q;\n    *p = 20;\n    printf(\"%d %d %d %d\\n\", a, b, *p, *q);\n    return 0;\n}"
      },
      {
        "heading": "Cópias comuns não ficam ligadas",
        "body": "Em int k = a, k recebe o valor atual de a. Uma mudança posterior em k não altera a. Essa é a razão pela qual, no exercício que pede mudar i para 75, alterar uma cópia k não funciona. Já *p acessa o próprio i quando p = &i. Também não existe atualização automática entre dois inteiros só porque tiveram valores iguais."
      }
    ],
    "pitfall": "Não atualize a variável antiga depois de redirecionar o ponteiro. A operação *p sempre usa o endereço que p guarda naquele momento.",
    "recall": {
      "prompt": "a = 3; b = 9; p = &a; q = &b; p = q; *q = 4. Quais são a, b e *p?",
      "answer": "a = 3, b = 4 e *p = 4. Depois de p = q, os dois ponteiros acessam b."
    }
  },
  {
    "id": "p03",
    "topic": "ponteiros",
    "title": "Ponteiros, vetores e aritmética",
    "page": 35,
    "minutes": 20,
    "summary": "Entenda por que v[i] equivale a *(v+i) e o que realmente acontece em p++.",
    "objectives": [
      "Converter acesso por índice em acesso por ponteiro.",
      "Distinguir p++, (*p)++ e *p++.",
      "Calcular deslocamentos e respeitar limites de um vetor."
    ],
    "sections": [
      {
        "heading": "O endereço inicial é o ponto de partida",
        "body": "Em muitas expressões, um vetor v é convertido em um ponteiro para seu primeiro elemento. Por isso int *p = v equivale a int *p = &v[0]. O elemento v[i] é *(v+i), e seu endereço é v+i. Porém, um vetor não é uma variável ponteiro constante: ele é um objeto do tipo array. Essa diferença aparece em sizeof v, que mede o vetor completo, e em &v, cujo tipo aponta para o vetor inteiro."
      },
      {
        "heading": "Andar no vetor não é somar ao conteúdo",
        "body": "p++ avança um elemento do tipo apontado. Se sizeof(int) for 4, o endereço numérico avança 4 bytes; esse tamanho não é uma regra universal do C. (*p)++ aumenta em 1 o inteiro apontado. A expressão *p++ agrupa-se como *(p++): usa o endereço anterior e incrementa o ponteiro. Separe instruções ao aprender para acompanhar cada efeito.",
        "code": "#include <stdio.h>\nint main(void) {\n    int v[4] = {10, 20, 30, 40};\n    int *p = v;\n    printf(\"%d\\n\", *(p + 2));\n    (*p)++;\n    p++;\n    printf(\"%d %d\\n\", v[0], *p);\n    return 0;\n}"
      },
      {
        "heading": "Operações permitidas e seus limites",
        "body": "Pode-se somar ou subtrair um inteiro a um ponteiro dentro do mesmo array, incluindo formar o endereço imediatamente após o último elemento. Esse endereço final não pode ser desreferenciado. A diferença entre ponteiros do mesmo array mede elementos. Não se somam dois ponteiros, não se multiplicam ponteiros e não se soma float a ponteiro. Comparações de ordem usadas aqui devem permanecer dentro do mesmo array."
      },
      {
        "heading": "Um índice negativo pode ser válido?",
        "body": "Se p = &v[2], p[-1] acessa v[1] e é válido. Se p = &v[0], p[-1] ficaria antes do array e não é um acesso válido. O sinal do índice sozinho não decide: é necessário verificar qual objeto o endereço final identifica. No exemplo, *p+2 soma 2 ao valor atual; *(p+2) acessa duas posições adiante."
      }
    ],
    "pitfall": "v++ é inválido porque v é um array, e não uma variável ponteiro modificável. p = v; p++ é permitido dentro dos limites adequados.",
    "recall": {
      "prompt": "v = {4, 8, 12}; p = v. Quanto valem *p + 2 e *(p + 2)?",
      "answer": "*p + 2 vale 6, pois é 4 + 2. *(p + 2) vale 12, pois acessa v[2]."
    }
  },
  {
    "id": "p04",
    "topic": "ponteiros",
    "title": "“Por referência”: modificar o original",
    "page": 41,
    "minutes": 20,
    "summary": "Ligue funções, ponteiros e scanf pelo mecanismo de passagem de endereços.",
    "objectives": [
      "Implementar uma troca com ponteiros.",
      "Diferenciar modificar *p de modificar p.",
      "Explicar o termo didático passagem por referência em C."
    ],
    "sections": [
      {
        "heading": "C sempre passa argumentos por valor",
        "body": "O material chama o uso de ponteiros de “passagem por referência”. Esse é um nome didático para o efeito: a função consegue alterar o objeto original. Tecnicamente, C continua passando por valor: copia-se o endereço para o parâmetro ponteiro. A cópia aponta para o mesmo objeto. Alterar *p modifica esse objeto; alterar apenas p modifica a cópia local do endereço."
      },
      {
        "heading": "Swap precisa guardar um dos valores",
        "body": "troca recebe dois endereços. temp conserva o valor inicial de *a antes que ele seja sobrescrito. Sem essa variável, fazer *a = *b e depois *b = *a repetiria o mesmo valor nos dois objetos. Na chamada, &x e &y fornecem os endereços. A saída é 200 100.",
        "code": "#include <stdio.h>\nvoid troca(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\nint main(void) {\n    int x = 100, y = 200;\n    troca(&x, &y);\n    printf(\"%d %d\\n\", x, y);\n    return 0;\n}"
      },
      {
        "heading": "Receber um endereço permite, mas não obriga, alterar",
        "body": "Uma função pode receber const int *p e somente ler o objeto. Mesmo sem const, o original muda apenas se houver escrita no objeto apontado. No exercício Volume, primeiro calcule o volume com o valor original; só depois faça *aresta = 0. O valor retornado e a modificação indireta são dois canais diferentes de resultado.",
        "code": "/* Trecho: função usada com volume(&a). */\nfloat volume(float *aresta) {\n    float resultado = (*aresta) * (*aresta) * (*aresta);\n    *aresta = 0;\n    return resultado;\n}"
      },
      {
        "heading": "A mesma ideia explica scanf",
        "body": "scanf precisa de um lugar onde guardar o que leu. Para int x, scanf(\"%d\", &x) recebe um int*. Para char nome[20], scanf(\"%19s\", nome) recebe o endereço inicial por conversão do array; não use &nome, que tem outro tipo. Passar um ponteiro não corrige um endereço inválido: o objeto deve existir e ter espaço suficiente."
      }
    ],
    "pitfall": "Passar &x não muda x por si só. É a escrita através de *p que altera o objeto original.",
    "recall": {
      "prompt": "Uma função recebe int *p, executa p = NULL e retorna. O ponteiro do chamador vira NULL?",
      "answer": "Não. A função alterou somente sua cópia local do ponteiro. Para alterar o ponteiro do chamador, seria necessário outro mecanismo, como receber int **."
    }
  },
  {
    "id": "f01",
    "topic": "funcoes",
    "title": "Funções, protótipos e modularização",
    "page": 15,
    "minutes": 15,
    "summary": "Leia uma assinatura de função e organize programas em tarefas menores.",
    "objectives": [
      "Identificar retorno, nome e parâmetros.",
      "Distinguir declaração de definição.",
      "Usar protótipos antes das chamadas."
    ],
    "sections": [
      {
        "heading": "Uma função tem um contrato",
        "body": "Em float media(float a, float b), float antes do nome informa o tipo devolvido; media é o nome; a e b são parâmetros formais. Na chamada media(6, 8), 6 e 8 são argumentos. O corpo, entre chaves, implementa a tarefa. return encerra a função e fornece o resultado ao chamador. Uma função void não devolve um valor, mas pode executar ações ou modificar objetos através de ponteiros."
      },
      {
        "heading": "O compilador precisa conhecer a função",
        "body": "Uma definição anterior à chamada já apresenta a função. Se o corpo ficar depois de main, declare antes um protótipo, encerrado com ponto e vírgula. Os nomes dos parâmetros podem ser omitidos no protótipo. Em C11, void f(void) explicita que não há parâmetros; void f() não fornece essa mesma informação de protótipo.",
        "code": "#include <stdio.h>\nfloat media(float, float);\nint main(void) {\n    float resultado = media(6.0f, 8.0f);\n    printf(\"%.2f\\n\", resultado);\n    return 0;\n}\nfloat media(float a, float b) {\n    return (a + b) / 2.0f;\n}"
      },
      {
        "heading": "Dividir para entender e testar",
        "body": "Modularizar é separar responsabilidades: lerNotas, calcularMedia e mostrarResultado. Uma função deve receber os dados de que precisa e deixar claro o que produz. Em projetos com vários arquivos, um cabeçalho .h costuma declarar os protótipos; os arquivos .c contêm as definições e são compilados e ligados juntos. Não existe a regra “um .c só pode ter uma função”. Incluir um cabeçalho não compila automaticamente um arquivo .c separado."
      }
    ],
    "pitfall": "Protótipo termina com ; e não possui corpo. A definição possui corpo. Não confunda o tipo retornado com o tipo dos parâmetros.",
    "recall": {
      "prompt": "Em double cubo(double x), o que cada double significa?",
      "answer": "O primeiro é o tipo do resultado devolvido. O segundo é o tipo do parâmetro formal x."
    }
  },
  {
    "id": "f02",
    "topic": "funcoes",
    "title": "Escopo, tempo de vida e cópias",
    "page": 18,
    "minutes": 18,
    "summary": "Descubra qual variável cada nome representa e por que alterar um parâmetro comum não altera o original.",
    "objectives": [
      "Distinguir local, formal e global.",
      "Resolver ocultação de nomes.",
      "Separar escopo de duração de armazenamento."
    ],
    "sections": [
      {
        "heading": "Escopo responde “onde posso usar este nome?”",
        "body": "Uma variável declarada em um bloco é local a esse bloco e aos blocos internos, a partir de sua declaração. Um parâmetro formal é local à função. Uma variável declarada fora das funções possui escopo de arquivo, a partir da declaração. Se um bloco interno declara outro x, o nome local oculta o externo naquele trecho. São objetos diferentes, mesmo com a mesma grafia."
      },
      {
        "heading": "A alteração da cópia fica na função",
        "body": "muda recebe uma cópia do argumento. Seu x começa em 10 e passa a 99, mas o x de main continua 10. A variável global valor também é distinta de qualquer local com o mesmo nome. Para prever saídas, escreva “x de main” e “x de muda”, em vez de manter apenas uma coluna x.",
        "code": "#include <stdio.h>\nint valor = 5;\nvoid muda(int x) {\n    x = 99;\n    printf(\"%d \", x);\n}\nint main(void) {\n    int x = 10;\n    muda(x);\n    printf(\"%d %d\\n\", x, valor);\n    return 0;\n}"
      },
      {
        "heading": "Tempo de vida é outra pergunta",
        "body": "Uma variável local automática existe durante a execução correspondente do bloco. Cada chamada recursiva possui suas próprias variáveis automáticas. Uma local static conserva seu valor entre chamadas, embora seu nome continue local. Objetos de duração estática, incluindo globais, existem durante a execução do programa e são inicializados com zero quando não há inicializador explícito. Locais automáticas não inicializadas não recebem automaticamente zero.",
        "code": "/* Trecho: cada chamada imprime o próximo número. */\nvoid contar(void) {\n    static int vezes = 0;\n    vezes++;\n    printf(\"%d\\n\", vezes);\n}"
      },
      {
        "heading": "Menos globais, menos efeitos escondidos",
        "body": "Globais podem ser úteis, mas uma função que depende de várias globais é mais difícil de testar. Prefira parâmetros quando eles deixarem as entradas claras. Não retorne o endereço de uma variável local automática: quando a função terminar, esse objeto deixará de existir. O ponteiro não prolonga a vida do objeto."
      }
    ],
    "pitfall": "“Local morre ao sair do bloco” descreve locais automáticas, não locais static. Escopo e tempo de vida não são sinônimos.",
    "recall": {
      "prompt": "Uma função declara int nota = 0; e outra também declara int nota = 0;. Elas compartilham a mesma nota?",
      "answer": "Não. Cada declaração local define seu próprio objeto; o nome igual não cria ligação entre eles."
    }
  },
  {
    "id": "f03",
    "topic": "funcoes",
    "title": "Recursão: descer e voltar",
    "page": 20,
    "minutes": 20,
    "summary": "Acompanhe a pilha de chamadas de fatorial e a construção da sequência de Fibonacci.",
    "objectives": [
      "Definir caso base e redução do problema.",
      "Rastrear chamadas e retornos.",
      "Comparar uma solução recursiva e uma iterativa."
    ],
    "sections": [
      {
        "heading": "Duas condições para uma boa recursão",
        "body": "Uma função recursiva chama a si mesma. Ela precisa de um caso base e de chamadas que se aproximem desse caso. Para fatorial de n não negativo, 0! = 1 e n! = n × (n−1)!. É importante definir o domínio: números negativos não têm fatorial nessa definição. Mesmo com lógica correta, tipos inteiros possuem limites e podem não representar fatoriais grandes."
      },
      {
        "heading": "Não multiplique antes de receber o retorno",
        "body": "Em fat(4), ficam pendentes 4 × fat(3), 3 × fat(2) e 2 × fat(1). fat(1) retorna 1. Na volta: fat(2) = 2, fat(3) = 6, fat(4) = 24. Cada chamada tem seu próprio n. A condição n <= 1 cobre 0 e 1 neste exemplo; o chamador deve restringir a entrada a números não negativos.",
        "code": "#include <stdio.h>\nunsigned long long fat(unsigned int n) {\n    if (n <= 1) return 1;\n    return n * fat(n - 1);\n}\nint main(void) {\n    printf(\"%llu\\n\", fat(4));\n    return 0;\n}"
      },
      {
        "heading": "Recursão e repetição são escolhas",
        "body": "Uma versão iterativa inicia resultado = 1 e multiplica de 2 até n. Ela não precisa manter uma cadeia de chamadas. Recursão não é automaticamente mais rápida nem mais lenta em todos os problemas: avalie o algoritmo. A implementação ingênua de Fibonacci que chama fib(n−1) e fib(n−2) repete muitos cálculos. Para gerar os primeiros termos, manter os dois anteriores em um laço é simples e eficiente.",
        "code": "/* Trecho: imprime os seis primeiros termos. */\nint a = 1, b = 1;\nfor (int i = 0; i < 6; i++) {\n    printf(\"%d \", a);\n    int proximo = a + b;\n    a = b;\n    b = proximo;\n}"
      },
      {
        "heading": "Teste de mesa em duas fases",
        "body": "Na descida, registre o argumento de cada chamada e a operação que fica esperando. Na subida, registre o valor que cada chamada devolve. Se existir printf antes da chamada recursiva, ele ocorre na descida; se estiver depois, ocorre na subida. Essa diferença costuma explicar saídas invertidas em exercícios."
      }
    ],
    "pitfall": "Um caso base que existe no código mas nunca é alcançado não evita recursão infinita. Confira como o argumento muda a cada chamada.",
    "recall": {
      "prompt": "Quantas chamadas acontecem em fat(4) quando o caso base é n <= 1? Qual é o resultado?",
      "answer": "Quatro chamadas: fat(4), fat(3), fat(2), fat(1). O resultado é 24."
    }
  },
  {
    "id": "a01",
    "topic": "arquivos",
    "title": "Abrir, usar e fechar arquivos",
    "page": 7,
    "minutes": 18,
    "summary": "Escolha r, w ou a com segurança e entenda o papel de FILE * e do buffer.",
    "objectives": [
      "Escolher um modo de abertura.",
      "Verificar falha de fopen.",
      "Explicar buffer e fechamento."
    ],
    "sections": [
      {
        "heading": "FILE * representa um fluxo aberto",
        "body": "A biblioteca stdio.h oferece operações para trabalhar com fluxos de bytes. FILE *fp é o identificador que você passa às funções de leitura e escrita. fopen tenta abrir o caminho no modo escolhido e devolve NULL se falhar. Não use fprintf, fscanf ou fclose com um ponteiro de arquivo inválido. Neste laboratório, os caminhos começam com /, como /dados.txt, e apontam para arquivos virtuais da execução."
      },
      {
        "heading": "A letra escolhe o comportamento",
        "body": "r abre para leitura e exige que o arquivo exista. w abre para escrita: cria se necessário e apaga o conteúdo anterior de um arquivo existente. a abre para acrescentar: cria se necessário e faz as escritas no final. O + permite leitura e escrita; não elimina o comportamento da letra. Assim, r+ exige arquivo existente, w+ apaga ou cria e a+ mantém as escritas no final. O b seleciona modo binário: rb, wb, ab, r+b, w+b e a+b."
      },
      {
        "heading": "Um programa mínimo de escrita",
        "body": "O programa verifica a abertura, grava um número e fecha o fluxo. fclose retorna zero no sucesso e EOF se detectar erro. Escritas podem ficar temporariamente no buffer; fechar o fluxo tenta descarregar o que restou. Verificar erros é especialmente importante quando os dados precisam ser preservados.",
        "code": "#include <stdio.h>\nint main(void) {\n    FILE *fp = fopen(\"/dados.txt\", \"w\");\n    if (fp == NULL) {\n        puts(\"Falha ao abrir\");\n        return 1;\n    }\n    if (fprintf(fp, \"%d\\n\", 42) < 0) {\n        fclose(fp);\n        return 1;\n    }\n    if (fclose(fp) == EOF) return 1;\n    return 0;\n}"
      },
      {
        "heading": "Pense no que deve acontecer com os dados antigos",
        "body": "Para um relatório completamente recalculado, w pode ser apropriado. Para um histórico de operações, a preserva registros anteriores e acrescenta os novos. Para consulta, r é a opção natural. A extensão .txt ou .bin não decide sozinha o modo: o programa escolhe o tratamento. Em alguns ambientes texto e binário têm comportamento semelhante, mas use os modos corretos para portabilidade."
      }
    ],
    "pitfall": "Abrir com w já trunca o arquivo existente: não é necessário chegar ao primeiro fprintf para perder o conteúdo anterior.",
    "recall": {
      "prompt": "Você quer acrescentar uma venda sem apagar as antigas, criando o arquivo se ele não existir. Qual modo usa?",
      "answer": "a para texto; ab para dados binários."
    }
  },
  {
    "id": "a02",
    "topic": "arquivos",
    "title": "Texto: fprintf, fscanf e leitura validada",
    "page": 8,
    "minutes": 18,
    "summary": "Grave valores formatados e controle a leitura pelo retorno da própria função.",
    "objectives": [
      "Relacionar printf/fprintf e scanf/fscanf.",
      "Interpretar a quantidade de conversões bem-sucedidas.",
      "Evitar processar dados antigos após uma leitura falhar."
    ],
    "sections": [
      {
        "heading": "A diferença é o destino ou a origem",
        "body": "printf escreve na saída padrão; fprintf recebe primeiro um FILE * para escolher o fluxo. scanf lê da entrada padrão; fscanf recebe primeiro o arquivo de origem. Os formatos continuam importantes: %d recebe int*, %f recebe float* e %lf recebe double* na leitura. Strings usam um char* com espaço suficiente e limite de largura."
      },
      {
        "heading": "Use o sucesso da leitura como condição",
        "body": "fscanf devolve a quantidade de campos atribuídos com sucesso. Se o formato tem um único %d, o retorno 1 confirma um inteiro novo. Se o próximo texto não for um inteiro, pode retornar 0; se ocorrer fim de entrada antes de qualquer conversão, retorna EOF. O laço abaixo imprime 10, 20 e 30, sem repetir artificialmente o último valor.",
        "code": "#include <stdio.h>\nint main(void) {\n    FILE *fp = fopen(\"/numeros.txt\", \"w\");\n    if (!fp) return 1;\n    fprintf(fp, \"10 20 30\\n\");\n    fclose(fp);\n    fp = fopen(\"/numeros.txt\", \"r\");\n    if (!fp) return 1;\n    int x;\n    while (fscanf(fp, \"%d\", &x) == 1)\n        printf(\"%d\\n\", x);\n    fclose(fp);\n    return 0;\n}"
      },
      {
        "heading": "Dois campos exigem duas conversões",
        "body": "Em fscanf(fp, \"%19s %f\", nome, &nota), só processe o registro quando o retorno for 2. Se vier 1, o nome foi lido, mas a nota não. Em dados separados por espaços, %s não lê nomes completos com espaços. fgets é mais apropriado para obter uma linha inteira; depois a linha pode ser analisada. Não trate um arquivo malformado como se fosse apenas fim normal."
      },
      {
        "heading": "Entrada e saída em um mesmo fluxo",
        "body": "Modos com + permitem as duas direções, mas alterná-las exige cuidados de sincronização previstos pelo C. Uma operação de posicionamento como rewind ou fseek é uma forma simples de preparar a leitura após escrever. Nos exemplos iniciais, fechar e reabrir deixa a sequência explícita e facilita o teste de mesa."
      }
    ],
    "pitfall": "while (!feof(fp)) não garante que o próximo fscanf terá sucesso. Leia primeiro e processe somente se o retorno confirmar dados válidos.",
    "recall": {
      "prompt": "Se fscanf(fp, \"%d %f\", &codigo, &nota) retorna 1, o registro completo pode ser usado?",
      "answer": "Não. Apenas uma conversão foi concluída. O registro só está completo quando o retorno é 2."
    }
  },
  {
    "id": "a03",
    "topic": "arquivos",
    "title": "Caracteres, EOF e posição no arquivo",
    "page": 12,
    "minutes": 17,
    "summary": "Entenda o fim de arquivo e explore fgetc, fputc, rewind, fseek e ftell.",
    "objectives": [
      "Guardar o resultado de fgetc em int.",
      "Distinguir EOF, feof e ferror.",
      "Reposicionar uma leitura."
    ],
    "sections": [
      {
        "heading": "O retorno precisa representar um caractere ou EOF",
        "body": "fgetc devolve o próximo byte como unsigned char convertido para int, ou EOF em fim de entrada/erro. Por isso a variável receptora deve ser int. Guardar primeiro em char pode perder a distinção entre um byte válido e EOF. EOF é uma constante inteira negativa; frequentemente vale −1, mas um programa correto compara com EOF, não com um número fixo."
      },
      {
        "heading": "O indicador é consequência de uma tentativa de leitura",
        "body": "feof consulta o indicador de fim do fluxo; não prevê se a próxima leitura vai falhar. Ler o último caractere com sucesso não necessariamente ativa esse indicador. ferror consulta o indicador de erro. O laço compara diretamente o retorno de fgetc e, depois, pode consultar ferror para distinguir erro de fim normal.",
        "code": "/* Trecho: fp já foi aberto e validado para leitura. */\nint c;\nwhile ((c = fgetc(fp)) != EOF) {\n    putchar(c);\n}\nif (ferror(fp)) {\n    puts(\"Erro durante a leitura\");\n}"
      },
      {
        "heading": "Voltar e consultar posições",
        "body": "rewind(fp) volta ao início e limpa os indicadores de erro e fim. fseek(fp, deslocamento, origem) reposiciona o fluxo usando SEEK_SET, SEEK_CUR ou SEEK_END; retorna zero no sucesso. ftell devolve a posição corrente ou −1L se falhar. Em arquivos binários comuns, posições são medidas em bytes. Em texto, os valores e deslocamentos têm restrições de portabilidade: reutilizar uma posição obtida por ftell é mais seguro do que presumir uma contagem universal de caracteres."
      },
      {
        "heading": "Escrita de um caractere por vez",
        "body": "fputc(c, fp) grava um caractere no fluxo. putc e getc têm propósito equivalente a fputc e fgetc, mas podem ser implementados como macros; evite argumentos com efeitos colaterais. Para copiar um arquivo, leia em int até EOF e escreva cada valor no destino, verificando os retornos. Para ler uma linha, fgets costuma ser mais conveniente."
      }
    ],
    "pitfall": "EOF não é um caractere armazenado no fim do arquivo. É um valor especial retornado por funções de leitura para sinalizar uma condição.",
    "recall": {
      "prompt": "Por que int c é preferível a char c ao escrever while ((c = fgetc(fp)) != EOF)?",
      "answer": "Porque int consegue preservar todos os valores de byte retornados e também o sinal especial EOF; char pode confundir esses casos."
    }
  },
  {
    "id": "a04",
    "topic": "arquivos",
    "title": "Registros binários e cadastro em CSV",
    "page": 10,
    "minutes": 22,
    "summary": "Grave e recupere structs, interprete fread/fwrite e escolha a representação dos dados.",
    "objectives": [
      "Ordenar os quatro argumentos de fread e fwrite.",
      "Interpretar o retorno em itens.",
      "Comparar texto CSV com cópia binária de structs."
    ],
    "sections": [
      {
        "heading": "Endereço, tamanho, quantidade e arquivo",
        "body": "fwrite(origem, tamanho, quantidade, fp) grava itens de memória; fread(destino, tamanho, quantidade, fp) os lê. O retorno conta itens completos, não necessariamente bytes. Em fwrite(&aluno, sizeof aluno, 1, fp), sucesso completo significa retorno 1. Já fwrite(&aluno, 1, sizeof aluno, fp) conta itens de um byte: o retorno esperado é sizeof aluno."
      },
      {
        "heading": "Do registro para o arquivo e de volta",
        "body": "O programa grava e lê um registro. O endereço do registro é passado com &, e sizeof calcula o tamanho real do objeto nessa implementação. A estrutura lida tem a mesma definição da gravada. Abrir em wb permite escrita binária e rb permite leitura binária.",
        "code": "#include <stdio.h>\ntypedef struct { int codigo; float nota; } Aluno;\nint main(void) {\n    Aluno a = {1, 8.5f}, b;\n    FILE *fp = fopen(\"/alunos.bin\", \"wb\");\n    if (!fp) return 1;\n    size_t gravados = fwrite(&a, sizeof a, 1, fp);\n    int fechamento = fclose(fp);\n    if (gravados != 1 || fechamento != 0) return 1;\n    fp = fopen(\"/alunos.bin\", \"rb\");\n    if (!fp) return 1;\n    size_t lidos = fread(&b, sizeof b, 1, fp);\n    fclose(fp);\n    if (lidos != 1) return 1;\n    printf(\"%d %.1f\\n\", b.codigo, b.nota);\n    return 0;\n}"
      },
      {
        "heading": "Cópia binária não é formato universal",
        "body": "Uma struct pode conter bytes de preenchimento, e representações numéricas podem variar entre plataformas. Gravar sua memória diretamente é um exercício útil, mas não cria automaticamente um formato portátil. Ponteiros guardados em uma struct não tornam os objetos apontados persistentes: gravar o endereço não grava o conteúdo externo. Para intercâmbio, costuma-se definir uma representação explícita dos campos."
      },
      {
        "heading": "CSV é texto organizado em campos",
        "body": "Um cadastro CSV pode usar modo a para acrescentar registros, fprintf para escrever os campos e uma primeira linha de cabeçalho. No material, fseek/ftell ajudam a detectar arquivo vazio. Nomes e endereços podem conter vírgulas e aspas: CSV robusto envolve campos com aspas quando necessário e duplica aspas internas. Colocar aspas ao redor de %s sem tratar aspas dentro do texto não resolve todos os casos."
      }
    ],
    "pitfall": "O terceiro argumento de fread/fwrite é a quantidade de itens. O segundo é o tamanho de cada item. O retorno deve ser comparado com a quantidade esperada.",
    "recall": {
      "prompt": "fread(v, sizeof v[0], 5, fp) retorna 3. Quantos elementos completos foram obtidos?",
      "answer": "Três elementos. Os dois restantes não podem ser tratados como se tivessem sido lidos com sucesso."
    }
  },
  {
    "id": "v01",
    "topic": "vetores",
    "title": "Vetores: índices, memória e inicialização",
    "page": 21,
    "minutes": 16,
    "summary": "Organize valores do mesmo tipo e domine as contas com sizeof.",
    "objectives": [
      "Identificar o primeiro e o último índice.",
      "Calcular a memória de um vetor com premissas explícitas.",
      "Distinguir tamanho do vetor e valor dos elementos."
    ],
    "sections": [
      {
        "heading": "Uma coleção homogênea",
        "body": "int v[5] reserva cinco objetos int consecutivos, acessados por v[0] até v[4]. O quinto elemento está no índice 4. O tipo dos elementos é o mesmo, por isso o vetor é chamado homogêneo. A declaração não inicializa automaticamente os elementos de um vetor local automático. Use um inicializador quando precisar de valores conhecidos."
      },
      {
        "heading": "Inicialização parcial completa com zeros",
        "body": "Em int v[5] = {10, 20}, os dois primeiros elementos recebem 10 e 20; os restantes recebem zero. Em int v[] = {1, 2, 3}, o compilador deduz três elementos. Não confunda v[5] em uma declaração, que informa a quantidade, com v[5] em uma expressão, que tenta acessar o sexto elemento.",
        "code": "#include <stdio.h>\nint main(void) {\n    int v[5] = {10, 20};\n    size_t n = sizeof v / sizeof v[0];\n    printf(\"Elementos: %zu\\n\", n);\n    printf(\"Bytes: %zu\\n\", sizeof v);\n    for (size_t i = 0; i < n; i++)\n        printf(\"%d \", v[i]);\n    return 0;\n}"
      },
      {
        "heading": "sizeof mede bytes do objeto",
        "body": "A memória do vetor é quantidade × sizeof(elemento). Se o enunciado disser que int ocupa 4 bytes, int v[100] ocupa 400 bytes. O C não exige que int sempre tenha 4 bytes. sizeof devolve size_t, impresso com %zu. A fórmula sizeof v / sizeof v[0] funciona quando v é realmente um array naquele escopo; num parâmetro de função ajustado para ponteiro, ela não recupera o tamanho original."
      }
    ],
    "pitfall": "O laço para um vetor de N elementos normalmente usa i < N. Usar i <= N acessa uma posição além do último elemento.",
    "recall": {
      "prompt": "Se sizeof(double) = 8, quanto ocupa double notas[12]? Qual o último índice?",
      "answer": "96 bytes. O último índice é 11."
    }
  },
  {
    "id": "v02",
    "topic": "vetores",
    "title": "Percorrer, somar e passar vetores",
    "page": 23,
    "minutes": 18,
    "summary": "Use acumuladores, crie resultados elemento a elemento e envie o tamanho junto ao vetor.",
    "objectives": [
      "Inicializar um acumulador corretamente.",
      "Distinguir soma total e soma parcial.",
      "Escrever uma função que recebe vetor e tamanho."
    ],
    "sections": [
      {
        "heading": "Acumular exige um estado inicial",
        "body": "Para somar os elementos, comece total = 0. Em cada volta, acrescente v[i]. Um printf dentro do laço mostra somas parciais; fora dele, mostra somente o total. No vetor do material {1,3,5,4,8,12,6,10}, as parciais são 1,4,9,13,21,33,39,49. Entender onde o printf está evita muitos erros em questões de saída."
      },
      {
        "heading": "O tamanho precisa viajar separado",
        "body": "Na declaração de parâmetro, const float v[] é ajustado para const float *v. A função recebe um ponteiro e não recebe automaticamente a quantidade de elementos. Por isso, envie também n. const informa que a função não vai alterar os elementos por esse parâmetro. O exemplo exige n maior que zero.",
        "code": "#include <stdio.h>\nfloat media(const float v[], int n) {\n    float soma = 0;\n    for (int i = 0; i < n; i++) soma += v[i];\n    return soma / n;\n}\nint main(void) {\n    float v[5] = {8.4f, 6.9f, 4.5f, 4.6f, 7.2f};\n    printf(\"%.2f\\n\", media(v, 5));\n    return 0;\n}"
      },
      {
        "heading": "Soma de vetores e inversão",
        "body": "Somar dois vetores elemento a elemento significa s[i] = a[i] + b[i] para cada índice válido. Para imprimir um vetor ao contrário, percorra do último índice até zero. Se o contador for unsigned, uma condição i >= 0 nunca fica falsa; prefira int em um exercício pequeno de contagem regressiva ou uma forma de laço apropriada para size_t. Use #define TAM 5 quando quiser uma constante simbólica de tamanho."
      }
    ],
    "pitfall": "Modificar v[i] dentro de uma função que recebe int v[] modifica o array original. Alterar apenas a variável ponteiro local não redireciona o array do chamador.",
    "recall": {
      "prompt": "Por que uma função media precisa receber n, além de receber o vetor?",
      "answer": "Porque o parâmetro é ajustado para ponteiro ao primeiro elemento; a quantidade de elementos não acompanha esse ponteiro automaticamente."
    }
  },
  {
    "id": "s01",
    "topic": "strings",
    "title": "Strings, capacidade e leitura de linhas",
    "page": 24,
    "minutes": 18,
    "summary": "Veja a string como caracteres mais terminador e leia sem ultrapassar o espaço disponível.",
    "objectives": [
      "Contar o espaço de uma string com o terminador.",
      "Comparar strlen e sizeof.",
      "Escolher scanf limitado ou fgets."
    ],
    "sections": [
      {
        "heading": "O terminador faz parte da representação",
        "body": "Uma string C é uma sequência de caracteres terminada por \\0. char s[] = \"primeiro\" possui nove posições: oito letras e o terminador. char s[20] comporta até dezenove bytes de conteúdo mais \\0. Em textos UTF-8, uma letra acentuada pode ocupar mais de um byte; por isso “19 letras” é apenas uma simplificação para caracteres de um byte."
      },
      {
        "heading": "Capacidade e comprimento são diferentes",
        "body": "sizeof s mede o array inteiro quando s é um array no escopo atual. strlen(s), de string.h, conta os bytes antes do primeiro \\0. Em char s[20] = \"Ola\", sizeof s é 20 e strlen(s) é 3. O restante da capacidade não faz parte do conteúdo da string. Usar strlen exige que exista um terminador acessível."
      },
      {
        "heading": "Ler uma linha com espaços",
        "body": "fgets recebe o destino, sua capacidade e o fluxo. Lê no máximo capacidade−1 caracteres, acrescenta \\0 no sucesso e pode conservar a quebra de linha. strcspn encontra a primeira posição de \\n; substituir esse caractere por \\0 remove a quebra quando ela estiver presente. Sempre confira se fgets retornou NULL antes de usar os dados.",
        "code": "#include <stdio.h>\n#include <string.h>\nint main(void) {\n    char nome[50];\n    if (fgets(nome, sizeof nome, stdin) == NULL) return 1;\n    nome[strcspn(nome, \"\\n\")] = '\\0';\n    printf(\"Ola, %s!\\n\", nome);\n    return 0;\n}"
      },
      {
        "heading": "Ler uma palavra é outra tarefa",
        "body": "scanf(\"%19s\", s) lê uma palavra, parando no espaço, e reserva a vigésima posição para \\0 quando s tem tamanho 20. fgets lê espaços também. gets não oferece limite de tamanho e foi removida do padrão C11. Após uma leitura numérica, pode sobrar \\n no fluxo: planeje a sequência de leituras, em vez de recorrer a fflush(stdin), cujo uso para limpar entrada não é definido pelo padrão C."
      }
    ],
    "pitfall": "\"a\" é uma string com dois elementos, a e \\0. 'a' é uma constante de caractere; as aspas mudam o significado.",
    "recall": {
      "prompt": "char s[10] = \"UNIP\"; quais são sizeof s e strlen(s)?",
      "answer": "sizeof s vale 10; strlen(s) vale 4. O terminador existe, mas não entra na contagem de strlen."
    }
  },
  {
    "id": "s02",
    "topic": "strings",
    "title": "Copiar, juntar e comparar strings",
    "page": 40,
    "minutes": 17,
    "summary": "Domine string.h e os vetores de ponteiros usados nas mensagens do material.",
    "objectives": [
      "Usar destino antes de origem.",
      "Interpretar strcmp == 0.",
      "Distinguir array modificável de literal de string."
    ],
    "sections": [
      {
        "heading": "Strings não são atribuídas como inteiros",
        "body": "Depois de declarar char destino[30], não se copia outra string com destino = origem. strcpy(destino, origem) copia os caracteres e o terminador. strcat(destino, origem) acrescenta a origem após o conteúdo já existente. Em ambos, o destino deve ter capacidade suficiente; strcat também exige uma string inicialmente válida no destino."
      },
      {
        "heading": "Comparação de conteúdo",
        "body": "strcmp(a, b) retorna zero quando as strings são iguais, negativo quando a vem antes e positivo quando a vem depois na comparação de bytes. Não suponha que o retorno seja sempre −1 ou 1. a == b compara endereços, não o conteúdo das strings. Para testar uma senha textual, o teste típico é strcmp(senha, \"abc\") == 0.",
        "code": "#include <stdio.h>\n#include <string.h>\nint main(void) {\n    char mensagem[40] = \"Ola, \";\n    char copia[40];\n    strcat(mensagem, \"Maria\");\n    strcpy(copia, mensagem);\n    printf(\"%s\\n\", copia);\n    printf(\"Iguais: %d\\n\", strcmp(copia, mensagem) == 0);\n    return 0;\n}"
      },
      {
        "heading": "Um vetor pode guardar ponteiros",
        "body": "int *p[10] é um array de dez ponteiros para int. No caso de mensagens, const char *erros[] = {\"abertura\", \"leitura\", \"escrita\"} guarda três ponteiros para literais. erros[2] seleciona a terceira mensagem; erros[2][0] acessa seu primeiro caractere. Use const para deixar claro que o conteúdo dos literais não deve ser alterado.",
        "code": "/* Trecho: seleciona a terceira mensagem. */\nconst char *erros[] = {\"abertura\", \"leitura\", \"escrita\"};\nprintf(\"%s\\n\", erros[2]);"
      },
      {
        "heading": "Array de caracteres versus ponteiro",
        "body": "char nome[] = \"Ana\" cria um array inicializado com uma cópia dos caracteres, que pode ser modificado dentro de seus limites. const char *nome = \"Ana\" cria um ponteiro para um literal; modificar o literal não é permitido. O ponteiro pode ser redirecionado para outra string, mas o array não pode receber um novo endereço por atribuição."
      }
    ],
    "pitfall": "strcat não aumenta a capacidade do array. Juntar strings que não cabem ultrapassa a memória disponível e causa comportamento indefinido.",
    "recall": {
      "prompt": "Qual condição verifica se duas strings a e b têm o mesmo conteúdo?",
      "answer": "strcmp(a, b) == 0, incluindo string.h e garantindo duas strings válidas."
    }
  },
  {
    "id": "m01",
    "topic": "matrizes",
    "title": "Matrizes: linhas, colunas e memória",
    "page": 24,
    "minutes": 20,
    "summary": "Percorra tabelas com laços aninhados e entenda a organização linha por linha.",
    "objectives": [
      "Acessar a[i][j] com os índices corretos.",
      "Calcular memória total e médias por linha.",
      "Distinguir diagonal principal de uma linha comum."
    ],
    "sections": [
      {
        "heading": "Um array de arrays",
        "body": "int a[3][4] possui três linhas, cada uma com quatro inteiros. O primeiro índice escolhe a linha, e o segundo a coluna. O quarto aluno na segunda prova está em notas[3][1], se a matriz tiver essa quantidade de linhas. A notação de C usa dois pares de colchetes; a[3,1] não representa esse acesso bidimensional."
      },
      {
        "heading": "A ordem real é por linhas",
        "body": "Em C, a[0][0], a[0][1], a[0][2] e assim por diante vêm antes da próxima linha. Para L linhas e C colunas, a memória total é L × C × sizeof(elemento). O deslocamento do elemento [i][j] em uma visualização linear é (i × C + j) × sizeof(elemento). O desenho de memória do PDF tem simplificações; use essa organização por linhas para raciocinar."
      },
      {
        "heading": "Um laço para cada dimensão",
        "body": "O laço externo percorre alunos, o interno percorre provas. Reinicie a soma de cada aluno ao começar uma nova linha. O exemplo calcula duas médias: 7.00 e 5.00. Se quiser a média da turma, some as médias uma vez por aluno ou some todas as notas e divida pela quantidade total de notas.",
        "code": "#include <stdio.h>\nint main(void) {\n    float notas[2][3] = {{6, 7, 8}, {4, 5, 6}};\n    for (int i = 0; i < 2; i++) {\n        float soma = 0;\n        for (int j = 0; j < 3; j++) soma += notas[i][j];\n        printf(\"Aluno %d: %.2f\\n\", i, soma / 3.0f);\n    }\n    return 0;\n}"
      },
      {
        "heading": "Soma de matrizes e diagonal",
        "body": "Para somar matrizes de mesmo formato, faça resultado[i][j] = a[i][j] + b[i][j]. Na diagonal principal de uma matriz quadrada, linha e coluna são iguais: a[i][i]. Ao passar uma matriz para função, a largura de cada linha precisa fazer parte do tipo do parâmetro, por exemplo int a[][3]. Não trate indiscriminadamente toda matriz como um int**: são representações diferentes."
      }
    ],
    "pitfall": "Esquecer de zerar a soma no começo de cada linha faz a média do próximo aluno incluir notas dos anteriores.",
    "recall": {
      "prompt": "Com sizeof(int) = 4, quanto ocupa int a[3][4]? Qual acesso representa a terceira linha, quarta coluna?",
      "answer": "48 bytes. O acesso é a[2][3]."
    }
  },
  {
    "id": "e01",
    "topic": "structs",
    "title": "Struct: um registro com campos",
    "page": 27,
    "minutes": 17,
    "summary": "Modele informações relacionadas de tipos diferentes e separe tipo de variável.",
    "objectives": [
      "Definir um tipo struct.",
      "Criar e inicializar uma variável desse tipo.",
      "Acessar campos com ponto."
    ],
    "sections": [
      {
        "heading": "Um nome para um conjunto de informações",
        "body": "Um aluno pode ter código, nome e nota. Cada informação é um campo, e os campos podem ter tipos diferentes; por isso struct é uma composição heterogênea. Um vetor de floats guarda valores do mesmo tipo; uma struct Aluno organiza informações relacionadas. Uma struct também pode ter todos os campos do mesmo tipo: “heterogênea” descreve sua capacidade de combinar tipos."
      },
      {
        "heading": "Definir o modelo não cria um aluno",
        "body": "struct Aluno { ... }; define o tipo. A declaração struct Aluno a; cria um objeto desse tipo. Com typedef struct { ... } Aluno, Aluno vira um apelido de tipo, permitindo escrever Aluno a;. Não esqueça o ponto e vírgula após a definição. O operador ponto seleciona um campo: a.nota ou a.nome.",
        "code": "#include <stdio.h>\ntypedef struct {\n    int codigo;\n    char nome[30];\n    float nota;\n} Aluno;\nint main(void) {\n    Aluno a = {7, \"Ana\", 8.5f};\n    a.nota = 9.0f;\n    printf(\"%d %s %.1f\\n\", a.codigo, a.nome, a.nota);\n    return 0;\n}"
      },
      {
        "heading": "Leitura e cópia dos campos",
        "body": "scanf(\"%d\", &a.codigo) precisa do endereço do campo inteiro. Para a.nome, use fgets(a.nome, sizeof a.nome, stdin) ou um %s com largura adequada, lembrando das quebras de linha pendentes. Structs do mesmo tipo podem ser copiadas por atribuição: b = a copia seus campos, inclusive arrays internos. Se houver um campo ponteiro, copia-se o endereço, não o objeto externo apontado."
      },
      {
        "heading": "O tamanho pode incluir preenchimento",
        "body": "O PDF simplifica o tamanho total como soma dos campos. Em C real, o compilador pode inserir padding entre campos e no final para respeitar alinhamento. Portanto, não conclua sizeof(struct) apenas somando tamanhos sem uma premissa explícita. Use sizeof a para conhecer o tamanho utilizado na implementação."
      }
    ],
    "pitfall": "A definição do tipo, sozinha, não declara uma variável para guardar os dados de uma pessoa. É necessário criar um objeto desse tipo.",
    "recall": {
      "prompt": "Qual é a diferença entre struct Data { int dia, mes, ano; }; e struct Data hoje;?",
      "answer": "A primeira define o tipo de registro. A segunda declara uma variável chamada hoje desse tipo."
    }
  },
  {
    "id": "e02",
    "topic": "structs",
    "title": "Structs aninhadas, vetores e ponteiros",
    "page": 28,
    "minutes": 18,
    "summary": "Combine os conceitos da NP2 em um pequeno cadastro de funcionários.",
    "objectives": [
      "Acessar um campo dentro de outra struct.",
      "Percorrer um vetor de registros.",
      "Usar -> através de um ponteiro para struct."
    ],
    "sections": [
      {
        "heading": "Uma informação também pode ser composta",
        "body": "O endereço de um funcionário contém rua e número. Esse endereço pode ser uma struct dentro de outra. Se f for um funcionário, f.endereco.numero acessa o número dentro do endereço. Cada ponto desce um nível. É possível combinar arrays, structs e structs aninhadas sem mudar essa lógica."
      },
      {
        "heading": "Um cadastro é um vetor de registros",
        "body": "Funcionario equipe[2] reserva dois registros completos. equipe[1].salario seleciona o salário do segundo. O exemplo mostra os dois nomes e números de endereço. Um índice escolhe o registro e os nomes escolhem os campos.",
        "code": "#include <stdio.h>\ntypedef struct { char rua[30]; int numero; } Endereco;\ntypedef struct {\n    char nome[30];\n    float salario;\n    Endereco endereco;\n} Funcionario;\nint main(void) {\n    Funcionario equipe[2] = {\n        {\"Ana\", 2000, {\"Rua A\", 10}},\n        {\"Beto\", 2500, {\"Rua B\", 20}}\n    };\n    for (int i = 0; i < 2; i++)\n        printf(\"%s: %d\\n\", equipe[i].nome, equipe[i].endereco.numero);\n    return 0;\n}"
      },
      {
        "heading": "Ponto para objeto; seta para ponteiro",
        "body": "Se Funcionario *p = &equipe[0], p->salario equivale a (*p).salario. Os parênteses são necessários nessa segunda forma, pois o ponto tem precedência maior que o asterisco unário. Uma função recebe Funcionario *p quando precisa alterar o registro original; se receber Funcionario f, recebe uma cópia do registro."
      },
      {
        "heading": "Integração com arquivos e listas",
        "body": "Um vetor de structs pode ser gravado com fwrite(equipe, sizeof equipe[0], 2, fp), verificando o retorno. Uma lista encadeada, citada como aplicação de ponteiros, usa nós com dados e um ponteiro para o próximo nó; NULL marca ausência de sucessor. Essa ideia não muda a regra de validade: não se acessa um nó por ponteiro inválido. Para a NP2, priorize o cadastro e os acessos a campos antes de aprofundar alocação dinâmica."
      }
    ],
    "pitfall": "p.campo é incorreto se p for um ponteiro para struct. Use p->campo ou (*p).campo.",
    "recall": {
      "prompt": "p aponta para equipe[1]. Como alterar o número do endereço desse funcionário para 90?",
      "answer": "p->endereco.numero = 90; ou (*p).endereco.numero = 90;."
    }
  },
  {
    "id": "n01",
    "topic": "np1",
    "title": "Base da NP1: programa, tipos e entrada/saída",
    "page": 45,
    "minutes": 18,
    "summary": "Reforce os fundamentos que aparecem dentro de praticamente todos os códigos da NP2.",
    "objectives": [
      "Identificar entrada, processamento e saída.",
      "Escolher formatos corretos para os tipos básicos.",
      "Validar uma leitura com scanf."
    ],
    "sections": [
      {
        "heading": "Um programa começa por uma tarefa clara",
        "body": "Divida o problema em entrada, processamento e saída. Para calcular uma média, as entradas são notas; o processamento é somar e dividir; a saída é o resultado. Um programa C hospedado usa main como ponto de entrada, normalmente int main(void) nos exercícios. #include <stdio.h> disponibiliza declarações de entrada e saída. C diferencia maiúsculas de minúsculas: nota e Nota são nomes diferentes."
      },
      {
        "heading": "Tipos e especificadores",
        "body": "int representa inteiros, float e double representam valores de ponto flutuante, e char representa caracteres/unidades de armazenamento de um byte. O tamanho exato de muitos tipos depende da implementação. No printf, use %d para int, %f para valores de ponto flutuante, %c para caractere, %s para string e %p com (void*) para endereço. No scanf, %f recebe float* e %lf recebe double*. Para size_t, use %zu."
      },
      {
        "heading": "Confira se a entrada foi aceita",
        "body": "O programa espera duas notas e só calcula quando as duas leituras foram bem-sucedidas. %.2f mostra duas casas decimais; não altera o valor armazenado. O & é necessário porque scanf grava nos objetos indicados pelos endereços.",
        "code": "#include <stdio.h>\nint main(void) {\n    float a, b;\n    if (scanf(\"%f %f\", &a, &b) != 2) {\n        puts(\"Entrada invalida\");\n        return 1;\n    }\n    printf(\"Media: %.2f\\n\", (a + b) / 2.0f);\n    return 0;\n}"
      },
      {
        "heading": "Constantes, bibliotecas e portabilidade",
        "body": "#define TAM 5 é substituição de texto pelo pré-processador, sem ponto e vírgula. const int limite = 5 cria um objeto de tipo definido que não pode ser modificado por esse nome. string.h declara funções de strings; math.h declara sqrt e pow; stdlib.h declara utilidades como exit e malloc. conio.h, getch e system(\"pause\") são detalhes de ambientes específicos, não requisitos de um programa C portátil."
      }
    ],
    "pitfall": "Em scanf, %f e %lf não são intercambiáveis: apontam para objetos de tipos e tamanhos possivelmente diferentes.",
    "recall": {
      "prompt": "Qual formato de scanf lê um double d? E qual argumento deve acompanhá-lo?",
      "answer": "scanf(\"%lf\", &d). O formato exige o endereço de um double."
    }
  },
  {
    "id": "n02",
    "topic": "np1",
    "title": "Operadores, divisão inteira e incrementos",
    "page": 52,
    "minutes": 20,
    "summary": "Resolva expressões em etapas e evite confundir atribuição, comparação e incremento.",
    "objectives": [
      "Aplicar precedência e associatividade.",
      "Distinguir divisão inteira e real.",
      "Acompanhar pré e pós-incremento em instruções separadas."
    ],
    "sections": [
      {
        "heading": "O tipo dos operandos decide a divisão",
        "body": "7 / 2 com inteiros resulta em 3; o resultado fracionário é descartado, com truncamento em direção a zero. Guardar depois esse 3 em float produz 3.0, não 3.5. Para divisão real, use 7.0 / 2 ou converta um operando para float/double. % calcula resto e exige operandos inteiros. Dividir por zero não é permitido para os exercícios de aritmética inteira."
      },
      {
        "heading": "Primeiro agrupe a expressão",
        "body": "Multiplicação, divisão e resto têm precedência maior que soma e subtração. Entre operadores dessa mesma categoria, o agrupamento é da esquerda para a direita. Assim, 6 / 2 + 11 % 3 * 4 resulta em 3 + 2 * 4 = 11. Parênteses mudam o agrupamento. Precedência não é uma regra geral de ordem temporal de avaliação dos operandos; evite efeitos colaterais misturados em uma expressão."
      },
      {
        "heading": "Pré e pós: qual valor a expressão produz?",
        "body": "a = i++ atribui a a o valor anterior de i e incrementa i. b = ++i incrementa i e produz o novo valor. Ao fim de cada instrução completa, o incremento já ocorreu. Não pense que o pós-incremento espera até a próxima linha começar para acontecer; o ponto importante é o valor produzido pela expressão.",
        "code": "#include <stdio.h>\nint main(void) {\n    int i = 3;\n    int a = i++;\n    int b = ++i;\n    int c = --i;\n    printf(\"%d %d %d %d\\n\", a, b, c, i);\n    return 0;\n}"
      },
      {
        "heading": "Atribuir não é comparar",
        "body": "x = 5 grava 5 em x e a expressão vale 5. x == 5 compara e produz 0 ou 1. x *= 2 + k equivale, para uma variável simples, a x = x * (2 + k), e não a x * 2 + k. Não treine saída única para expressões como i++ + ++i: em C elas têm modificações não sequenciadas do mesmo objeto e comportamento indefinido."
      }
    ],
    "pitfall": "float media = soma / quantidade; ainda faz divisão inteira se soma e quantidade forem inteiros. Converta um dos operandos antes de dividir.",
    "recall": {
      "prompt": "int i = 4; int a = i++; int b = ++i;. Quais os valores finais?",
      "answer": "a = 4, b = 6 e i = 6."
    }
  },
  {
    "id": "n03",
    "topic": "np1",
    "title": "Condições, lógica e switch",
    "page": 55,
    "minutes": 18,
    "summary": "Escolha caminhos de execução e reconheça atribuições acidentais e fall-through.",
    "objectives": [
      "Aplicar &&, || e !.",
      "Interpretar zero e valores não zero em condições.",
      "Acompanhar um switch com e sem break."
    ],
    "sections": [
      {
        "heading": "Condição falsa é zero",
        "body": "Em condições, zero é falso e qualquer valor não zero é verdadeiro. Operadores relacionais e lógicos produzem int com valor 0 ou 1. && exige as duas condições verdadeiras; || exige pelo menos uma; ! inverte o estado lógico. O C11 também dispõe de _Bool e do cabeçalho stdbool.h; a afirmação antiga de que C não possui tipo lógico precisa ser contextualizada."
      },
      {
        "heading": "Curto-circuito evita avaliações desnecessárias",
        "body": "Em a && b, b só é avaliado se a for verdadeiro. Em a || b, b só é avaliado se a for falso. Assim, divisor != 0 && valor / divisor > 2 evita a divisão quando divisor é zero. Entre os operadores lógicos, ! tem precedência maior que &&, que tem precedência maior que ||. Use parênteses para expressar sua intenção."
      },
      {
        "heading": "Uma cadeia de decisões",
        "body": "Em if/else if/else, a primeira condição verdadeira escolhe o bloco; as condições seguintes dessa cadeia não são testadas. Use chaves para tornar claro o alcance de cada decisão. else se associa ao if ainda sem else mais próximo. if (x = 5) atribui 5 e segue pelo ramo verdadeiro: um erro muito diferente de if (x == 5)."
      },
      {
        "heading": "switch entra em um rótulo e segue",
        "body": "switch usa uma expressão de tipo inteiro, incluindo char, e rótulos case com constantes inteiras distintas. break sai do switch. Sem break, a execução continua pelas instruções seguintes, mesmo sob outros rótulos. O default é opcional e atende valores sem case correspondente. A saída do exemplo é B C.",
        "code": "#include <stdio.h>\nint main(void) {\n    int opcao = 2;\n    switch (opcao) {\n        case 1: printf(\"A \"); break;\n        case 2: printf(\"B \");\n        case 3: printf(\"C \"); break;\n        default: printf(\"X \");\n    }\n    return 0;\n}"
      }
    ],
    "pitfall": "Um ; imediatamente após if(condicao) cria uma instrução vazia como corpo. O bloco seguinte pode acabar executando independentemente da condição.",
    "recall": {
      "prompt": "Qual é o resultado de !0 || 0 && 1? O lado direito de || precisa ser avaliado?",
      "answer": "O resultado é 1. !0 já é verdadeiro, então o curto-circuito de || dispensa avaliar o lado direito."
    }
  },
  {
    "id": "n04",
    "topic": "np1",
    "title": "Laços e teste de mesa para a prova",
    "page": 59,
    "minutes": 22,
    "summary": "Compare while, do-while e for e acompanhe variáveis em cada repetição.",
    "objectives": [
      "Identificar quando a condição é testada.",
      "Rastrear contador e acumulador.",
      "Reconhecer laço vazio, break e continue."
    ],
    "sections": [
      {
        "heading": "O momento do teste faz diferença",
        "body": "while testa antes do corpo e pode executar zero vezes. do-while testa depois e executa o corpo ao menos uma vez quando o controle chega ao laço. for executa a inicialização uma vez, testa a condição, executa o corpo, faz a atualização e volta ao teste. A forma do laço não determina sozinha se ele terminará: a condição precisa ser alcançada ou existir uma saída."
      },
      {
        "heading": "Faça uma linha da tabela por iteração",
        "body": "Registre o contador ao entrar, a soma depois da atualização e a saída impressa. No exemplo, as linhas são 0/0, 1/1, 2/3, 3/6 e 4/10. Ao sair, i vale 5 e total vale 10. O printf após o laço usa esse estado final, não os valores da última impressão interna.",
        "code": "#include <stdio.h>\nint main(void) {\n    int total = 0, i;\n    for (i = 0; i < 5; i++) {\n        total += i;\n        printf(\"i=%d total=%d\\n\", i, total);\n    }\n    printf(\"Fim: i=%d total=%d\\n\", i, total);\n    return 0;\n}"
      },
      {
        "heading": "break e continue têm alvos específicos",
        "body": "break termina o laço ou switch mais interno que o contém; não encerra automaticamente o programa. continue pula o restante da iteração do laço mais interno. No for, segue para a atualização; no while e no do-while, segue para o teste. Um continue colocado antes da atualização manual de um contador em while pode impedir o progresso do laço."
      },
      {
        "heading": "Procure os pequenos sinais",
        "body": "for (i=0; i<5; i++); tem corpo vazio por causa do ponto e vírgula final. O comando seguinte executa depois, normalmente com i = 5. As três partes do for podem ser omitidas, mantendo os dois pontos e vírgulas; for(;;) não possui condição de parada própria. Antes de resolver uma questão, marque chaves, pontos e vírgulas, limites dos índices e posição do printf."
      },
      {
        "heading": "Um método de estudo ativo",
        "body": "Antes de executar, escreva a saída esperada. Depois rode e compare a primeira linha que divergiu. Explique o motivo do erro com suas palavras e refaça o exercício com outros valores. Nos simulados, resolva sem consultar o gabarito, revise as justificativas e retorne ao tema dos erros. As prioridades do PDF orientam o estudo, mas não garantem quais questões estarão na avaliação."
      }
    ],
    "pitfall": "i < N e i <= N não executam a mesma quantidade de vezes. Confira o valor inicial e conte os valores que realmente satisfazem a condição.",
    "recall": {
      "prompt": "Quantas vezes roda for (int i = 1; i < 5; i++)? Quais os valores de i dentro do corpo?",
      "answer": "Quatro vezes, com i igual a 1, 2, 3 e 4."
    }
  }
];
