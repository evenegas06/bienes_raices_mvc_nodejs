import jwt from 'jsonwebtoken';

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

/**
 * Generate a JWT.
 * 
 * @param {Object} data
 * @returns {String}
 */
export const generateJWT = (data) => {
    return jwt.sign(
        {
            id: data.id,
            name: data.name,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
};