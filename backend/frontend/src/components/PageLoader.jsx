import { LoaderIcon } from "lucide-react";
import React from "react";

const PageLoader = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100/80 backdrop-blur-sm animate-fade-in">
      <LoaderIcon className="animate-spin size-10 text-primary mb-4" />
      <p className="text-base-content text-lg opacity-70">{message}</p>
    </div>
  );
};

export default PageLoader;
