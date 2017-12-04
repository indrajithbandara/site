import Thrower from '@gik/tools-thrower';
import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLBoolean,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLScalarType,
} from 'graphql';

export const TypeOutput = GraphQLObjectType;
export const TypeInput = GraphQLInputObjectType;
export const TypeSchema = GraphQLSchema;
export const TypeID = GraphQLID;
export const TypeList = GraphQLList;
export const TypeBoolean = GraphQLBoolean;
export const TypeString = GraphQLString;
export const TypeNonNull = GraphQLNonNull;

export const TypeDate = new GraphQLScalarType({
    name: 'Date',
    serialize(value) {
        if (!(value instanceof Date)) {
            const message = ['Expecting an instance of Date, got "%s"', typeof value];
            Thrower(message, 'TypeDateError');
        }
        if (Number.isNaN(value.getTime()))
            Thrower('Invalid date.', 'SerializeTypeDateError');
        return value.toJSON();
    },
    parseValue(value) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) Thrower('Invalid date.', 'ParseTypeDateError');
        return date;
    },
    parseLiteral(ast) {
        const date = new Date(ast);
        if (Number.isNan(date.getTime())) Thrower('Invalid date.', 'ParseTypeDateError');
        if (ast.value !== date.toJSON()) {
            const message = [
                'Invalid format, expecting: YYYY-MM-DDTHH:MM:SS.SSSZ, got: %s',
                ast.value,
            ];
            Thrower(message, 'ParseTypeDateError');
        }
        return date;
    },
});

/**
 * @description Shorhand for getting fields.
 * @param {Object} fields - Declaration of fields.
 * @returns {Function} - The function to get fields.
 */
export const FieldGetter = fields => (name, nonNull = false) => ({
    ...fields[name],
    type: !nonNull
        ? fields[name].type
        : new TypeNonNull(fields[name].type),
});

export default {
    output: TypeOutput,
    input: TypeInput,
    schema: TypeSchema,
    id: TypeID,
    list: TypeList,
    boolean: TypeBoolean,
    string: TypeString,
    date: TypeDate,
    nonNull: TypeNonNull,
};

// TODO: This should be on its own service.
export const TypeTopic = new TypeOutput({
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
