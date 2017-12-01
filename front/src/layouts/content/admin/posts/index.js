import React from 'react';
import { Editor, EditorState } from 'draft-js';
import 'Draft.css'; // eslint-disable-line

export const State = {
    editor: EditorState.createEmpty(),
};

export class Component extends React.Component {

    state = State

    render() {
        return <section>
            <h3>Artículos</h3>
            <Editor
                placeholder="Contenido"
                editorState={ this.state.editor }
                onChange={ this.handleChange.bind(this) }
            />
        </section>;
    }

    handleChange(editor) {
        this.setState({ editor });
    }
}

Object.defineProperty(Component, 'name', { value: 'LayoutContentAdminPosts' });
export default Component;
