import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GithubIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="relative z-10 mt-2 flex items-center justify-between rounded-lg border bg-background p-2 text-sm shadow-md">
      <span className=" self-start">
        From Alexandria with ❤️
        <br /> by{" "}
        <a
          href="https://twitter.com/ahmadghoniem_"
          className="text-blue-600 hover:underline"
        >
          @ahmadghoniem_
        </a>
      </span>
      <span className="absolute left-[45%]">Crazy Wishlisting</span>
      <div className="flex flex-row items-center justify-center">
        <div>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="www.github.com" target="_blank">
                  <GithubIcon className="h-5 w-5" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Project is Opensource!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
};

export default Header;
