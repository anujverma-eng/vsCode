import Joi from 'joi';
import { REFRESH_SECRET } from '../../config';
import { User } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import JwtService from '../../services/JwtService';
import { RefreshToken } from '../../models';

const refreshController = {
    async refresh(req, res, next) {
        //Validate the Request
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required()
        });

        const { err } = refreshSchema.validate(req.body);

        if (err) {
            return next(err);
        }

        //If the refresh token is not avl in our database, then it means the token is altered or the user is logged out
        //And if the token exist in database then we will issue the new token to the user.

        let refreshTokenObject;
        try {
            refreshTokenObject = await RefreshToken.findOne({ refresh_token: req.body.refresh_token });
            if (!refreshTokenObject) {
                return next(CustomErrorHandler.unAuthorize("Invalid Refresh Token"));
            }

            let userId;
            try {
                const { _id } = await JwtService.verify(refreshTokenObject.refresh_token, REFRESH_SECRET);
                userId = _id;
            } catch (err) {
                return next(CustomErrorHandler.unAuthorize("Invalid Token"));
            }

            let user = await User.findOne({ _id: userId });
            if (!user) {
                return next(CustomErrorHandler.unAuthorize("No User Found"));
            }

            res.json({ user });

        } catch (err) {
            return next(new Error('Something went wrong: ' + err.message));
        }


    }
};
export default refreshController;