import GQL from 'graphql-tag';

export default {

    query: GQL`query { users { _id, email, nameFirst, nameLast }}`,

    mutationDel: GQL`mutation ($_id: String!) {
        userDel(_id: $_id) {
            _id
        }
    }`,

    mutationMod: GQL`mutation (
        $_id: String!,
        $email: String!,
        $password: String!,
        $nameFirst: String,
        $nameLast: String,
    ) {
        userMod(
            _id: $_id,
            email: $email,
            password: $password,
            nameFirst: $nameFirst,
            nameLast: $nameLast,
        ) { _id, email, nameFirst, nameLast } # has to be the same as Query
    }`,

};
