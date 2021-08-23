import React, { Component } from 'react'; //importei react para usar o react

export class PageFilme extends Component { //criei uma classe que se extende do Component
    static displayName = "Filmes"; 

    constructor() { //Construtor
        super();

        this.state = { filmes: [], loading: true };
    }


    componentDidMount() { //criei um metodo para popular o array filmes[]
        this.popularFilmeData(); //vou construir esse metodo lá em baixo já já

    }

    static handleEdit(id) { //metodo para editar os filmes com referencia ao local da mudança via parametro
        window.location.href = '/filme/edit/' + id;
    }

    static handleDelete(id) { //metodo para editar os filmes com referencia ao local da mudança via parametro
        if (!window.confirm("Você deseja deletar o filme: " + id)) { //fazendo uma condicional para confirmação de exclusão do filme no bd, caso seja não simplesmente retorna nada, ou seja, não toma ação
            return;
        }
        else { //e caso seja confirmado, ele deleta o filme e após a exclusão ele redireciona a pagina com o alert de deletado com sucesso.
            fetch('api/filmes/' + id, { method: 'delete' })
                .then(json => {
                    window.location.href = "page-filme"; //page-filme é um redirect da page filme colocada lá no app.js
                    alert("Deletado com Sucesso!");
                })
        }
    }

    static renderFilmesTabela(filmes) { //método para criar a tabela no front caso encontre os conteudos no bd passando como parametro o array filmes encontrados

        return (
            <table className='table table-striped' aria-labelledby="tablelabel">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Genero</th>
                        <th>Data de Lançamento</th>
                        <th>Disponível</th>
                        <th></th>

                    </tr>
                </thead>

                <tbody >
                    {filmes.map(film =>
                        <tr key={film.id}>
                            <td>{film.id}</td>
                            <td>{film.nome}</td>
                            <td>{film.genero}</td>
                            <td>{film.dataCriacao}</td>
                            <td>{film.ativo}</td>
                            <td></td>
                            <td>
                                <button className="btn btn-primary" onClick={(id) => this.handleEdit(film.id)}>Editar</button> &nbsp;
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(film.id)}>Deletar</button>

                            </td>

                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
    //fiz uma tabela bem simples no html mesmo, fiz uso do map que é basicamente um foreach do c# para separar cada film por linha conforme o id
    //em cada botão eu fiz o uso dos metodos edit e delete para deletar o filme referente o id

    render() { //criando o metodo render responsavel por montar nosso front
        let content = this.state.loading
            ? <p><em> Carregando... </em> </p> // ? indica um if escondido e caso for true mostra carregando
            : PageFilme.renderFilmesTabela(this.state.filmes); //: indica a outra condição (else) se não for true o loading, mostra o conteudo renderizado da busca

        return (
            <div>
                <h1 className="d-flex justify-content-center" id="tablefilme">Listagem de Filmes</h1>

                {content}

            </div>
            // utilizei um link para cadastrar novos filmes.. e chamando o content true ou false, no caso se true.. aparece a msg carregando se não traz todo o conteudo encontrado
            );

    }


    async popularFilmeData() {
        const response = await fetch('api/Filmes'); //aqui eu to chamando o controller lá do filmesController(o que busca o ienumerable)
        const data = await response.json(); //a constante aguarda o response.json que veio da busca da linha de cima.
        this.setState({ filmes: data, loading: false}) //aqui eu seto o state indicando que filmes que é um array (mencionado no construtor) recebe todo o conteudo.json do ienumerable encontrado e informado que o state de loading mudou para false, para não mostrar mais a msg
    }
}