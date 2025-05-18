import { IUser } from "../interfaces/interfaces";
import { useUpdateUserMutation } from "../slices/userApiSlice";
import { useForm } from "react-hook-form";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { extractErrorMessage } from "../utils/extractError";

const ProfileTabForm
 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<Partial<IUser>>({
    mode: "onChange",
    defaultValues: {
      firstName: userInfo?.firstName,
      lastName: userInfo?.lastName,
      email: userInfo?.email,
      phoneNumber: userInfo?.phoneNumber,
    },
  });
  const onSubmit = async (data: Partial<IUser>) => {
    // e.preventDefault();
    try {
      const res = await updateUser(data).unwrap();
      const { results, message } = res;
      dispatch(setCredentials({ ...results }));
      toast.success(message);
    } catch (err) {
      toast.error(extractErrorMessage(err));
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 max-w-[50%]'>
      <div className='space-y-3'>
        <label className='block text-destructiv font-medium' htmlFor='email'>
          First Name
        </label>
        <input
          className='flex h-10 w-full rounded-md border border-black/20 bg-background px-3 py-2 text-base ring-offset-background laceholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candleamber focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:outline-none focus:ring-1 focus:ring-candleamber'
          type='text'
          id='firstName'
          {...register("firstName", {
            required: "First Name is required",
          })}
          disabled={isLoading}
        />
      </div>

      <div className='space-y-3'>
        <label className='block text-destructiv font-medium' htmlFor='email'>
          Last Name
        </label>
        <input
          className='flex h-10 w-full rounded-md border border-black/20 bg-background px-3 py-2 text-base ring-offset-background laceholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candleamber focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:outline-none focus:ring-1 focus:ring-candleamber'
          type='text'
          id='lastName'
          {...register("lastName", {
            required: "Last Name is required",
          })}
          disabled={isLoading}
        />
        {errors.lastName && (
          <p className='text-red-500 text-sm mt-1'>{errors.lastName.message}</p>
        )}
      </div>

      <div className='space-y-3'>
        <label className='block text-destructiv font-medium' htmlFor='email'>
          Email
        </label>
        <input
          className='flex h-10 w-full rounded-md border border-black/20 bg-background px-3 py-2 text-base ring-offset-background laceholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candleamber focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:outline-none focus:ring-1 focus:ring-candleamber'
          type='email'
          id='email'
          disabled
          {...register("email")}
        />
      </div>

      <div className='space-y-3'>
        <label className='block text-destructiv font-medium' htmlFor='email'>
          Mobile Number
        </label>
        <input
          className='flex h-10 w-full rounded-md border border-black/20 bg-background px-3 py-2 text-base ring-offset-background laceholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candleamber focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:outline-none focus:ring-1 focus:ring-candleamber'
          type='tel'
          inputMode='tel'
          id='phoneNumber'
          {...register("phoneNumber", {
            required: "Phone number is required",
            min: 10,
            maxLength: 12,
            pattern: {
              value: /0[6-8][0-9]{8}/i,
              message: "Format must be 0655235235",
            },
          })}
          disabled={isLoading}
        />
        {errors.phoneNumber && (
          <p className='text-red-500 text-sm mt-1'>
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      <button
        type='submit'
        className='cursor-pointer px-3 py-2 bg-candleamber text-white rounded-md hover:bg-candleamber/80 transition-colors disabled:bg-candledark/50 disabled:cursor-not-allowed'
        disabled={!isDirty}
      >
        {isLoading ? <>Saving...</> : "Save Changes"}
      </button>
    </form>
  );
};

export default ProfileTabForm
;
