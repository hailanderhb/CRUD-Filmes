import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { PageFilme } from './components/PageFilme';
import { AddFilme } from './components/AddFilme';
import './custom.css';

export default class App extends Component {
    static displayName = App.name;

    render () {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/page-filme' component={PageFilme} />
                <Route path='/add-filme' component={AddFilme} />
                <Route path='/filme/edit/:id' component={AddFilme} />


            </Layout>
            );
    }
}
