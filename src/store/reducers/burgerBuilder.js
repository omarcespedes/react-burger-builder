import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../util';

const initialState = {
    ingredients: [],
    selectedIngredients: [],
    error: false,
    totalPrice: 4
}

const addIngredient = (state, action) => {
    return  updateObject(state, {
        selectedIngredients: state.selectedIngredients.concat(action.ingredient),
        totalPrice: state.totalPrice + action.ingredient.price
    })
}

const moveIngredient = (state, action) => {
    let config = action.ingredient;
    let dragIndex = action.dragIndex;
    let hoverIndex = action.hoverIndex;
    let dragIngredient = state.selectedIngredients[dragIndex];
    let newPrice = state.totalPrice;

    let newIngredients = state.selectedIngredients.concat();

    if (newIngredients.length === dragIndex) {
        dragIngredient = config;
        newPrice = state.totalPrice + config.price;
    } else {
        newIngredients.splice(dragIndex, 1);
    }

    newIngredients.splice(hoverIndex, 0, dragIngredient);

    return updateObject(state, {
        selectedIngredients: newIngredients,
        totalPrice: newPrice
    });
}

const removeIngredient = (state, action ) => {
    let newPrice;
    const index = action.index;
    let newIngredients = state.selectedIngredients.concat();

    if(newIngredients.length) {
        newPrice = state.totalPrice - newIngredients[index].price;
        newIngredients.splice(index, 1);
        
        return updateObject(state, {
            selectedIngredients: newIngredients,
            totalPrice: newPrice
        })
    } else {
        return state;
    }
}

const fetchIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        selectedIngredients: [],
        totalPrice: 4,
        error: false
    });
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {
        error: true
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
        case actionTypes.MOVE_INGREDIENT: return moveIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
        case actionTypes.FETCH_INGREDIENTS: return fetchIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action)
        default: return state;
    }
}

export default reducer;