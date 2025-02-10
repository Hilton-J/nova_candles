import jwt from 'jsonwebtoken';

const generateToken = (res, id) => {
  const token = jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: '30d' } // this token will expire on after 30 days
  );

  res.cookie('jwt', token,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict', //This prevents CSRF (Cross Site ERequest Forgery) attachs
      maxAge: 30 * 24 * 60 * 60 * 1000
    }
  );
};

export default generateToken;