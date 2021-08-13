import React from 'react'

export default class GoalScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: []
        }
    }


    render() {
        return (
            <div>
                <h3>This is the Goal Screen</h3>
                <p>In the future, you will be able to maintain and track various financial goals</p>
            </div>
        )
    }
}
