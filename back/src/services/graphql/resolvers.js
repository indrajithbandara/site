export default function Resolvers() {
    const service = this.service('tacos');
    return {
        Query: {
            tacos: (root, { meat }) => service.find({ query: { meat } }),
            taco: (root, { _id }) => service.get(_id),
        },
        Mutation: {
            createTaco: (root, data, context) => service.create(data, context),
        },
    };
}
