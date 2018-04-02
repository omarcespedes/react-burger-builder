import React , { Component } from 'react';
import axios from './../../burger-axios';
import Order from './../../components/Order/Order';

class Orders extends Component {

    state = {
        orders: []
    }

    componentWillMount() {
        axios.get('/orders.json').then(response => {
            const fetchedOrders = [];
            for ( let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            }
            this.setState({
                orders : fetchedOrders
            });
        }).catch(err => {
            console.log('something went wrong');
        })
    }

    render() {
        const orders = this.state.orders.map(order => {
            return <Order order={order} key={order.id} />
        });
        return orders;
    }
}

export default Orders;