require("dotenv").config();
import jwt from "jsonwebtoken";

const createJWT = (data) => {
    let payload = data;
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key);
    } catch (err) {
        console.log(err);
    }
    return token;
};
const verifyTokenJWT = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;

    try {
        let decoded = jwt.verify(token, key);
        data = decoded;
    } catch (err) {
        console.log(err);
    }
    return data;
};
const middlewareController = {
    verifyToken: (req, res, next) => {
        let key = process.env.JWT_SECRET;
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, key, (err, user) => {
                if (err) {
                    res.status(403).json("Token is not valid");
                }
                req.user=user;
                next()
            });
        }
        else(
            res.status(401).json("You're not authenticated")
        )
    },
    verifyTokenAndminAuth:(req,res,next)=>{
        middlewareController.verifyToken(req,res,()=>{
            if(req.user.id==req.param.id||req.user.admin){
                next()
            }
            else{
                res.status(403).json("User are not admin");

            }
        })

    }
};

module.exports = {
    createJWT,
    verifyTokenJWT,
    middlewareController
};
