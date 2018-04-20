import React from 'react';
import './Order.css';

const order = (props) => {
    const ingredients = {};
    for (let i = 0 ; i < props.order.ingredients.length; i++) {
        let ingredientType = props.order.ingredients[i].type;
        ingredients[ingredientType] = ingredients[ingredientType] || 0;
        ingredients[ingredientType] = ingredients[ingredientType] + 1;
    }

    const ingredientList = Object.keys(ingredients).map(ingredient => {
        return <li key={ingredient}>{ingredient}: {ingredients[ingredient]}</li>
    });
    
    return (
        <div className="order">
            <span> Ingredients </span>
            <ul>
                {ingredientList}         
            </ul>        
        </div>
    );
}

export default order;