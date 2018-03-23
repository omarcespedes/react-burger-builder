import React from 'react';

const orderSummary = (props) => {
    const summaryIngredients = {};
    props.ingredients.forEach(ingredient => {
        summaryIngredients[ingredient.type] = summaryIngredients[ingredient.type] || 0;
        summaryIngredients[ingredient.type] = summaryIngredients[ingredient.type] + 1;
    })

    let ingredients = Object.keys(summaryIngredients).map(ing => (
        <li key={ing}>
            <span style={{textTransform: 'capitalize'}}>{ing}:</span>
            {summaryIngredients[ing]}
        </li>
    ));

    return (
        <React.Fragment>
            <h3>Your order is ... </h3>
            <ul>
                {ingredients}
            </ul>
            <p>Continue to checkout?</p>
            <button onClick={props.cancelOrder}>Cancel</button>
            <button onClick={props.continueOrder}>Continue</button>
        </React.Fragment>
    );
}

export default orderSummary;