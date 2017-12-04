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

export const TypeUser = new Type({
    name: 'User',
    description: 'A person that has admin access to the website.',
    fields: {
        _id: {
            type: new TypeNonNull(TypeID),
            description: 'The unique identifier for this user.',
        },
        email: {
            type: new TypeNonNull(TypeString),
            description: 'An email address for this user.',
        },
        token: {
            type: TypeString,
            description: 'Key that allows this user to consume protected resources.',
        },
        nameFirst: {
            type: TypeString,
            description: 'The first name of the user.',
        },
        nameLast: {
            type: TypeString,
            description: 'The last name of the user.',
        },
    },
});

export const TypeTopic = new Type({
    name: 'Topic',
    description: 'A group where to categorize content.',
    fields: {
        _id: {
            type: new TypeNonNull(TypeID),
            description: 'The unique identifier for this topic.',
        },
        name: {
            type: new TypeNonNull(TypeString),
            description: 'A name for this topic (should be unique)',
        },
    },
});

export const TypePost = new Type({
    name: 'Post',
    description: 'A publication on the website.',
    fields: {
        _id: {
            type: new TypeNonNull(TypeID),
            description: 'An unique identifier for this post',
        },
        user: {
            type: new TypeNonNull(TypeID),
            description: 'The ID of the user that wrote the post.',
        },
        public: {
            type: new TypeNonNull(TypeBoolean),
            description: 'Whether the post is visible to the public.',
        },
        content: {
            type: new TypeNonNull(TypeString),
            description: 'The content for the publication.',
        },
    },
});

export default {};
