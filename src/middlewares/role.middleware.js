const roleMiddleware = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).send('You are not authorized to access this resource');
        }
        next();
    }
}

module.exports = roleMiddleware;