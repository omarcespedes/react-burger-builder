import * as actionTypes from './actions';

const initialState = {
    ingredients: [],
    selectedIngredients: [],
    totalPrice: 4
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            
            break;
    
        default:
            return state;
    }


    return state;
}

export default reducer;