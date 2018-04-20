import * as actionTypes from './actionTypes';
import axios from '../../burger-axios';

export const addIngredient = (ingredient) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredient: ingredient
    }
}

export const removeIngredient = (index) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        index: index
    }
}

export const moveIngredient = (dragIndex, hoverIndex, config) => {
    return {
        type: actionTypes.MOVE_INGREDIENT,
        dragIndex,
        hoverIndex,
        ingredient: config
    }
}

export const setIngredients = (ingredients, error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS,
        ingredients,
        error
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json').then( response => {
            let ingredients = [];
            for (let ingredientName in response.data) {
                ingredients.push({
                    type: ingredientName,
                    price: response.data[ingredientName]
                })
            }
            dispatch(setIngredients(ingredients));
        }).catch(()=> {
            dispatch(fetchIngredientsFailed());
        })
    }
}