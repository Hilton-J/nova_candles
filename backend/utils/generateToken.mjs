import jwt from 'jsonwebtoken';
import { JWT_SECRET, NODE_ENV } from '../constants/env.const.mjs';
import { after30Days } from '../constants/date.const.mjs';
import generateAccessToken from './generateAccessToken.mjs';

const generateToken = (res, user) => {
  const accessToken = generateAccessToken(user);

  res.cookie('accessToken', accessToken,
    {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict', //This prevents CSRF (Cross Site ERequest Forgery) attachs
      maxAge: after30Days() //Will expire after 30 day
    }
  );
};

export default generateToken;