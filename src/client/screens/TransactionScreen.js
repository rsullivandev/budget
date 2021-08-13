import React from 'react'

export default class TransactionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: []
        }
    }


    render() {
        return (
            <div>
                <h3>This is the Transaction Screen</h3>
                <p>In the future, you will be able to view and categorize inbound transactions</p>
            </div>
        )
    }
}
