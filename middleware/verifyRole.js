const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
        let roleAllowed = [...allowedRoles];
        let rolesHave = req.roles; 
        let result = rolesHave.map(role => roleAllowed.includes(role)).find(val => val = true)
        if(!result) return res.sendStatus(401)
        next()
    }
}
module.exports =  verifyRole