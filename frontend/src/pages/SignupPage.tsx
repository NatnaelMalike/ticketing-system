import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { signupUser , clearError} from "../store/authSlice";
import { RootState } from "../store";
import { Navigate, Link } from "react-router-dom";
import { signupSchema, SignupFormData } from "../schemas/authSchema";
import { getRoleFromToken } from "../lib/authUtils";
import { ScaleLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export const Signup: React.FC = () => {
  const dispatch = useDispatch();
  const [isvisible, setVisible] = useState(false);
  const { token, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const role = getRoleFromToken(token);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  useEffect(() => {
    dispatch(clearError()); // Clear error when component mounts
  }, [dispatch]);
  const onSubmit = (data: SignupFormData) => {
    dispatch(signupUser(data) as any);
  };
  const togglePasswordVisibility = () => {
    setVisible(!isvisible);
};
  if (token) {
    return <Navigate to={role === "admin" ? "/admin" : "/dashboard"} replace />;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("username")}
            placeholder="Username"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
        <div className="relative">
          <input
            {...register("password")}
            type={isvisible ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
           <span className="absolute top-1/2 -translate-y-1/2 items-center cursor-pointer right-0 mr-4" onClick={togglePasswordVisibility}>
                                    {isvisible ? (
                                        <EyeOffIcon className="w-5 h-5" />
                                    ) : (
                                        <EyeIcon className="w-5 h-5" />
                                    )}
                                </span>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="relative">
          <input
            {...register("confirmPassword")}
            type={isvisible ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
           <span className="absolute top-1/2 -translate-y-1/2 items-center cursor-pointer right-0 mr-4" onClick={togglePasswordVisibility}>
                                    {isvisible ? (
                                        <EyeOffIcon className="w-5 h-5" />
                                    ) : (
                                        <EyeIcon className="w-5 h-5" />
                                    )}
                                </span>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div>
          <select
            {...register("role")}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue="user"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
        >
          {loading ? <ScaleLoader color="#ffffff" height={15} /> : "Signup"}
        </button>
      </form>
      <p className="mt-2">
        Already have an account?{" "}
        <Link to="/" className="text-blue-500">
          Login
        </Link>
      </p>
      {error && <p className="text-red-500 text-sm">{error}</p>}

    </div>
  );
};
