using CrudFilmes.Configuracao; //importando a configuração/contexto responsavel pela interface com o banco de dados
using CrudFilmes.Model; //importando os models
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; //Importando entity para comunicação
using System.Collections.Generic; //importando para utilizar ienumerable e demais features do system
using System.Linq;
using System.Threading.Tasks; //Importando thread para poder fazer Tasks

namespace CrudFilmes.Controllers
{
    [Route("api/[controller]")] //api/Filmes está chamando o controller Filmes que está setado logo abaixo para criar um bd caso não exista, assim gerando um ienumerable (listagem simples)
    [ApiController]
    public class FilmesController : ControllerBase
    {
        private readonly Contexto _context; //privando o _context para somente ser lido
        public FilmesController(Contexto context) //Construtor do contexto indicando que _context absorve context.
        {
            _context = context;
        }

        //na requisição Get teremos uma saida na url de:  api/Filmes
        [HttpGet] //indicando o get na resquisição http
        public async Task<ActionResult<IEnumerable<Filme>>> GetFilmes() //Função async para fazer uma pesquisa assincrona de um ienumerable (listagem simples) de tudo que é do model Filme
        {
            return await _context.Filme.ToListAsync(); //Retornando um await da task async poderia usar => (expression body) mas optei em deixar o codigo aberto.
        }
        //na requisição Get teremos uma saida na url de: api/Filmes/1 indicando o ID do fime listado na passagem por parâmetro via url
        [HttpGet("{id}")] //indicando que a passagem de parametro necessária para requisição é um inteiro  

        public async Task<ActionResult<Filme>> GetFilme(int id) //Função para fazer uma pesquisa assincrona de uma variavel filme dentro do model Filme
        {
            var filme = await _context.Filme.FindAsync(id); //declarando que o filme será pesquisado pelo ID através do _context.Filme e caso encontre tem um if logo abaixo para solucionar isso

            if (filme == null) //Se o filme for nulo eu retorno não encontrado.
            {
                return NotFound();
            }
            return filme; //Se houver algum filme eu retorno o filme.
        }

        //no PUT: api/Filmes/1
        [HttpPut("{id}")] //Indicando que deve utilizar o int como tipo de dados na requisição put.

        public async Task<IActionResult> PutFilme(int id, [FromForm]Filme filme)
        {
            if (id != filme.Id) //Se não houver o id solicitado entre os id de filmes retorna uma bad request.
            {
                return BadRequest();
            }

            _context.Entry(filme).State = EntityState.Modified; //#####

            try
            {
                await _context.SaveChangesAsync(); //um try para salvar mudanças (forma de tratamento de exceções).
            }
            catch (DbUpdateConcurrencyException) //caso ache a exceção concurrency ele age de forma a retornar o not found caso a comparação de errado (comparação de qualquer filme dentro do bd == o pesquisado)
            {
                if (!FilmeExists(id)) //Se a comparação de filme existente for falsa retorna not found.
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent(); //retorno nenhuma ação caso a mudança seja salva nos conformes
        }

        private bool FilmeExists(int id) //metodo que informa um booleano true ou false para os id pesquisados em comparação com ao colocado
        {
            return _context.Filme.Any(e => e.Id == id); //(comparação de qualquer filme dentro do bd == o pesquisado) de acordo com o Model filme 
        }

        //no metodo Post fica: api/Filme
        [HttpPost]
        public async Task<ActionResult<Filme>> PostFilme([FromForm]Filme filme)
        {
            _context.Filme.Add(filme); //adicionando um filme no contexto criado (model)
            await _context.SaveChangesAsync(); //await da request async salvando as informações no bd

            return CreatedAtAction("GetFilme", new { id = filme.Id }, filme); //retornando a criação na ação, adicionando filme.id do momento no id novo
        }

        //DELETE: api/Filme/1
        [HttpDelete("{id:int}")] //Em Delete necessita do ID para exclusão do filme no catalogo

        public async Task<IActionResult> DeleteFilme(int id)
        {
            var filme = await _context.Filme.FindAsync(id); //declarando variavel filme e dizendo que apos encontrar ela vai ter o id mencionado

            if (filme == null) //se não houver filme na requisição retorna Not found.
            {
                return NotFound();
            }

            _context.Filme.Remove(filme); //removendo o filme no contexto criado no inicio desse controller
            await _context.SaveChangesAsync(); //posteriormente salvando as alteraçoes


            return NoContent();//retorno nenhuma ação caso a mudança seja salva nos conformes

        }

    }
}
