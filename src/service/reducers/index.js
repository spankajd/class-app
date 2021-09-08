
const initialState = {
    sharedList: [],
    lang: 'en'
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_SHARED_LIST':
            return {
                ...state,
                sharedList: action.payload
            };
        case 'UPDATE_LANGUAGE':
            return {
                ...state,
                lang: action.payload
            };
        default:
            return state;
    }
};

