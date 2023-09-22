import { useCallback, useRef } from "react";
import {} from "@supabase/supabase-js";
import ListingGenerator from "@/features/ListingGenerator";
import ShowReel from "@/features/ShowReel";
import Header from "@/features/Header";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

function App() {
  const showReelRef = useRef(null);
  const { toast } = useToast();

  const insertRow = useCallback(
    async ({ X_handle, image_base64 }) => {
      toast({
        title: "uploading",
        description: "your image is being uploaded to our system",
      });
      const res = await fetch(
        "https://plum-starfish-main-4a95da6.d2.zuplo.dev/api/insertRow",
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
    [toast],
  );

  return (
    <>
      <Header />
      <main className=" flex flex-col items-center justify-center">
        <ListingGenerator insertRow={insertRow} />
        <ShowReel ref={showReelRef} />
      </main>
      <Toaster />
    </>
  );
}

export default App;
