import { useState } from "react";
import { LoaderIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 px-4">
      <div className="w-full max-w-md bg-neutral-800 text-white p-6 rounded-lg shadow-lg space-y-6">
        {/* Title */}
        <div className="text-3xl font-bold text-center">Tarunet</div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-600 text-sm text-red-400 p-3 rounded-md">
            {error.response?.data?.message || "Something went wrong"}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm mb-1 text-gray-300">Email</label>
            <input
              type="email"
              placeholder="hello@example.com"
              className="w-full px-4 py-2 rounded-md bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-white"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-md bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-white"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-white text-black hover:bg-gray-200 transition disabled:opacity-50"
          >
            {isPending ? (
              <>
                <LoaderIcon className="animate-spin w-4 h-4" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-sm text-center text-gray-400">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="underline hover:text-white">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
