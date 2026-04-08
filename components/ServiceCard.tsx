import { Services } from "@/types/service";
import Image from "next/image";
import { FC, JSX } from "react";

interface ServiceCardProps {
  verified: boolean;
  title: string;
  description: string;
  profilePicture: string;
  services: Services[];
}

const ServiceCard: FC<ServiceCardProps> = ({
  verified,
  title,
  description,
  profilePicture,
  services,
}: ServiceCardProps): JSX.Element => {
  return (
    <div className={`rounded-2xl border border-primary-100 bg-white/80 p-4 flex flex-col gap-3 shadow-sm`}>
      <div className={`flex items-center gap-3`}>
        <Image
          src={profilePicture}
          alt={`${title} profile`}
          className={`w-12 h-12 rounded-full object-cover border border-primary-100`}
          width={48}
          height={48}
        />
        <div className={`flex flex-col`}> 
          <span className={`font-semibold text-primary`}>{title}</span>
          <span className={`text-sm text-primary/80`}>{description}</span>
        </div>
      </div>
      <div className={`flex items-center gap-2 text-sm text-primary/80`}>
        {verified && <span className={`px-2 py-1 text-xs rounded-full bg-primary-100/60 text-primary`}>Verified</span>}
        <span>{services.length} services</span>
      </div>
    </div>
  );
};

export default ServiceCard;
