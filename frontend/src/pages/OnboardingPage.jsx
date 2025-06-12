import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  LoaderIcon,
  MapPinIcon,
  ShuffleIcon,
  CameraIcon,
  UserPlusIcon,
} from "lucide-react";
import { completeOnboarding } from "../lib/api";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://randomuser.me/api/portraits/med/men/${idx}.jpg`;
    setFormState((prev) => ({ ...prev, profilePic: randomAvatar }));
    toast.success("Random profile picture generated!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-neutral-900 text-white">
      <div className="w-full max-w-4xl bg-neutral-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Complete Your Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* LEFT: Avatar + Name */}
          <div className="flex flex-col items-center justify-between gap-6">
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full bg-neutral-700 overflow-hidden flex items-center justify-center">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <CameraIcon className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <button
                type="button"
                onClick={handleRandomAvatar}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-white text-black hover:bg-gray-200 rounded-md transition"
              >
                <ShuffleIcon className="w-4 h-4" />
                Random Avatar
              </button>
            </div>

            <input
              type="text"
              name="fullName"
              value={formState.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full bg-neutral-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* RIGHT: Rest of the form */}
          <div className="space-y-6">
            <div>
              <label className="block mb-1 text-sm font-medium">Bio</label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={handleChange}
                placeholder="Tell others about yourself"
                className="w-full h-24 bg-neutral-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Native Language
                </label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={handleChange}
                  className="w-full bg-neutral-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option value="">Select native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  Learning Language
                </label>
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  onChange={handleChange}
                  className="w-full bg-neutral-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option value="">Select language you're learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Location</label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                  className="w-full bg-neutral-700 rounded-md px-10 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>
          </div>

          {/* Submit Button - Full width */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium px-6 py-3 rounded-md hover:bg-gray-200 transition disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <LoaderIcon className="w-5 h-5 animate-spin" />
                  Onboarding...
                </>
              ) : (
                <>
                  <UserPlusIcon className="w-5 h-5" />
                  Complete Onboarding
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;
