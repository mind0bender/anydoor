import { Services } from "@/types/service";
import { FC, JSX } from "react";

interface ServiceCardProps {
  verified: boolean;
  title: string;
  description: string;
  profilePicture: string;
  services: Services[];
}

const ServiceCard: FC = ({
  verified,
  title,
  description,
  profilePicture,
  services,
}: ServiceCardProps): JSX.Element => {
  return (
    <div>
      <div>
        <div></div>
      </div>
      <div></div>
    </div>
  );
};
