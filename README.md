# CRUD-Filmes
Um crud de filmes utilizando c#, entity framework, react e sqlserver express.

É um projeto de primeiro contato com React, mas vamos lá.
Fiz utilização visual studio 2019 para codificação em C# para criar os models(responsável de modelar a minha classe filme conforme a estrutura da tabela/colunas do banco de dados, inclusive utilizei o data annotation 
schema para gerar um nome mais conveniente para determinadas colunas),criei o controller (responsável de dizer o que fazer com determinada requisição, seja ela, GET, POST, PUT
ou DELETE, a regra de negócio) e o context (que acabei chamando de contexto... Que é o responsável em dizer pro entity framework criar um banco de dados de forma "automática" 
conforme roda a aplicação usando o dbcontext e quais tabelas criar conforme parametros dos models. Contudo tive que adicionar na startup.cs do projeto o addbdcontext para dizer
para a aplicação que iria usar o sqlserver e a defaultconnection que por sí fica no arquivo appsetting). Apartir daí criei o Pagefilmes.js em react (importando o react e o 
react-router-dom para poder utilizar o react e toda sua forma de componentização e também o router dom para controle de rotas). Contudo deixei muitos comentários no código para
fixação.

