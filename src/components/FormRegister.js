import React, {Component} from 'react';
import {connect} from 'react-redux';

class FormRegister extends Component {

    state = {
        name: null,
        surname: null,
        email: null,
        phone: null,
        password: null,
    };

    showValue = () =>  {
        console.log('ggg', this.state.name.value);
    };

    getRegister = () => {
        fetch('https://lectorium.herokuapp.com/api/registration', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.name.value,
                surname: this.state.surname.value,
                email: this.state.email.value,
                phone: this.state.phone.value,
                password: this.state.password.value,
            })

        }).then(res=>res.clone().json()).then((values) => {
            console.log('second then',values.token);
            this.props.getToken(values.token);
        })
    };

    render() {
        return (
            <div className='wrap-form-register'>
                <label> Name
                <input type="text" ref={(input) => {this.state.name = input}}/>
                </label>
                <label> SurName
                <input type="text" ref={(input) => {this.state.surname = input}}/>
                </label>
                <label> Email
                <input type="text" ref={(input) => {this.state.email = input}}/>
                </label>
                <label> Phone
                <input type="text" ref={(input) => {this.state.phone = input}}/>
                </label>
                <label> Password
                <input type="text" ref={(input) => {this.state.password = input}}/>
                </label>
                <button onClick={this.getRegister}>Log In</button>
                <button onClick={this.showValue}>show</button>
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
            getToken: (token) => {
                dispatch({type: 'ADD_TOKEN', payload: token})
            },
        })
    }
)(FormRegister);