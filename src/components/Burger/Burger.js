import React from 'react';
import BurgerIngredientFactory from './BurgerIngredient/BurgerIngredient';
import './Burger.css';
import EmptyDropZone from './EmptyDropZone/EmptyDropZone';

const Burger = (props) => {
    const BurgerIngredient = BurgerIngredientFactory(props.drag)
    let content = props.drag ? <EmptyDropZone /> : null;
    if (props.ingredients.length) {
        content = props.ingredients.map((ingredient, i) => (
            <BurgerIngredient
                moveIngredient={props.moveIngredient}
                price={ingredient.price}
                removeIngredient={props.removeIngredient}
                key={ingredient + i}
                index={i}
                type={ingredient.type} />
        ));
    }

    return (
        <div className="burger">
            <h3 style={{ textAlign: 'center' }}>Burger </h3>
            <BurgerIngredient type="breadTop" disableDragging={true} />
            {content}
            <BurgerIngredient type="breadBottom" disableDragging={true} />
        </div>
    )
}

export default Burger;