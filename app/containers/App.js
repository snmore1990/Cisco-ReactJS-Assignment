import React, {Component} from "react";
import * as constants from "./../constant"
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Home from './../components/Home';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    changeHandler(event){
        this.setState({
            [event.target.id]: event.target.value,
            validUser: false
        });
    }
    submitHandler(event){
        event.preventDefault();
        (this.state.username===constants.USERNAME && this.state.password===constants.PASSWORD) ? this.setState({validUser: true}) : '';
    }
    render(){
        return (
            <BrowserRouter>
                <Route exact path='/' render={()=> (<form className='login' onSubmit={this.submitHandler}>
                    <input type='text' id='username' placeholder='Username' onChange={this.changeHandler} />
                    <input type='password' id='password' placeholder='Password' onChange={this.changeHandler} />
                    
                    <input type='submit' value='Submit' />
                    <div>{this.state.validUser ? 'You are a valid user' : 'You are not a valid user'}</div>
                </form>)} />

                {this.state.validUser && <Redirect to='/home' />}

                <Route path='/home' component={Home} />
            </BrowserRouter>
        )
    }
}

export default App;