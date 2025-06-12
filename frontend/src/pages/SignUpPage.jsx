import { useState } from "react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";
import { LoaderIcon } from "lucide-react";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 px-4">
      <div className="w-full max-w-md bg-neutral-800 text-white p-6 rounded-lg shadow space-y-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center">Tarunet</h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-600 text-red-400 text-sm p-3 rounded-md">
            {error.response?.data?.message || "Signup failed"}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 rounded-md bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-white"
            value={signupData.fullName}
            onChange={(e) =>
              setSignupData({ ...signupData, fullName: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-md bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-white"
            value={signupData.email}
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-white"
            value={signupData.password}
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
            required
          />

          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" className="w-4 h-4 accent-white" required />I
            agree to the{" "}
            <span className="underline cursor-pointer text-white">terms</span>
          </label>

          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-white text-black hover:bg-gray-200 transition disabled:opacity-50"
          >
            {isPending ? (
              <>
                <LoaderIcon className="animate-spin w-4 h-4" />
                Creating...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="underline hover:text-white">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
