import GQL from 'graphql-tag';

export const QueryPosts = GQL`query {
    posts { _id, title, dateAdd }
}`;

export const QueryPost = GQL`query ($_id: ID!) {
    post (_id: $_id) {
        title, content, public, dateAdd
    }
}`;

export const MutationDel = GQL`mutation ($_id: ID!){
    postDel(_id: $_id) { _id }
}`;

export default {
    queryPosts: QueryPosts,
    queryPost: QueryPost,
    mutationDel: MutationDel,
};
