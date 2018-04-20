import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: [],
    selectedIngredients: [],
    error: false,
    totalPrice: 4
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                selectedIngredients: state.selectedIngredients.concat(action.ingredient),
                totalPrice: state.totalPrice + action.ingredient.price
            }
        case actionTypes.MOVE_INGREDIENT:
            let config = action.ingredient;
            let dragIndex = action.dragIndex;
            let hoverIndex = action.hoverIndex;
            let dragIngredient = state.selectedIngredients[dragIndex];
            let newPrice = state.totalPrice;

            let newIngredients = [...state.selectedIngredients];

            if (newIngredients.length === dragIndex) {
                dragIngredient = config;
                newPrice = state.totalPrice + config.price;
            } else {
                newIngredients.splice(dragIndex, 1);
            }

            newIngredients.splice(hoverIndex, 0, dragIngredient);

            return {
                ...state,
                selectedIngredients: newIngredients,
                totalPrice: newPrice
            }

        case actionTypes.REMOVE_INGREDIENT:
            const index = action.index;
            newIngredients = [...state.selectedIngredients];

            if(newIngredients.length) {
                newPrice = state.totalPrice - newIngredients[index].price;
                newIngredients.splice(index, 1);
                
                return {
                    ...state,
                    selectedIngredients: newIngredients,
                    totalPrice: newPrice
                }
            } else {
                return state;
            }
        case actionTypes.FETCH_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                selectedIngredients: [],
                totalPrice: 4,
                error: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }

        default:
            return state;
    }
}

export default reducer;