"use client";

import { User } from "@prisma/client";
import useActiveList from "../hooks/useActiveList";
import Image from "next/image";

interface AvatarProps {
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className="relative">
      <div
        className="
        relative
        inline-block
        rounded-full
        overflow-hidden
        h-9
        w-9
        md:h-11
        md:w-11
      "
      >
        {user?.image ? (
          <Image
            fill
            src={user?.image || "/assets/placeholder.jpg"}
            alt="Avatar"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-4xl bg-neutral-100">
            {user?.name?.toString().toUpperCase().charAt(0)}
          </div>
        )}
      </div>
      {isActive ? (
        <span
          className="
            absolute 
            block 
            rounded-full 
            bg-green-500 
            top-0 
            right-0
            h-2 
            w-2 
            md:h-3 
            md:w-3
          "
        />
      ) : null}
    </div>
  );
};

export default Avatar;
