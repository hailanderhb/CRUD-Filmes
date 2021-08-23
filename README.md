# CRUD-Filmes
Um crud de filmes utilizando c#, entity framework, react e sqlserver express.

É um projeto de primeiro contato com React, mas vamos lá.
Fiz utilização do visual studio 2019 para codificação em C# para criar os models(responsável de modelar a minha classe filme conforme a estrutura da tabela/colunas 
do banco de dados, inclusive utilizei o data annotation schema para gerar um nome mais conveniente para determinadas colunas),criei o controller (responsável de dizer o que 
fazer com determinada requisição, seja ela, GET, POST, PUT ou DELETE, a regra de negócio) e o context (que acabei chamando de contexto... Que é o responsável em dizer pro 
entity framework criar um banco de dados de forma "automática" conforme roda a aplicação usando o dbcontext e quais tabelas criar conforme parametros dos models. Contudo tive que adicionar na startup.cs do projeto o addbdcontext para dizer para a aplicação que iria usar o sqlserver e a defaultconnection que por sí fica no arquivo appsetting). 
Apartir daí criei o Pagefilmes.js em react (importando o react para poder utilizar o react e toda sua forma de componentização e também o router dom para controle de rotas). Contudo deixei muitos comentários no código para fixação.
<div>
  <img align="center" alt="hailander-Js" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg">
  <img align="center" alt="hailander-Csharp" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg">
  <img align="center" alt="hailander-sql" height="32" width="42" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain-wordmark.svg">
</div>

Ah! E no banco de dados eu usei o docker version 19.03.12, build 48a66213fe
Obtive a imagem do SQL Server express atravé do comando: "docker pull mcr.microsoft.com/mssql/server"
Rodei o sql server com: "docker run --name sqlserver -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=1q2w3e4r@#$" -p 1433:1433 -d mcr.microsoft.com/mssql/server"
E minha connection string ficou:  "DefaultConnection": "Data Source=localhost;Initial Catalog=FilmesDesafio;Integrated Security=False;User ID=sa;Password=1q2w3e4r@#$;Connect Timeout=15;Encrypt=False;TrustServerCertificate=False"

Por curiosidade... Foi nesse default connection que eu defini o nome do primeiro bd criado pelo dbcontext.. "FilmesDesafio" caso queiram mudar.

