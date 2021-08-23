using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CrudFilmes.Model
{
    [Table("Gênero")]//indicando nome da Tabela no bd
    public class Genero
    {
        [Column("Id")]//indicando nome da coluna no bd
        public int Id { get; set; }

        [Column("Nome")]
        public string Nome { get; set; }

        [Column("Data de criação")]
        public string DataCriacao { get; set; }

        [Column("Ativo")]
        public bool Ativo { get; set; }

    }
}
