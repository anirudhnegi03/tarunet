import { Link } from "react-router";
import { MessageCircle } from "lucide-react";
import { getLanguageFlag } from "../lib/utils";

const FriendCard = ({ friend }) => {
  return (
    <div className="bg-neutral-900 border border-neutral-700 text-white p-5 rounded-xl hover:shadow-md hover:scale-[1.01] transition-all">
      {/* Avatar & Name */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full overflow-hidden border border-neutral-700">
          <img
            src={friend.profilePic}
            alt={friend.fullName}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium text-lg">{friend.fullName}</h3>
          {friend.location && (
            <p className="text-sm text-neutral-400">{friend.location}</p>
          )}
        </div>
      </div>

      {/* Languages */}
      <div className="flex flex-wrap gap-2 text-xs mb-4">
        {/* Native Language */}
        <div className="flex items-center gap-1 bg-indigo-700 text-white px-3 py-1 rounded-full">
          {getLanguageFlag(friend.nativeLanguage) && (
            <img
              src={getLanguageFlag(friend.nativeLanguage)}
              alt="flag"
              className="h-3 w-4"
            />
          )}
          <span>Native: {friend.nativeLanguage}</span>
        </div>

        {/* Learning Language */}
        <div className="flex items-center gap-1 border border-indigo-500 text-indigo-300 px-3 py-1 rounded-full">
          {getLanguageFlag(friend.learningLanguage) && (
            <img
              src={getLanguageFlag(friend.learningLanguage)}
              alt="flag"
              className="h-3 w-4"
            />
          )}
          <span>Learning: {friend.learningLanguage}</span>
        </div>
      </div>

      {/* Optional Bio */}
      {friend.bio && (
        <p className="text-sm text-neutral-400 mb-3 line-clamp-2">
          {friend.bio}
        </p>
      )}

      {/* Message Button */}
      <Link
        to={`/chat/${friend._id}`}
        className="btn btn-sm bg-indigo-600 hover:bg-indigo-500 text-white w-full flex items-center justify-center gap-2 rounded-full"
      >
        <MessageCircle size={16} />
        <span>Message</span>
      </Link>
    </div>
  );
};

export default FriendCard;
