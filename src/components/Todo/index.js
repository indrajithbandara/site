import React from 'react';

import {hash as Hash} from '../../utils';

import List from './List';
import Form from './Form';
import Note from './Note';
import Filter from './Filter';

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
     * Returns an item from the todo state, given an ID
     */
    getTodo(id){
        const index = this.state.todos.findIndex(todo => todo.id === id);
        if (index === -1){
            this.setState({
                notes: [
                    ...this.state.notes,
                    { type:'error', value:`Could not find id: ${id}` }
                ]
            });
            return { index }
        }
        return { index, todo:this.state.todos[index] };
    }

    /**
     * The form received new text.
     * - Update the state for current value.
     */
    handleFormChange(value){
        this.setState({ current:value });
    }

    /**
     * The form was submitted.
     * - Validate value, if error found append a note.
     * - if value is valid, append the todo.
     */
    handleFormSubmit(value){
        if (!value) {
            const note = { type:'error', value:'Expecting a todo' };
            return this.setState({ notes: this.state.notes.concat(note) });
        }
        this.setState({
            notes:[],
            current:'',
            todos:this.state.todos.concat({ id:Hash(), name:value, isDone:false })
        });
    };


    /**
     * A ToDo item changed status
     * - Replace item using index without modifyng the current state.
     */
    handleTodoChange(id) {
        const {index, todo} = this.getTodo(id);
        if (todo) this.setState({
            todos: this.state.todos
                .slice(0, index)
                .concat({ ...todo, isDone:!todo.isDone })
                .concat(this.state.todos.slice(index+1))
        });
    };

    /**
     * A ToDo item is marked for deletion.
     * - Remove item from the state array withour modifying current state.
     */
    handleTodoDelete(id) {
        const {index, todo} = this.getTodo(id);
        if (todo) this.setState({
            todos: this.state.todos
                .slice(0, index)
                .concat(this.state.todos.slice(index+1))
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
            onChange={this.handleTodoChange.bind(this)}
            onDelete={this.handleTodoDelete.bind(this)}
        />
        <Filter/>
    </section>;

}
