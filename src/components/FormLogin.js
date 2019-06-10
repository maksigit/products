import React, {Component} from 'react';
import {connect} from 'react-redux';

class FormLogin extends Component {

    state = {
        loginInput: null,
        passInput: null
    };

    setToLS = (token) => {
        localStorage.setItem('token', 'Bearer ' + token)
    };

    getLogin = () => {
        console.log('email:', this.state.loginInput.value);
        console.log('password:', this.state.loginInput.value);
        fetch('https://gentle-escarpment-19443.herokuapp.com/v1/users/auth', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.loginInput.value,
                password: this.state.passInput.value,
            })

        }).then(res=>res.clone().json()).then((values) => {
            console.log('second then',values);
            this.setToLS(values.access_token);
            window.location = 'products'
        })
    };

    render() {
        return (
            <div className='wrap-form-login'>
                <input type="text" ref={(input) => {this.state.loginInput = input}}/>
                <input type="text" ref={(input) => {this.state.passInput = input}}/>

                <button onClick={this.getLogin}>Log In</button>
            </div>
        )
    }
}

export default connect(
    state => {
        console.log('store ', state);
        return ({
            testStore: state
        })
    },
    dispatch => {
        return ({
            onAddTask: (task) => {
                dispatch({type: 'ADD_TASK', payload: task})
            },
        })
    }
)(FormLogin);
