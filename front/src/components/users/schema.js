import GQL from 'graphql-tag';

const fragment = '_id, email, nameFirst, nameLast';
const types = `
    $email: String!,
    $password: String!,
    $nameFirst: String,
    $nameLast: String,
`;
const args = `
    email: $email,
    password: $password,
    nameFirst: $nameFirst,
    nameLast: $nameLast,
`;

export default {

    query: GQL`query { users { ${fragment} }}`,

    mutationDel: GQL`mutation ($_id: String!) {
        userDel(_id: $_id) { _id }
    }`,

    mutationMod: GQL`mutation ($_id: String!, ${types}) {
        userMod(_id: $_id, ${args}) { ${fragment} }
    }`,

    mutationAdd: GQL`mutation (${types}) {
        userAdd(${args}) { ${fragment} }
    }`,

};
