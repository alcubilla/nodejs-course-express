import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';


dotenv.config();


const TOKEN_EXPIRATION = 60; // 60 * 60 si quiero horas
const {TOKEN_SECRET} =process.env;

export const validateToken = token => jwt.verify(token, TOKEN_SECRET);  //verifica el token con la palabra secreta

export const matchHash = (plain, hashed) => bcryptjs.compareSync(plain, hashed);

export const createToken = payload => jwt.sign(payload, TOKEN_SECRET,{expiresIn: TOKEN_EXPIRATION});//crea un token