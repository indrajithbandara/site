import React from 'react';
import PropTypes from 'prop-types';
import { withApollo as WithApollo } from 'react-apollo';
import SlateSerializer from 'slate-plain-serializer';
import { Editor as SlateEditor } from 'slate-react';
// Local
import ComponentLoading from 'components/loading';
import ComponentMessages, { CatchErrorMessages } from 'components/messages';
import { QueryPost as SchemaQueryPost } from './schema';

export const State = {
    editing: null,
    loading: null,
    post: null,
    messages: [],
};

export class Component extends React.Component {

    state = State;

    static propTypes = {
        _id: PropTypes.string,
    }

    componentWillMount() {
        const { _id } = this.props;
        if (_id) {
            this.setState({ loading: true });
            this.props.client
                .query({
                    query: SchemaQueryPost,
                    variables: { _id },
                })
                .catch(error => ({ messages: CatchErrorMessages(error) }))
                .then(({ messages, data }) => {
                    if (messages) return this.setState({ ...State, messages });
                    // Enable content for Slate
                    const content = SlateSerializer.deserialize(data.post.content);
                    return this.setState({ ...State, post: { ...data.post, content } });
                });
        }
    }

    render() {
        if (!this.state.post || this.state.loading) return <ComponentLoading/>;
        return <React.Fragment>
            <ComponentMessages messages={ this.state.messages } />
            <form>
                <label>
                    <input
                        type="text"
                        name="title"
                        required={ true }
                        value={ this.state.post.title }
                        onChange={ this.handleInput }
                    />
                </label>
                <SlateEditor
                    placeholder="Content..."
                    value={ this.state.post.content }
                    onChange={ this.handleEditorChange }
                />
            </form>
        </React.Fragment>;
    }

    handleInput = event => this.setState({
        ...State,
        post: {
            ...this.state.post,
            [event.target.name]: event.target.value,
        },
    })

    handleEditorChange = ({ value: content }) => this.setState({
        ...State,
        post: { ...this.state.post, content },
    })

}

Object.defineProperty(Component, 'name', { value: 'ComponentPostEditor' });
export default WithApollo(Component);
