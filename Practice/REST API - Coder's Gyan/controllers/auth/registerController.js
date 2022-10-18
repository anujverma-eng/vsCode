import Joi from 'joi';
import { RefreshToken, User } from '../../models';
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import { REFRESH_SECRET } from '../../config';

const registerController = {
    async register(req, res, next) {
        // Checklist //
        // Validate the Request
        // Authorize the Request
        // Check if user is in database already
        // prepare module
        // store in database
        // generate jwt token
        // send response

        //validation
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp(`^[a-zA-Z0-9{3,30}$]`)).required(),
            repeat_password: Joi.ref('password')
        });

        const { err } = registerSchema.validate(req.body);

        if (err) {
            return next(err);
        }

        // Check if the user is in Database already or not 


        try {
            const exist = await User.exists({ email: req.body.email });
            if (exist) {
                return next(CustomErrorHandler.alreadyExist("Email is already in use."));
            }
        } catch (err) {
            return next(err);
        }

        const { name, email, password } = req.body;

        // Hash Password  -- we will use Library bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Prepare the Model  & Store it in Database
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        // Save the user object in DB
        let access_token;
        let refresh_token;
        try {
            
            const result = await user.save();
            access_token = JwtService.sign({ _id: result._id, role: result.role });
            refresh_token = JwtService.sign({ _id: result._id, role: result.role }, '1y', REFRESH_SECRET);
            // Add or whitelist Refresh_TOken into our Database
            await RefreshToken.create({ refresh_token: refresh_token });

        } catch (err) {
            return next(err);
        }

        res.json({ access_token, refresh_token });
    }
};


export default registerController;