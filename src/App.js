import React, { Component } from 'react';
import './App.min.css';

class GameOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            description: "Loading ...",
        };
    }

    componentDidMount() {
        fetch("http://localhost:8000/" + this.props.assignedState)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        description : result.choice_description,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.assignedState != prevProps.assignedState) {
            this.setState({isLoaded: false, description : "Loading ...",});
            fetch("http://localhost:8000/" + this.props.assignedState)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            description : result.choice_description,
                        });
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error,
                        });
                    }
                );
        }
    }

    handleOnClick() {
        this.props.onClick(this.props.assignedState);
    }

    render() {
        let isDisabled = !this.state.isLoaded;
        return (
            <button className="btn-options"
                    disabled={isDisabled}
                    onClick={this.handleOnClick.bind(this)}>
                {this.state.description}
            </button>
        );
    }
}

class GameScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            description: "Loading data ...",
            choices: null,
            current_state: "INTRO0",
        };
    }

    componentDidMount() {
        fetch("http://localhost:8000/" + this.state.current_state)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        description : result.description,
                        choices : result.choices,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
    }

    onClickOption(response) {
        fetch("http://localhost:8000/" + response)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        description : result.description,
                        choices : result.choices,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
    }

    render() {
        let choices = [];
        for (let choice in this.state.choices) {
            choices.push(<GameOption key={choice}
                                     assignedState={this.state.choices[choice]}
                                     onClick={this.onClickOption.bind(this)}/>);
        }

        console.log(choices);

        return(
            <div className="game-panel">
                <div className="description-panel">{this.state.description}</div>
                <div className="options-panel">
                    {choices}
                </div>
            </div>
        );
    }
}

class InventoryItem extends Component {
    render() {
        return (<div className="inventory-item"><i className="fab fa-react"></i></div>);
    }
}

class Inventory extends Component {
    render(){
        return (
            <div className="inventory">
                <div className="inventory-title">INVENTORY</div>
                <div className="inventory-row">
                    <InventoryItem />
                    <InventoryItem />
                    <InventoryItem />
                </div>
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div>
                <GameScreen />
                <Inventory />
            </div>
        );
    }
}

export default App;
