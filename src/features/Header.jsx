import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GithubIcon, Moon, Sun } from "lucide-react";
import { useContext } from "react";
import ThemeContext from "@/components/ThemeContext";

const Header = () => {
  const { setTheme, currentTheme } = useContext(ThemeContext);
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
      <div className="flex flex-row items-center justify-center gap-2">
        <Button
          onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
          size="sm"
          className="h-8 bg-muted p-2 text-muted-foreground hover:bg-muted hover:text-muted-foreground/90"
        >
          {currentTheme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        <TooltipProvider delayDuration={250}>
          <Tooltip>
            <TooltipTrigger asChild>
              <a href="www.github.com" target="_blank">
                <GithubIcon className="h-5 w-5" />
              </a>
            </TooltipTrigger>
            <TooltipContent sideOffset={5}>
              <p>Project is Opensource!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
};

export default Header;
