
import React from "react";
import { Globe, Server, Wifi, Radio } from "lucide-react";

interface C2ServerTypeIconProps {
  type: string;
  className?: string;
}

const C2ServerTypeIcon = ({ type, className = "h-4 w-4" }: C2ServerTypeIconProps) => {
  switch (type) {
    case "http":
      return <Globe className={className} />;
    case "tcp":
      return <Server className={className} />;
    case "dns":
      return <Wifi className={className} />;
    default:
      return <Radio className={className} />;
  }
};

export default C2ServerTypeIcon;
