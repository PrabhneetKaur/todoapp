const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    console.log(salt, password);
    return await bcrypt.hash(password, salt);
};


const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};


const generateToken = async (user) => {
    const payload = {
        id: user._id,
        username: user.username,
    };

    return await jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

const verifyToken = async (token) => {
    return await jsonwebtoken.verify(token, process.env.JWT_SECRET);
};

const verifyTokenMiddleware = async (req, _res, next) => {
    if (!req.headers.authorization) {
        req.user = null;
        return next();
    }

    const token = req.headers.authorization.split(' ')[1];
    
    if (!token) {
        req.user = null;
        return next();
    }

    try {
        const decoded = await verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        req.user = null;
        next();
    }
};

const protectedRoute = async (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(401).json({
            error: 'Unauthorized',
        });
    }
};


// const verifyTokenMiddleware = (req, res, next) => {
//     if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
//         req.user = null;
//         return next();
//     }

//     const token = req.headers.authorization.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1');

//     verifyToken(token)
//         .then((decoded) => {
//             req.user = decoded;
//             next();
//         })
//         .catch((err) => {
//             req.user = null;
//             next();
//         });
// };


module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken,
    verifyTokenMiddleware,
    protectedRoute,
};