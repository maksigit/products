import React, {Component} from 'react';
import {connect} from 'react-redux';

class Products extends Component {

    state = {
        someText: null
    };

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
            .then(data => console.log('1', this.state.list));
            // .then(jsonStr => this.setState({ apiInfo: jsonStr }))
            // .then(data => console.log('stattt', data))

            // .then(data => {this.props.setTodo(this.state.list)})


        console.log('state =>', this.state)
    }

    render() {
        return (
            <div className='wrap-all-products'>
                {this.state.list != null ? this.state.list.map(function (item, i) {
                    return <div className='item'>
                        <div className='item-name'><span className='text'>Name: </span><span>{item.name}</span></div>
                        <div className='item-desc'><span className='text'>Desc: </span><span>{item.description}</span></div>
                        <div className='item-price'><span className='text'>Price: </span><span>{item.price}</span></div>
                    </div>
                }) : 'please wait'}
            </div>
        )
    }
}

export default connect(
    state => {
        console.log('state prod => ', state);
        return ({
            testStore: state
        })
    },
    dispatch => {
        return ({
            setSome: (todolist) => {
                dispatch({type: 'SET_SOME', payload: todolist})
            },
        })
    }
)(Products);
