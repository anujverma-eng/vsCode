import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from '../services/JwtService'


const authenticate = async(req, res, next) => {
    let authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(CustomErrorHandler.unAuthorize("UnAuthorize"));
    }

    let token = authHeader.split(' ')[1];

    try {
        const { _id, role } = await JwtService.verify(token);
        const user = {
            _id,
            role
        }
        req.user = user;  // Adding User Or can say ki , Concatenate the req with user variable declared above
        next();

    } catch (err) {
        return next(CustomErrorHandler.unAuthorize("UnAuthorize"));
    }

};

export default authenticate;