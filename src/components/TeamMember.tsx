
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  fallback: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image, fallback }) => {
  return (
    <div className="bg-black/70 rounded-md text-center border border-mdh-red/20 overflow-hidden relative">
      <div className="w-full h-full relative">
        <Avatar className="w-full h-full rounded-none">
          <AvatarImage src={image} alt={name} className="object-cover w-full h-full" />
          <AvatarFallback className="bg-mdh-gold text-black font-bold rounded-none w-full h-full flex items-center justify-center text-2xl">{fallback}</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4">
          <h3 className="text-mdh-gold font-bold">{name}</h3>
          <p className="text-gray-400 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
