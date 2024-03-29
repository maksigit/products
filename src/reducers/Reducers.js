function getTokenFromLS() {
    return localStorage.getItem('token')
}

function addItem(temp, obj) {
    console.log('temp2', temp);
    fetch('https://gentle-escarpment-19443.herokuapp.com/v1/articles', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getTokenFromLS()
        },
        body: JSON.stringify(obj)
    }).then(res => res.json())
        .then(products => console.log('add =>', products))
}

function editItem(temp, obj) {
    console.log('edit', obj);
    fetch('https://gentle-escarpment-19443.herokuapp.com/v1/articles/' + obj.group_id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getTokenFromLS()
        },
        body: JSON.stringify(obj)
    })
        // .then(res => res.json())
        // .then(products => console.log('edit =>', products))
}

function removeItem(temp, id) {
    return temp.map(function (item) {
        if (item.id === id) {
            item.status = 0;
            fetch('https://gentle-escarpment-19443.herokuapp.com/v1/articles/' + id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': getTokenFromLS()
                },
                body: JSON.stringify({status: 0})
            }).then(res => res.json())
                .then(products => console.log('DEL', products))
        }
        return item
    })

    // return temp.filter(item => id !== item.id);
}

function toLoad(temp, obj=[]) {
    console.log(temp);
    console.log(obj);
    return [...obj];
}

export function rPosts(state = [], action) {

    if (action.type === 'REMOVE_ITEM') {
        return removeItem(state, action.payload)
    } else if (action.type === 'LOAD_PRODUCTS') {
        return toLoad(state, action.payload);
    } else if (action.type === 'ADD_ITEM') {
        return addItem(state, action.payload);
    } else if (action.type === 'EDIT_ITEM') {
        return editItem(state, action.payload);
    } else {
        return state
    }
}
