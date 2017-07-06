import React from 'react';

import {hash as Hash} from '../../utils';

import List from './List';
import Form from './Form';
import Note from './Note';

export default class Todo extends React.Component {

    /**
     * The initial state
     */
    state = {
        todos: [
            { id:Hash(), name:'Learn JSX', isDone:true },
            { id:Hash(), name:'Build an Awesome App', isDone:false },
            { id:Hash(), name:'Ship It', isDone:false },
        ],
        current:'',
        notes:[]
    };

    /**
     * Everytime the form changes will call this method with its value
     * update the state using that value.
     */
    handleFormChange = value => this.setState({ current:value });

    /**
     * The form was submitted.
     * - Validate value, if error found append a note.
     * - if value is valid, append the todo.
     */
    handleFormSubmit = value => {
        if (!value) {
            const note = { type:'error', value:'Expecting a todo' };
            return this.setState({ notes: this.state.notes.concat(note) });
        }
        const todos = this.state.todos.concat({ name:value, isDone:false });
        this.setState({ todos, current:'', notes:[] });
    }

    /**
     * A ToDo item changed status
     * - Make sure the index exists. If it doesn't send an errror.
     * - Replace item usinf index without modifyng the current state.
     */
    handleListChange = id => {
        const index = this.state.todos.findIndex(todo => todo.id === id);
        if (index === -1) return this.setState({
            notes:this.state.notes.concat({ type:'error', value:'Invalid Index!' })
        });
        const todo = this.state.todos[index];
        this.setState({
            todos: this.state.todos
                .slice(0, index)
                .concat({ ...todo, isDone:!todo.isDone })
                .concat(this.state.todos.slice(index +1))
        });
    }

    render = () => <section className="Todo-App">
        <Note notes={this.state.notes}/>
        <Form
            value={this.state.current}
            onChange={this.handleFormChange.bind(this)}
            onSubmit={this.handleFormSubmit.bind(this)}
        />
        <List
            todos={this.state.todos}
            onChange={this.handleListChange.bind(this)}
        />
    </section>;

}
