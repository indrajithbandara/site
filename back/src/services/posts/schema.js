// Local
import { TokenValidate } from 'auth/client';
import { TypeUserOutput } from 'services/users/schema';
import {
    FieldGetter,
    TypeInput,
    TypeOutput,
    TypeList,
    TypeID,
    TypeBoolean,
    TypeString,
    TypeDate,
} from 'graphql/types';

const get = FieldGetter({
    _id: {
        description: 'An unique identifier for this post',
        type: TypeID,
    },
    userID: {
        description: 'The ID of the user that wrote the post.',
        type: TypeID,
    },
    user: {
        description: 'Full info about an user.',
        type: TypeUserOutput,
    },
    public: {
        description: 'Whether the post is visible to the public.',
        type: TypeBoolean,
    },
    title: {
        description: 'The title of the publicaction',
        type: TypeString,
    },
    content: {
        description: 'The content for the publication.',
        type: TypeString,
    },
    dateAdd: {
        description: 'The date when the post was first created',
        type: TypeDate,
    },
    dateMod: {
        description: 'The date when the post was last modified',
        type: TypeDate,
    },
});

export const TypePostOutput = new TypeOutput({
    description: 'A publication on the website.',
    name: 'PostOutput',
    fields: {
        _id: get('_id', true),
        user: get('user'),
        public: get('public'),
        title: get('title'),
        content: get('content'),
        dateAdd: get('dateAdd'),
        dateMod: get('dateMod'),
    },
});

export const TypePostInput = new TypeInput({
    description: 'Fields needed to create or modify a post.',
    name: 'PostInput',
    fields: {
        user: get('userID', true),
        public: get('public', true),
        title: get('title', true),
        content: get('content', true),
    },
});

export default service => ({ // eslint-disable-line no-unused-vars

    Query: {

        posts: {
            description: 'Returns all the posts',
            type: new TypeList(TypePostOutput),
            args: {},
            resolve: () => service.find(),
        },

    },

    Mutation: {

        postAdd: {
            description: 'Adds a new post',
            type: TypePostOutput,
            args: {
                post: { type: TypePostInput },
            },
            resolve: (root, { post }, { token }) => TokenValidate(token)
                .then(() => service.create(post)),
        },

        postMod: {
            description: 'Modifies an existing post.',
            type: TypePostOutput,
            args: {
                _id: get('_id', true),
                post: { type: TypePostInput },
            },
            resolve: (root, { _id, post }, { token }) => TokenValidate(token)
                .then(() => service.patch(_id, post)),
        },

        postDel: {
            description: 'Deletes existing post.',
            type: TypePostOutput,
            args: {
                _id: get('_id', true),
            },
            resolve: (root, { _id }, { token }) => TokenValidate(token)
                .then(() => service.remove(_id)),
        },
    },

});
