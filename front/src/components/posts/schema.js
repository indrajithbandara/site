import GQL from 'graphql-tag';

export const QueryList = GQL`query {
    posts { _id, title, dateAdd }
}`;

export const MutationDel = GQL`mutation ($_id: ID!){
    postDel(_id: $_id) { _id }
}`;

export default {
    queryList: QueryList,
    mutationDel: MutationDel,
};
