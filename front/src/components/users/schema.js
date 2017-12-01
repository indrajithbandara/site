import GQL from 'graphql-tag';

const arg = {
    vars: `
        $email: String!,
        $password: String!,
        $nameFirst: String,
        $nameLast: String
    `,
    vals: `
        email: $email,
        password: $password,
        nameFirst: $nameFirst,
        nameLast: $nameLast,
    `,
};

const fragment = `
    _id,
    email,
    nameFirst,
    nameLast
`;

export default {

    query: GQL`query {
        users {
            ${fragment}
        }
    }`,

    mutationAdd: GQL`mutation (${arg.vars}) {
        userAdd(${arg.vals}) {
            ${fragment}
        }
    }`,

    mutationMod: GQL`mutation ($_id: String!, ${arg.vars}) {
        userMod(_id: $_id, ${arg.vals}) {
            ${fragment}
        }
    }`,

    mutationDel: GQL`mutation ($_id: String!) {
        userDel(_id: $_id) {
            _id
        }
    }`,

};
