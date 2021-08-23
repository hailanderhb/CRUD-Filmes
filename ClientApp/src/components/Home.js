import React, { Component } from 'react';


export class Home extends Component {
  static displayName = Home.name;

  render () {
      return (
          <div>
            <h1 className="d-flex justify-content-center" >Sistema de Armazenamento de Filmes</h1>
            <img className="d-flex justify-content-center" src={require('../assets/fundo-homepage.jpg')}/>
        
          </div>
    );
  }
}
