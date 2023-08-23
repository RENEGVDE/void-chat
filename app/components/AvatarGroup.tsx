"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarGroupProps {
  users?: User[];
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users = [] }) => {
  const slicedUsers = users.slice(0, 3);

  const positionMap = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };

  return (
    <div className="relative h-11 w-11">
      {slicedUsers.map((user, index) => (
        <div
          key={user.id}
          className={`
            absolute
            inline-block 
            rounded-full 
            overflow-hidden
            h-[21px]
            w-[21px]
            ${positionMap[index as keyof typeof positionMap]}
          `}
        >
          {user?.image ? (
            <Image
              fill
              src={user?.image || "/assets/placeholder.jpg"}
              alt="Avatar"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-4xl bg-neutral-600">
              {user?.name?.toString().toUpperCase().charAt(0)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
