using CrudFilmes.Model;
using Microsoft.EntityFrameworkCore;

namespace CrudFilmes.Configuracao
{
    public class Contexto : DbContext //Criando a classe contexto responsável pela conexão com o banco de dados e herdando tudo de dbContext
    {
        public Contexto(DbContextOptions<Contexto> options): base(options) //metodo construtor de contexto herdando como base options
        {
            Database.EnsureCreated();//com a devida classe e constructor agora posso utilizar o database.EnsureCreated() que inicia um banco de dados no Sqlserver conforme roda a aplicação, para não precisar criar no bd com sql
        }

        public DbSet<Filme> Filme { get; set; } //Indicando para o entity qual objeto/tabela que queremos criar e utilizar os inserts, select, delete
        //Daqui eu vou no startup configurar a minha conexão string
        public DbSet<Genero> Genero { get; set; } //indicando uma segunda tabela no db
    }
}
