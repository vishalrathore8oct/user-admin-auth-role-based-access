const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send('You are not authorized to access this resource');
        }
        next();
    }
}

module.exports = roleMiddleware;