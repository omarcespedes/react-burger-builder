import React, { Component } from 'react';

class ContactData extends Component {
    state = {
        name: '',
        lastName: '',
        address: {
            street: '',
            zipCode: ''
        }
    }

    render() {
        return (
            <div>
                <h4>Enter your contact details </h4>
                <form>
                    <input type="text" placeholder="Enter your name" />
                    <input type="text" placeholder="Enter your last name" />
                    <input type="text" placeholder="Enter your street" />
                    <input type="text" placeholder="Enter your zipcode" />     
                    <button onClick={this.props.orderClicked}> Order </button>               
                </form>
            </div>
        )
    }
}

export default ContactData;