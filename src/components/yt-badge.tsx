import localFont from "next/font/local";
import { FaYoutube } from "react-icons/fa6";
import { Badge } from "./ui/badge";

const grifter = localFont({
  src: "../../public/fonts/grifterbold.otf",
});

function YtBadge() {
  return (
    <Badge
      className={`${grifter.className} flex items-center justify-center text-base bg-white text-black border-border shadow-xl`}
    >
      <FaYoutube color="#FF0000" />
      <span className="ml-2 mt-1">Built by Kamo 👨🏾‍💻</span>
    </Badge>
  );
}

export default YtBadge;
