"use strict";
const jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY


module.exports = {
    async checkToken(token) {
        try {
            const userToken = token.split(' ')[1];
            if (userToken == '' || userToken == undefined) {
                return {
                    user_token: null,
                    success: false
                }
            } else {
                let user_token = jwt.verify(userToken, JWT_SECRET_KEY)
                return {
                    user_token: jwt.verify(userToken, JWT_SECRET_KEY),
                    success: true
                };
            }
        } catch (err) {
            return false;
        }
    },
    async generateToken(email, id, role, admin_id= null) {
        try {
            let data ={}
            data['email']=email
            data['id']=id
            data['role']=role
            if(admin_id)data['admin_id']= admin_id
            const token = jwt.sign(data, JWT_SECRET_KEY, { expiresIn: '24h' }, { algorithm: 'RS256' })
            if (token) {
                return token
            } else {
                return false
            }
        } catch (err) {
            return false;
        }
    }
}