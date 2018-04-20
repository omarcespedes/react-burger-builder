import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DraggableIngredients from '../../components/Burger/DraggableIngredients/DraggableIngredients';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import './BurgerBuilder.css';
import Modal from '../../components/UI/Modal/Modal';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';


const Fragment = React.Fragment;

class BurgerBuilder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            totalPrice: 3,
            purchasing: false
        };
    }

    componentDidMount() {
        this.props.initIngredients();
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
            pathname: '/checkout'
        });

    }

    render() {
        return (
            <Fragment>
                <Modal show={this.state.purchasing} closeModal={this.cancelOrder}>
                    <OrderSummary
                        continueOrder={this.continueOrder}
                        cancelOrder={this.cancelOrder}
                        ingredients={this.props.selIngs} />
                </Modal>
                <div className="burger-container">
                    <Burger
                        drag
                        ingredients={this.props.selIngs}
                        moveIngredient={this.props.onMoveIngredient}
                        removeIngredient={this.props.onRemoveIngredient}
                    />
                    <DraggableIngredients
                        ingredients={this.props.ings}
                        listCount={this.props.selIngs.length}
                        removeIngredient={this.props.onRemoveIngredient}
                        addIngredient={this.props.onAddIngredient}
                    />
                </div>
                <div className="burger-controls">
                    <p> <b>Total Price:</b> {this.props.price.toFixed(2)} Bs. </p>
                    <button className="order-btn" onClick={this.purchaseOrder}>Order Now</button>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        selIngs: state.burgerBuilder.selectedIngredients,
        price: state.burgerBuilder.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ing) => dispatch(actions.addIngredient(ing)),
        onRemoveIngredient: (index) => dispatch(actions.removeIngredient(index)),
        onMoveIngredient: (dragIndex, hoverIndex, config) => dispatch(actions.moveIngredient(dragIndex, hoverIndex, config)),
        initIngredients: () => dispatch(actions.initIngredients()),
        initPurchase: () => dispatch(actions.purchaseBurgerInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(BurgerBuilder));