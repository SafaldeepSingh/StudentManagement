require('dotenv').config()
const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,process.env.TOKEN_SECRET);
        next();
    } catch (e) {
        res.json({ status: "failed" ,message: "Auth Failed"})
    }
    

}
