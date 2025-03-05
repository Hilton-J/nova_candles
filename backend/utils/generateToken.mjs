import jwt from 'jsonwebtoken';
import { JWT_SECRET, NODE_ENV } from '../constants/env.const.mjs';

const generateToken = (res, id) => {
  const token = jwt.sign(
    { id },
    JWT_SECRET,
    { expiresIn: '30d' } // this token will expire on after 30 days
  );

  res.cookie('jwt', token,
    {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict', //This prevents CSRF (Cross Site ERequest Forgery) attachs
      maxAge: 30 * 24 * 60 * 60 * 1000 //Will expire after 30 day
    }
  );
};

export default generateToken;