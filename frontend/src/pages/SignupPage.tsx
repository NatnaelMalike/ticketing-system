import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, clearError } from "../store/authSlice";
import { RootState } from "../store";
import { Navigate, Link } from "react-router-dom";
import { signupSchema, SignupFormData } from "../schemas/authSchema";
import { getRoleFromToken } from "../lib/authUtils";
import { ScaleLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon, UserRoundX } from "lucide-react";
import { Input } from "../components/ui/input";
import { FormMessage } from "../components/ui/form-message";

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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg shadow-lg bg-white px-4 py-6 md:px-8 md:py-8">
        <h1 className="text-2xl font-bold mb-8 text-center">Create Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input {...register("username")} placeholder="Username" />
            {errors.username && (
              <FormMessage message={errors.username.message} />
            )}
          </div>
          <div>
            <div className="relative">
              <Input
                {...register("password")}
                type={isvisible ? "text" : "password"}
                placeholder="Password"
              />
              <span
                className="absolute top-1/2 -translate-y-1/2 items-center cursor-pointer right-0 mr-4"
                onClick={togglePasswordVisibility}
              >
                {isvisible ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </span>
            </div>
            {errors.password && (
              <FormMessage message={errors.password.message} />
            )}
          </div>
          <div>
            <div className="relative">
              <Input
                {...register("confirmPassword")}
                type={isvisible ? "text" : "password"}
                placeholder="Confirm Password"
              />
              <span
                className="absolute top-1/2 -translate-y-1/2 items-center cursor-pointer right-0 mr-4"
                onClick={togglePasswordVisibility}
              >
                {isvisible ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </span>
            </div>
            {errors.confirmPassword && (
              <FormMessage message={errors.confirmPassword.message} />
            )}
          </div>
          <div>
            <select
              {...register("role")}
              defaultValue="user"
              className="w-full h-11 border border-gray-200 focus:border-0 py-2 px-3 shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option className="" value="user">
                User
              </option>
              <option className="" value="admin">
                Admin
              </option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm pt-2">{errors.role.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
          >
            {loading ? <ScaleLoader color="#ffffff" height={15} /> : "Signup"}
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500">
            Login
          </Link>
        </p>
        {error && <p className="text-red-500 mt-4 text-center place-items-center pt-2"><UserRoundX />{error}</p>}
      </div>
    </div>
  );
};
