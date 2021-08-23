using System;
using System.ComponentModel.DataAnnotations.Schema; //Import em dataAnnotations.schema para dar nome as tabelas e colunas do jeito que for necessário

namespace CrudFilmes.Model //Namespace onde está localizado a classe
{
    [Table("Filmes")] //Indicando nome da tabela no banco de dados
    public class Filme
    {
        [Column("Id")]//indicando nome da coluna no banco de dados
        public int Id { get; set; } //Propriedade declarada conforme requisito do sistema

        [Column("Nome")]
        public string Nome { get; set; }

        [Column("Data de criação")]
        public string DataCriacao { get; set; }

        [Column("Ativo")]
        public Boolean Ativo { get; set; }


        [Column("Gênero")]
        public string Genero { get; set; }

    }
}
