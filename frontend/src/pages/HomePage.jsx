import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { CheckCircle, MapPin, UserPlus } from "phosphor-react";
import { capitialize, getLanguageFlag } from "../lib/utils";

import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: (_, userId) => {
      // Invalidate to re-fetch the updated outgoing requests
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });

      // ✅ Optimistically update the Set immediately
      setOutgoingRequestsIds((prev) => new Set(prev).add(userId));
    },
    onError: (error) => {
      console.error("Error sending friend request:", error);
    },
  });

  useEffect(() => {
    const ids = new Set();
    outgoingFriendReqs?.forEach((req) => ids.add(req.recipient._id));
    setOutgoingRequestsIds(ids);
  }, [outgoingFriendReqs]);

  return (
    <div className="p-6 w-full mx-auto space-y-12 bg-neutral-950 min-h-screen text-white">
      {/* FRIENDS SECTION */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Friends</h2>
        {loadingFriends ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}
      </div>

      {/* RECOMMENDATIONS SECTION */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Recommended Learners</h2>
        <p className="text-sm text-neutral-400 mb-6">
          Based on your profile, we think you'd enjoy connecting with these
          people.
        </p>

        {loadingUsers ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : recommendedUsers.length === 0 ? (
          <div className="bg-neutral-900 p-6 rounded-md text-center border border-neutral-800">
            <h3 className="text-lg font-medium">No recommendations</h3>
            <p className="text-sm text-neutral-500">
              Check back later for new matches.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedUsers.map((user) => {
              const requestSent = outgoingRequestsIds.has(user._id);

              return (
                <div
                  key={user._id}
                  className="bg-neutral-900 border border-neutral-700 text-white p-5 rounded-xl hover:shadow-md hover:scale-[1.01] transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border border-neutral-700">
                      <img
                        src={user.profilePic}
                        alt={user.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{user.fullName}</h3>
                      {user.location && (
                        <p className="flex items-center gap-1 text-sm text-neutral-400">
                          <MapPin size={14} />
                          {user.location}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs mb-3">
                    <div className="flex items-center gap-1 bg-indigo-700 text-white px-3 py-1 rounded-full">
                      {getLanguageFlag(user.nativeLanguage) && (
                        <img
                          src={getLanguageFlag(user.nativeLanguage)}
                          alt="flag"
                          className="h-3 w-4"
                        />
                      )}
                      Native: {capitialize(user.nativeLanguage)}
                    </div>

                    <div className="flex items-center gap-1 border border-indigo-400 text-indigo-300 px-3 py-1 rounded-full">
                      {getLanguageFlag(user.learningLanguage) && (
                        <img
                          src={getLanguageFlag(user.learningLanguage)}
                          alt="flag"
                          className="h-3 w-4"
                        />
                      )}
                      Learning: {capitialize(user.learningLanguage)}
                    </div>
                  </div>

                  {user.bio && (
                    <p className="text-sm text-neutral-400 mb-3 line-clamp-2">
                      {user.bio}
                    </p>
                  )}

                  <button
                    onClick={() => sendRequestMutation(user._id)}
                    disabled={requestSent || isPending}
                    className={`btn btn-sm w-full flex items-center justify-center gap-2 rounded-full transition-colors ${
                      requestSent
                        ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white"
                    }`}
                  >
                    {requestSent ? (
                      <>
                        <CheckCircle size={16} />
                        Request Sent
                      </>
                    ) : (
                      <>
                        <UserPlus size={16} />
                        Add Friend
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
