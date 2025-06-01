
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
    <div className="bg-black/70 p-4 rounded-md text-center border border-mdh-red/20">
      <div className="w-32 h-32 mx-auto mb-4 border-3 border-mdh-gold rounded-full overflow-hidden">
        <Avatar className="w-full h-full">
          <AvatarImage src={image} alt={name} className="object-cover" />
          <AvatarFallback className="bg-mdh-gold text-black font-bold">{fallback}</AvatarFallback>
        </Avatar>
      </div>
      <h3 className="text-mdh-gold font-bold">{name}</h3>
      <p className="text-gray-400 text-sm">{role}</p>
    </div>
  );
};

export default TeamMember;
