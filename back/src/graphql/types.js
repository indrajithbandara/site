import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLBoolean,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
} from 'graphql';

export const Type = GraphQLObjectType;
export const TypeSchema = GraphQLSchema;
export const TypeID = GraphQLID;
export const TypeList = GraphQLList;
export const TypeBoolean = GraphQLBoolean;
export const TypeString = GraphQLString;
export const TypeNonNull = GraphQLNonNull;

export default {
    object: Type,
    schema: TypeSchema,
    id: TypeID,
    list: TypeList,
    boolean: TypeBoolean,
    string: TypeString,
    nonNull: TypeNonNull,
};

// TODO: This should be on its own service.
export const TypeTopic = new Type({
    description: 'A group where to categorize content.',
    name: 'Topic',
    fields: {
        _id: {
            description: 'The unique identifier for this topic.',
            type: new TypeNonNull(TypeID),
        },
        name: {
            description: 'A name for this topic (should be unique)',
            type: new TypeNonNull(TypeString),
        },
    },
});
