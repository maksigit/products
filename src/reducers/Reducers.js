function removeItem(temp, id) {
    return temp.filter(item => id !== item.id);
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
    } else {
        return state
    }
}
