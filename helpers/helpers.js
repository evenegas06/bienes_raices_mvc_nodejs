/**
 * Create a random ID.
 * 
 * @returns {String}
 */
export const generateID = () => {
    const random = Math.random().toString(36).substring(2);
    const date = Date.now().toString(36);

    return random + date;
};