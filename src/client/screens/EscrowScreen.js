import React from 'react'

export default class EscrowScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: []
        }
    }


    render() {
        return (
            <div>
                <h3>This is the Escrow Screen</h3>
                <p>In the future, you will be able to view escrow balance and associated expenses</p>
            </div>
        )
    }
}
