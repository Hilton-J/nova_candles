import { useState } from "react";
import { OutletContext } from "../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const LoginModal = ({ setOpenLoginModal }: OutletContext) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const [login] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success(`Logged in Successfully`);
      setOpenLoginModal(false);
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        toast.error((err as { data: { message: string } }).data.message);
      } else {
        toast.error(`An unexpected error occurred: ${err}`);
      }
    }
  };

  return (
    <div
      className='fixed z-50 inset-0 flex justify-center items-center bg-black/70'
      // onClick={() => setOpenLoginModal(false)}
    >
      <div className='bg-white/90 w-[30%] h-[50%] p-5 space-y-2'>
        <h1 className='text-3xl'>Login</h1>
        <form onSubmit={handleSubmit} className='space-y-5'>
          <div className=''>
            <label className='block' htmlFor='email'>
              Email Address
            </label>
            <input
              className='w-full border-b border-black/20 hover:border-black/50 hover:bg-black/10 outline-none p-2'
              type='email'
              id='email'
              name='email'
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className=''>
            <label className='block' htmlFor='password'>
              Password
            </label>
            <input
              className='w-full border-b border-black/20 hover:border-black/50 hover:bg-black/10 outline-none p-2'
              type='password'
              id='passsword'
              name='email'
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <a>Forgot Password?</a>
          <div>
            <button
              type='submit'
              className='cursor-pointer hover:bg-secondary hover:text-black
              } mt-3 bg-accent text-white border border-black/20 py-1 px-3 mr-auto h-fit'
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
