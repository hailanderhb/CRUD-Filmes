import React, { Component } from 'react';//importei react para usar o react

export class Filme {//Criacao da classe já exportando, com constructor com todas as propriedades passadas lá no model filme
    constructor() {
        this.id = 0;
        this.nome = "";
        this.datacriacao = "";
        this.ativos = true;
        this.genero = "";
    }
}
/*
export class Genero { //Criacao da classe já exportando, com constructor com todas as propriedades passadas lá no model  genero
    constructor() {
        this.id = 0;
        this.nome = "";
        this.datacriacao = "";
        this.ativos = true;
    };
}
*/
export class AddFilme extends Component { //uma classe add filmes com construtor contendo as props e o super props, indicando o state inicial para cada elemento
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            filme: new Filme(),
            loading: true
        };
        this.intialize();

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }


    async intialize() { //toda vez que chamar esse intialize, vai ser verificado os parametros do Id e ter uma condição if else para editar o filme ou para criar o filme, dependendo se houver id >0  

        //? indica se tiver o id> 0 ( ou seja, existir) ele carrega os dados do banco

        var id = this.props.match.params["id"];
        if (id > 0) {
            const response = await fetch('api/Filmes/' + id); //await pra aguarda e fetch para chamar api/Filmes significa que estou chamando o controllers com o metodo GetFilmes() e então fazendo algo com os dados do Id que já existe
            const data = await response.json();
            this.setState({ title: "Edição do filme", filme: data, loading: false });
        }//Indicando que filmes irá receber os dados e o loading será falso
        else {//Se não ele mostra create e inicia um novo
            this.state = { title: "Cadastrar um novo filme", filme: new Filme(), loading: false };
        }
    }
    //metodo para criar em cima do grid da tela com info de um novo filme ou  carregando dados ou outra mensagem qualquer
    //criando variavel content para receber o stado do loading
    //mostrando a renderização da tabela filmes
    //renderizando um pouco de html na tela
    //Toda vez que chamar o render vai criar um form
    render() {
        let content = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return (
            <div>
                <h1>{this.state.title}</h1>

                {content}

            </div>
        );
    }
    //chamei o contents para mostrar o estado loading
    //

    async handleSave(event) {//metodo que salva o filme criado após o formulário quando houver o click no salvar, usei async await para poder atualizar a tela em tempo de execução sem precisar dar f5
        event.preventDefault();

        const data = new FormData(event.target);

        if (this.state.filme.id) {//se houver algum id, o metodo put junto com o state, id e os dados sao empurrados para a atualização do filme
            const response1 = await fetch('api/Filmes/' + this.state.filme.id, { method: 'PUT', body: data });
            this.props.history.push('/page-filme');
        }
        else {//se não houver nenhum id, o metodo post junto com o id e os dados sao empurrados para a criaçãoo de um filme
            const response2 = await fetch('api/Filmes/', { method: 'POST', body: data });
            this.props.history.push('/page-filme');
        }
    }

    handleCancel(event) {//o metodo que cancela a criação/edição de um filme
        event.preventDefault();
        this.props.history.push('/page-filme');
    }

    renderCreateForm() {//criando formulario com id, nome, data de criação, genero e se esta ativo
        return (
            <form onSubmit={this.handleSave}>
                <div className="form-group row">
                    <input type="hidden" name="id" value={this.state.filme.id} />
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <label> Nome do filme:<input className="form-control" type="text" name="nome" defaultValue={this.state.filme.nome} required /></label>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <label> Data de lançamento: <input className="form-control" type="text" name="datacriacao" defaultValue={this.state.filme.dataCriacao} required /></label>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <label> Gênero: <input className="form-control" type="text" name="genero" defaultValue={this.state.filme.genero} required /></label>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <label> Disponível: <input type="text" name="ativo" defaultValue={this.state.filme.ativos} required/></label>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary" value={this.state.filme.id}>Salvar</button> &nbsp;
                    <button className="btn btn-danger" onClick={this.handleCancel}>Cancelar</button>
                </div>

                <div>
                    <img className="d-flex justify-content-center" src={require('../assets/harry-potter.jpg')} />
                </div>

            </form>

        );
    }



}
