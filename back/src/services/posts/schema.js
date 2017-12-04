// Local
import {
    Type,
    TypeNonNull,
    TypeID,
    TypeBoolean,
    TypeString,
} from 'graphql/types';

export const TypePost = new Type({
    description: 'A publication on the website.',
    name: 'Post',
    fields: {
        _id: {
            description: 'An unique identifier for this post',
            type: new TypeNonNull(TypeID),
        },
        user: {
            description: 'The ID of the user that wrote the post.',
            type: new TypeNonNull(TypeID),
        },
        public: {
            description: 'Whether the post is visible to the public.',
            type: new TypeNonNull(TypeBoolean),
        },
        content: {
            description: 'The content for the publication.',
            type: new TypeNonNull(TypeString),
        },
    },
});

export default service => ({ // eslint-disable-line no-unused-vars
});
