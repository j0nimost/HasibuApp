const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const appError = require('../utils/appError');
const jwt = require('jsonwebtoken');

exports.signUpAsync = async(req, res, next) => {
    try
    {
        const hashedpass = bcrypt.hashSync(req.body.password, 8);
        console.log(hashedpass);
        // hash the password
        const user = new userModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedpass
            });
        
        const addUser = await user.save();

        var token = jwt.sign({id: addUser._id}, process.env.SECRET, {
            expiresIn: 86400
        });

        res.status(200).json({
            isAuthenticated: true,
            token: token,
            expiresIn: '24h'
        });

    }
    catch(error)
    {
        next(error);
    }
}


exports.signInAsync = async(req, res, next) => {
    const getUser = await userModel.findOne({email: req.body.email});

    if(!getUser)
    {
        return next(new appError(404, 'Not Found', 'User Not Found'));
    }
    else
    {
        // compare passwords
        const isValid = bcrypt.compareSync(req.body.password, getUser.password);


        if(!isValid)
        {
            return next(new appError(401, 'Unauthorized', 'Incorrect Password'));
        }
        else
        {
            //generate token
            const accessToken = jwt.sign({id: getUser._id}, process.env.SECRET, {
                expiresIn: 86400
            });

            res.status(200).json({
                isAuthenticated: true,
                token: accessToken,
                expiresIn: '24h'});
        }
    }
}