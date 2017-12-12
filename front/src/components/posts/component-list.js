import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { format as DateFormat } from 'date-fns';
import { graphql as WithApolloGraphQL, compose as WithApolloCompose } from 'react-apollo';
// Local
import ComponentLoading from 'components/loading';
import {
    QueryPosts as SchemaQueryPosts,
    MutationDel as SchemaMutationDel,
} from './schema';

export const State = {
    posts: null,
    loading: null,
};

export class Component extends React.Component {

    state = State;

    componentWillReceiveProps({ data: { posts } }) {
        this.setState({ posts });
    }

    render() {
        if (this.state.loading || !this.state.posts) return <ComponentLoading/>;
        return <React.Fragment>
            {this.state.posts.map(({ _id, title, dateAdd }) => <form
                key={ _id }
                data-_id={ _id }
                onReset={ this.handleDelete }>
                <label> { DateFormat(dateAdd, 'YY/MM/DD') } </label>
                <label>
                    <RouterLink to={ `/admin/posts/${_id}` }>{ title }</RouterLink>
                </label>
                <button type="reset">Borrar</button>
            </form>)}
        </React.Fragment>;
    }

    handleDelete = (event) => {
        event.preventDefault();
        const { _id } = event.target.dataset;
        this.setState({ loading: true });
        this.props
            .mutationDel({
                variables: { _id },
                update(store) {
                    const data = store.readQuery({ query: SchemaQueryPosts });
                    data.posts.splice(data.posts.map(post => post._id).indexOf(_id), 1);
                    store.writeQuery({ query: SchemaQueryPosts, data });
                },
            })
            .then(() => this.setState({ loading: false }));
        return false;
    }
}

Object.defineProperty(Component, 'name', { value: 'ComponentAdmin' });

export default WithApolloCompose(
    // Fetches all posts
    WithApolloGraphQL(SchemaQueryPosts),
    // Deletes a post
    WithApolloGraphQL(SchemaMutationDel, { name: 'mutationDel' }),
)(Component);
