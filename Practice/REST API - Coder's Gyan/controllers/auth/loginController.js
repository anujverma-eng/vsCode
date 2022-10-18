import Joi from "joi";
import { RefreshToken, User } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import bcrypt from 'bcrypt';
import JwtService from "../../services/JwtService";
import { REFRESH_SECRET } from "../../config";

const loginController = {
    async login(req, res, next) {

        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp(`^[a-zA-Z0-9{3,30}$]`)).required()
        });

        const { error } = loginSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                // Means: There is No user Exist with requested Email
                return next(CustomErrorHandler.wrongCredentials("Username or Password is incorrect!"));
            }

            //Match Password
            const matchPassword = await bcrypt.compare(req.body.password, user.password);
            if (!matchPassword) {
                //: Means: The Password does not match
                return next(CustomErrorHandler.wrongCredentials("Username or Password is incorrect!"));
            }

            //Both Email and Password is Correct, So Let's Generate Token.
            console.log(user);
            const access_token = JwtService.sign({ _id: user._id, role: user.role });
            const refresh_token = JwtService.sign({ _id: user._id, role: user.role }, '1y', REFRESH_SECRET);
            console.log(refresh_token);
            await RefreshToken.create({ refresh_token: refresh_token });

            res.json({ access_token, refresh_token });

        } catch (err) {
            return next(err);
        }


    },

    async logout(req, res, next) {

        const loginSchema = Joi.object({
            refresh_token: Joi.string().required()
        });

        const { err } = loginSchema.validate(req.body);

        if (err) {
            return next(err);
        }

        try {
            await RefreshToken.deleteOne({ refresh_token: req.body.refresh_token });
            res.json({message:"Logged Out Success"})
        } catch (err) {
            return next(new Error("Something went wrong in db."));
        }

    }
};

export default loginController;