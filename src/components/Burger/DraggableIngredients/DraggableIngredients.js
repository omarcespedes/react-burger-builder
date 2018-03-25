import React from 'react';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';

import './DraggableIngredients.css';

const draggableIngredients = (props) => (
    <div className="draggable-ingredients">
        <h3 style={{textAlign: 'center'}}>Ingredients </h3>
        {props.ingredients.map((ingredient, i) => (
            <BurgerIngredient
                index={props.listCount}
                price={ingredient.price}
                key={ingredient.type + i}
                type={ingredient.type}
                removeIngredient={props.removeIngredient}
                addIngredient={props.addIngredient}
            />
        ))}
    </div>
);

export default draggableIngredients;