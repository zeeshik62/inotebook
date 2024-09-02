import jwt from 'jsonwebtoken';
const JWT_SECRET = 'zeeshik$62';

const fetchuser = (req, res, next) => {
    // Getting user from the jwt token and adding it to the req object
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: 'No token found!' });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET); // Use JWT_SECRET here
        req.user = data.user;
        next(); // Proceed to the next middleware or route handler.
    } catch (error) {
        res.status(401).send({ error: 'Invalid token!' });
    }
};

export default fetchuser;
