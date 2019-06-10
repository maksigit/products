export function rPosts(state = [], action) {
    // const item = {id: i++, title: action.payload, completed: false};
    if (action.type === 'ADD_TOKEN') {
        return [
            ...state,
            action.payload,
        ];
    } else if (action.type === 'SET_TODO') {
        return [
            ...state,
            action.payload,
        ];
    } else {
        return state
    }
}