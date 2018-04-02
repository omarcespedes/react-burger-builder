import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DraggableIngredients from '../../components/Burger/DraggableIngredients/DraggableIngredients';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import './BurgerBuilder.css';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../burger-axios';


const Fragment = React.Fragment;

class BurgerBuilder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ingredients: [],
            selectedIngredients: [],
            totalPrice: 3,
            purchasing: false
        };
    }

    componentWillMount() {
        axios.get('/ingredients.json').then( response => {
            let ingredients = [];
            for (let ingredientName in response.data) {
                ingredients.push({
                    type: ingredientName,
                    price: response.data[ingredientName]
                })
            }
            this.setState({
                ingredients: ingredients
            })
        }).catch(()=> {
            console.log('something went wrong')
        })
    }

    removeIngredient = (index) => {
        const newIngredients = [...this.state.selectedIngredients];
        const oldPrice = this.state.totalPrice;
        let newPrice = oldPrice - newIngredients[index].price;

        newIngredients.splice(index, 1);
        this.setState({
            selectedIngredients: newIngredients,
            totalPrice: newPrice
        })
    }

    purchaseOrder = () => {
        this.setState({
            purchasing: true
        })
    }

    cancelOrder = () => {
        this.setState({ purchasing: false });
    }

    continueOrder = () => {
        this.props.history.push({
            pathname: '/checkout',
            state: {
                ingredients: this.state.selectedIngredients
            }
        });
    }

    moveIngredient = (dragIndex, hoverIndex, config) => {
        const totalPrice = this.state.totalPrice;
        const { selectedIngredients } = this.state;
        let dragIngredient = selectedIngredients[dragIndex];
        let newPrice = totalPrice;

        const newIngredients = [...this.state.selectedIngredients];

        if (newIngredients.length === dragIndex) {
            dragIngredient = config;
            newPrice = totalPrice + config.price;
        } else {
            newIngredients.splice(dragIndex, 1);
        }

        newIngredients.splice(hoverIndex, 0, dragIngredient);

        this.setState({
            selectedIngredients: newIngredients,
            totalPrice: newPrice
        });
    }

    addIngredient = (config) => {
        const newIngredients = [...this.state.selectedIngredients];
        newIngredients.push(config);

        this.setState({
            selectedIngredients: newIngredients,
            totalPrice: this.state.totalPrice + config.price
        })
    }

    render() {
        return (
            <Fragment>
                <Modal show={this.state.purchasing} closeModal={this.cancelOrder}>
                    <OrderSummary
                        continueOrder={this.continueOrder}
                        cancelOrder={this.cancelOrder}
                        ingredients={this.state.selectedIngredients} />
                </Modal>
                <div className="burger-container">
                    <Burger
                        drag
                        ingredients={this.state.selectedIngredients}
                        moveIngredient={this.moveIngredient}
                        removeIngredient={this.removeIngredient}
                    />
                    <DraggableIngredients
                        ingredients={this.state.ingredients}
                        listCount={this.state.selectedIngredients.length}
                        removeIngredient={this.removeIngredient}
                        addIngredient={this.addIngredient}
                    />
                </div>
                <div className="burger-controls">
                    <p> <b>Total Price:</b> {this.state.totalPrice.toFixed(2)} Bs. </p>
                    <button className="order-btn" onClick={this.purchaseOrder}>Order Now</button>
                </div>
            </Fragment>
        );
    }
}

export default DragDropContext(HTML5Backend)(BurgerBuilder);