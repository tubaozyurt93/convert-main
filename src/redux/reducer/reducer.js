const initialState = {
    user: null,
    rate: null,
    money: [],
    list: [],
    listItem: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER':
            return {
                ...state,
                user: action.payload.user
            }
        case 'GET_CONVERSION_RATE':
            return {
                ...state,
                rate: action.payload
            }
        case 'CHANGE_CURRENCY':
            console.log(action.rate)
            return {
                ...state,
                money: [...state.money, { ...action.payload }],
                list: [...state.list, { ...action.payload }]
            }
        case 'GET_LIST':
            return {
                ...state,
                listItem: [...state.listItem, action.payload]
            }

        default:
            return state
    }
}

export default reducer