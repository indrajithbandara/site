/**
 * Random ID generator
 *
 * Generates a unique number using Math.random because the seeding algorithm.
 * Converts the number to a base36 string and grabs the first 9 characters.
 */
export function hash(len=12){
    return '_' + Math.random().toString(36).substr(2, len + 2);
}
