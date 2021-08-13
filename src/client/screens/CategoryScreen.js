import React from 'react'

export default class CategoryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: []
        }
    }


    render() {
        return (
            <div>
                <h3>This is the Category Screen</h3>
                <p>In the future, you will be able to maintain budget categories for use in each monthly budget</p>
            </div>
        )
    }
}
