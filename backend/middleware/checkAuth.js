const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,"RP.yw2uc6bLQTquClFdeeiFWw.BEj8DBP2JEQXgTFtz9AF1gxzbmEn5bbEYwe3vwnM0OM");
        next();
    } catch (e) {
        res.json({ status: "failed" ,message: "Auth Failed"})
    }
    

}
