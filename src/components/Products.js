import React, {Component} from 'react';
import {connect} from 'react-redux';

class Products extends Component {

    getTokenFromLS = () => {
        return localStorage.getItem('token')
    };

    componentWillMount() {

        fetch('https://gentle-escarpment-19443.herokuapp.com/v1/articles?page=1&updated_after=1410403761', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.getTokenFromLS()
            }
        }).then(res => res.json())
            .then(jsonStr => this.setState({ list: jsonStr }))
            .then(data => console.log('1', this.state.list))
            // .then(jsonStr => this.setState({ apiInfo: jsonStr }))
            // .then(data => console.log('stattt', data))

            .then(data => {this.props.setTodo(this.state.list)})


        console.log('state =>', this.state)
    }

    render() {
        return (
            <div className='wrap-form-login'>
                {this.props.testStore.map(function (item, i, arr) {
                    return <div> {item.id} </div>
                })}
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
            setTodo: (todolist) => {
                dispatch({type: 'SET_TODO', payload: todolist})
            },
        })
    }
)(Products);
