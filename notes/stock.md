<!-- Need to translate and convert that to .md -->

deixando na mesma tabela evita usar um monte de joins na hora de fazer uma busca
em tabelas muito grandes, pode ser um "peso extra" se não for um dado consultado com frequência

criando uma tabela diferente acaba contribuindo para os padrões de normalização. Além disso fica mais flexível pra futuras mudanças (por exemplo, se eu tiver um estoque em uma loja e outro em outra). Por outro lado, vai precisar de joins dependendo da busca que for feita, deixando os selects mais complexos

normalmente se cria uma nova tabela quando se trata de uma entidade nova com vários relacionamentos, mas nesse caso seria só um número de estoque (na real não mais)

desnormalizado (tudo junto) é mais usado quando os dados não são atualizados com frequência (o que não é fato pra um estoque (att na compra, att na criação, att em devolução, att em reestoque)

RESUMO: como não se trata apenas de um número, optei por criar uma tabela separada. Dessa forma posso lidar com as questões de estoque sem afetar a tabela com os produtos. Além disso, caso haja alguma mudança na forma com o qual o estoque é controlado (ou, por exemplo, adicionar campos pra diferentes franquias, ou uma tabela de franquias e colocar uma FK de cod da franquia) fica mais fácil (ou seja, mais escalável).
Além disso, a desnormalização é mais usada quando os dados não são muito atualizados, o que não é verdade para um estoque.

- mexer nos erros
- colocar as anotações do repo
- tirar o campo do DB
