import {
  useCallback,
  useEffect,
  useRef,
  useContext,
  forwardRef,
  useLayoutEffect,
} from "react";
import placeHolderLight from "@/assets/images/placeholder.jpg";
import placeHolderDark from "@/assets/images/placeholder_dark.jpg";
import ListingInfo from "@/components/CardInfo";
import { cn } from "@/lib/utils";

import ThemeContext from "@/components/ThemeContext";
import { useToast } from "@/components/ui/use-toast";

const Listing = forwardRef(({ isSubmitted, className, checkIsSafe }, ref) => {
  const { currentTheme } = useContext(ThemeContext);
  const imgRef = useRef(null);
  const inputRef = useRef(null);
  const { toast } = useToast();

  useLayoutEffect(() => {
    if (imgRef.current.dataset.isSafe === undefined) {
      imgRef.current.src =
        currentTheme === "dark" ? placeHolderDark : placeHolderLight;
    }
  }, [currentTheme]);
  // console.log(imgRef.current.src);

  const handleFileChange = (e) => {
    console.log(e.currentTarget.files);
    const imgFile = e.currentTarget.files[0];

    if (imgFile && e.currentTarget.files) {
      let reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.onload = async (e) => {
        //sets the isSafe
        const isSafe = await checkIsSafe(imgFile);
        imgRef.current.dataset.isSafe = isSafe;
        if (!isSafe) {
          toast({
            title: "Error",
            description: `Image contains NSFW (not suitable for work) content,
            please choose a different image.`,
          });
        }
        imgRef.current.src = e.target.result;
      };
    }
  };
  const handleDropEvent = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;

    // Create a change event
    const changeEvent = new Event("change", {
      bubbles: true,
      cancelable: false,
    });

    // find the first dropped image (the user could drop more than one file and they may not be images)
    let firstDroppedImg = Array.from(droppedFiles).find((file) =>
      file.type.startsWith("image/"),
    );

    if (droppedFiles.length > 1) {
      toast({
        title: "Multiple selection",
        description: `Multiple files were selected, but only the first image,
         "${firstDroppedImg.name}", will be processed.`,
      });
    }
    // creates a new FileList as the input expects a fileList
    const droppedImgList = new DataTransfer();
    droppedImgList.items.add(firstDroppedImg);

    inputRef.current.files = droppedImgList.files;

    // Dispatch the change event
    inputRef.current.dispatchEvent(changeEvent);
  };
  return (
    <div
      ref={ref}
      id="card-container"
      className={cn(
        "z-10 h-full w-full max-w-xs overflow-hidden rounded-lg border border-border",
        isSubmitted && "hidden",
        className,
      )}
    >
      <div
        id="image-container"
        className="flex aspect-square w-80 flex-col items-center justify-center overflow-hidden rounded-lg bg-muted"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropEvent}
      >
        <input
          type="file"
          ref={inputRef}
          accept="image/*"
          onChange={handleFileChange}
          multiple={false}
          className="h-0 opacity-0"
          id="image_input"
        />
        <label htmlFor="image_input" className="block hover:cursor-pointer">
          <img
            ref={imgRef}
            className="object-contain data-[is-safe=false]:blur-xl"
            alt="preview image"
            src=""
          />
        </label>
      </div>
      <ListingInfo />
    </div>
  );
});
Listing.displayName = "Listing";
export default Listing;

// if (!isSafe) {
//   const originalImage = new Image();
//   originalImage.src = e.target.result;
//   originalImage.style.filter = "blur(100px)"; // Adjust this value for the desired blur intensity

//   const canvas = document.createElement("canvas");
//   canvas.width = originalImage.width;
//   canvas.height = originalImage.height;

//   const context = canvas.getContext("2d");
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   // Draw the original image onto the canvas
//   context.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

//   // Apply a blur filter to the canvas
//   context.filter = "blur(101px)";
//   context.drawImage(canvas, 0, 0, canvas.width, canvas.height);

//   const blurredDataURL = canvas.toDataURL();
//   setImage(blurredDataURL);
//   return;
// }

//using mutation observer to observe the dark className on the root documentElement
// useEffect(() => {
//   function callback(mutationList) {
//     mutationList.forEach((mutation) => {
//       switch (mutation.type) {
//         case "attributes":
//           switch (mutation.attributeName) {
//             case "class":
//               setIsDark(
//                 Array.from(mutation.target.classList).includes("dark"),
//               );
//               break;
//           }
//           break;
//       }
//     });
//   }

//   const observer = new MutationObserver(callback);
//   observer.observe(document.documentElement, {
//     attributeFilter: ["class"],
//     attributeOldValue: true,
//   });
// }, []);
