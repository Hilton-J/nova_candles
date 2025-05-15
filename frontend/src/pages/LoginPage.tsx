import { AppDispatch } from "../store";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Eye, EyeClosed, Lock, Mail } from "lucide-react";
import { setCredentials } from "../slices/authSlice";
import { LoginRequest } from "../interfaces/interfaces";
import { useLoginMutation } from "../slices/userApiSlice";
import { extractErrorMessage } from "../utils/extractError";
import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const dispatch = useDispatch<AppDispatch>();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: LoginRequest) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success(`Logged in Successfully`);
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(extractErrorMessage(err));
    }
  };

  return (
    <div className='container mx-auto py-16 px-4'>
      <div className='flex flex-col items-center justify-center min-h-[60vh]'>
        <div className='w-full max-w-md p-8 rounded-lg shadow-lg bg-white'>
          <div className='text-center'>
            <h2 className='text-3xl font-playfair font-bold text-candledark'>
              Welcome Back
            </h2>
            <p className='mt-2 text-candlegray'>Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 mt-8'>
            <div className='space-y-3'>
              <label className='block text-destructiv' htmlFor='email'>
                Email
              </label>
              <div className='relative focus:outline-none focus:ring-1 focus:ring-candleamber'>
                <Mail className='absolute left-3 top-3 h-4 w-4' />
                <input
                  className='flex h-10 w-full rounded-md border border-black/20 bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candleamber focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10'
                  type='email'
                  id='email'
                  placeholder='youremail@example.com'
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className='space-y-3'>
              <label className='block text-destructiv' htmlFor='email'>
                Password
              </label>
              <div className='relative focus:outline-none focus:ring-1 focus:ring-candleamber'>
                <Lock className='absolute left-3 top-3 h-4 w-4' />
                <input
                  className='flex h-10 w-full rounded-md border border-black/20 bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candleamber focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10'
                  type={showPassword ? "text" : "password"}
                  id='password'
                  placeholder='*******'
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 3,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />

                {showPassword ? (
                  <Eye
                    className='absolute right-3 top-3 h-4 w-4 cursor-pointer hover:text-candleamber'
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeClosed
                    className='absolute right-3 top-3 h-4 w-4 cursor-pointer hover:text-candleamber '
                    onClick={() => setShowPassword(true)}
                  />
                )}

                {errors.password && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <Link
                to='/forgot-password'
                className='text-sm text-candleamber hover:underline'
              >
                Forgot password?
              </Link>
            </div>

            <button
              type='submit'
              className='cursor-pointer w-full px-6 py-3 bg-candleamber text-white rounded-md hover:bg-candleamber/80 transition-colors'
              disabled={isLoading}
            >
              {isLoading ? <>Signing in...</> : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
