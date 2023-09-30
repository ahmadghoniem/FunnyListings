import { useCallback, useRef, useState } from "react";
import {} from "@supabase/supabase-js";
import ListingGenerator from "@/features/ListingGenerator";
import ShowReel from "@/features/ShowReel";
import Header from "@/features/Header";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import ThemeProvider from "@/components/ThemeProvider";
import NSFWFilter from "nsfw-filter";

function App() {
  const showReelRef = useRef(null);
  const { toast } = useToast();
  const [isSafe, setIsSafe] = useState(undefined);

  const checkIsSafe = async (imgFile) => {
    const isSafe = await NSFWFilter.isSafe(imgFile);
    setIsSafe(isSafe);
    return isSafe;
  };
  const insertRow = useCallback(
    async ({ X_handle, image_base64 }) => {
      if (!isSafe) {
        toast({
          title: "Upload Failed",
          description: `Image contains NSFW (not suitable for work) content,
           please try again later`,
        });
        return;
      }

      toast({
        title: "uploading",
        description: "your image is being uploaded to our system",
      });
      const res = await fetch(
        "https://ag-main-ee26f17.d2.zuplo.dev/api/insertRow",
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          body: JSON.stringify({ X_handle, image_base64 }), // body data type must match "Content-Type" header
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.ok) {
        toast({
          title: "Uploaded",
          description: "your image just got uploaded to our system.",
          action: (
            <ToastAction
              altText="scroll-to-view"
              onClick={() => {
                showReelRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "nearest",
                });
              }}
            >
              Show Image
            </ToastAction>
          ),
        });
      } else if (!res.ok && res.status === 429) {
        console.dir(res);
        toast({
          title: "Erorr",
          description: "Rate limit exceeded, please try again in a minute.",
        });
      } else {
        toast({
          title: "Erorr",
          description: "Something went wrong, please try again later.",
        });
      }
    },
    [toast, isSafe],
  );

  return (
    <>
      <ThemeProvider>
        <Header />
        <main className=" flex flex-col items-center justify-center">
          <ListingGenerator
            insertRow={insertRow}
            checkIsSafe={checkIsSafe}
            isSafe={isSafe}
          />
          <ShowReel ref={showReelRef} />
        </main>
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
