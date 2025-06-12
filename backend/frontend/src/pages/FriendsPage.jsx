import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getFriendRequests,
  getUserFriends,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
} from "../lib/api";
import { CheckIcon, XIcon, UserMinusIcon } from "lucide-react";

const FriendsPage = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { data: friends = [] } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const acceptMutation = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries(["friendRequests", "myFriends"]),
  });

  const rejectMutation = useMutation({
    mutationFn: rejectFriendRequest,
    onSuccess: () => queryClient.invalidateQueries(["friendRequests"]),
  });

  const removeMutation = useMutation({
    mutationFn: removeFriend,
    onSuccess: () => queryClient.invalidateQueries(["myFriends"]),
  });

  if (isLoading) return <div className="p-4 text-white">Loading...</div>;

  const incoming = data?.incomingReqs || [];

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">Incoming Friend Requests</h2>
      <ul className="space-y-3">
        {incoming.length === 0 && (
          <p className="text-gray-400">No incoming requests</p>
        )}
        {incoming.map((req) => (
          <li
            key={req._id}
            className="flex items-center justify-between bg-neutral-800 p-3 rounded-md"
          >
            <div>
              <p className="font-medium">{req.sender.fullName}</p>
              <p className="text-sm text-gray-400">
                {req.sender.nativeLanguage} → {req.sender.learningLanguage}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => acceptMutation.mutate(req._id)}
                className="p-2 rounded bg-green-600 hover:bg-green-700"
              >
                <CheckIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => rejectMutation.mutate(req._id)}
                className="p-2 rounded bg-red-600 hover:bg-red-700"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-4">My Friends</h2>
      <ul className="space-y-3">
        {friends.length === 0 && (
          <p className="text-gray-400">No friends added</p>
        )}
        {friends.map((friend) => (
          <li
            key={friend._id}
            className="flex items-center justify-between bg-neutral-800 p-3 rounded-md"
          >
            <div>
              <p className="font-medium">{friend.fullName}</p>
              <p className="text-sm text-gray-400">
                {friend.nativeLanguage} → {friend.learningLanguage}
              </p>
            </div>
            <button
              onClick={() => removeMutation.mutate(friend._id)}
              className="p-2 rounded bg-gray-700 hover:bg-gray-600"
            >
              <UserMinusIcon className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsPage;
