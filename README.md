Passos para executar este projeto:

1. Executar o comando `yarn`
2. Definir as configurações do banco de dados no arquivo `ormconfig.json`
3. Executar `yarn typeorm migration:run`
4. Executar `yarn dev:server`

Rotas:

* `GET /create-categories` Cadastra 4 categorias no banco de dados: Node, Express, React, React Native
* `GET /create-post` Cadastra um post no banco de dados relacionado com as categorias Node e Express
* `GET /delete-relation` Remove o relacionamento do post com a categoria Node e mantém apenas a categoria Express
