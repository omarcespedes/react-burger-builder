import React , { Component } from 'react';
import Order from './../../components/Order/Order';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';

class Orders extends Component {

    state = {
        orders: []
    }

    componentWillMount() {
        this.props.fetchOrders();
    }

    render() {
        const orders = this.props.orders.map(order => {
            return <Order order={order} key={order.id} />
        });
        return orders;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(actions.fetchOders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);