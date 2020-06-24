import React, {Component, useState} from "react";
import axios from 'axios';
import "./Todo.css";

class App extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            todo: [],
            error: null,
        };

        this.addItem = this.addItem.bind(this);
    }


    fetchData(){
        const endpoint  = "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list";
        fetch(endpoint)
            .then(response => response.json())
            .then(data =>
                this.setState({
                    todo: data,
                    isLoading: false,
                })
            )
            .catch(error => this.setState({ error, isLoading: false }));
    }

    componentDidMount() {
       this.fetchData();
    }

    addItem(e) {
        if (this._inputElement.value !== "") {
            var newItem = {
                title: this._inputElement.value,
                createAt: Date.now()
            };

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });

            this._inputElement.value = "";
        }

        console.log(this.state.items);

        e.preventDefault();
    }

    render() {
        const { isLoading, todo, error } = this.state;
        return (
            <React.Fragment>
                <h1 align="center">To do List</h1>
                {error ? <p>{error.message}</p> : null}
                <div className="header">
                    <form align="center" onSubmit={this.addItem}>
                        <input ref={(a) => this._inputElement = a} placeholder="Add Task">
                        </input>
                        <button type="submit">+</button>
                    </form>
                </div>
                <br />
                {!isLoading ? (
                    todo.map(todo => {
                        const { id, title, description, status, createdAt } = todo;
                        return (
                            <div align="left" type="button" onClick={this.detail} className="button1">
                                {title}
                            </div>
                        );
                    })
                ) : (
                    <h3 align="center">Loading...</h3>
                )}
            </React.Fragment>
        );
    }
}

export default App;
