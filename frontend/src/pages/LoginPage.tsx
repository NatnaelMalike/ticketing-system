import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loginUser } from "../store/authSlice";
import { RootState } from "../store";
import { Navigate, Link } from "react-router-dom";
import { loginSchema, LoginFormData } from "../schemas/authSchema";
import { getRoleFromToken } from "../lib/authUtils";
import {  ScaleLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon, ShieldX } from "lucide-react";
import { Input } from "../components/ui/input";
import { FormMessage } from "../components/ui/form-message";
const Login = () => {
  const [isvisible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { token, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const role = getRoleFromToken(token);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  useEffect(() => {
    dispatch(clearError()); 
  }, [dispatch]);

  const onSubmit = (data: LoginFormData) => {
    dispatch(loginUser(data) as any); // Type assertion for thunk
  };
  const togglePasswordVisibility = () => {
    setVisible(!isvisible);
};

  if (token) {
    return <Navigate to={role === "admin" ? "/admin" : "/dashboard"} replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-md rounded-lg shadow-lg bg-white px-4 py-6 md:px-6 md:py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Login</h1>
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
        <button
          type="submit"
          className=" mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
        >
          {loading ? (
           <ScaleLoader
             color="#ffffff"
             height={15}
            
           />
          ) : (
            "Login"
          )}
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{""}
        <Link to="/signup" className="text-blue-500 ml-1" replace>
          Signup
        </Link>
      </p>
      {error && <p className="text-red-500 mt-4 text-center place-items-center"><ShieldX />{error}</p>}
    </div>
    </div>
  );
};

export default Login;
