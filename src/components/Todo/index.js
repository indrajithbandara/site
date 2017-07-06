import React from 'react';

import List from './List';
import Form from './Form';
import Note from './Note';

export default class Todo extends React.Component {

    constructor(){
        super();
        this.state = {
            todos: [
                { id:1, name:'Learn JSX', isDone:true },
                { id:2, name:'Build an Awesome App', isDone:false },
                { id:3, name:'Ship It', isDone:false },
            ],
            current:'',
            notes:[]
        };
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    render(){
        return <section className="Todo-App">
            <Note notes={this.state.notes}/>
            <Form
                value={this.state.current}
                onChange={this.handleFormChange}
                onSubmit={this.handleFormSubmit}
            />
            <List todos={this.state.todos}/>
        </section>;
    }

    handleFormChange(e){
        this.setState({ current:e.target.value });
    }

    handleFormSubmit(e){
        e.preventDefault();
        // make sure a value exist
        if (!this.state.current) return this.setState({
            notes: this.state.notes.concat({type:'warn', value:'Must specify a todo!' })
        });
        // The value exists
        return this.setState({
            todos: this.state.todos.concat({ name:this.state.current, isDone: false }),
            current: '',
            notes:[]
        });
    }

}
