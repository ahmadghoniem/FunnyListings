import React, { useCallback, useState } from "react";
import placeholderImg from "@/assets/images/placeholder.png";
import ListingInfo from "@/components/CardInfo";
import NSFWFilter from "nsfw-filter";

import { cn } from "@/lib/utils";
const Listing = React.forwardRef(({ isSubmitted, className }, ref) => {
  const [image, setImage] = useState(null);
  const handleFileChange = useCallback(
    async (e) => {
      const file = e.target.files[0];
      const isSafe = await NSFWFilter.isSafe(file);
      console.log("hey this image is .." + isSafe);

      if (e.target.files && e.target.files[0]) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (e) => {
          setImage(e.target.result);
        };
      }
    },
    [setImage],
  );

  return (
    <div
      ref={ref}
      id="card-container"
      className={cn(
        "h-full w-full max-w-xs overflow-hidden rounded-lg",
        isSubmitted && "hidden",
        className,
      )}
    >
      <div
        id="image-container"
        className="flex aspect-square w-80 flex-col items-center justify-center overflow-hidden rounded-lg bg-[#0000000d]"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="h-0 opacity-0"
          id="image_input"
        />
        <label htmlFor="image_input" className=" block hover:cursor-pointer">
          <img
            className="object-contain"
            alt="preview image"
            src={image || placeholderImg}
          />
        </label>
      </div>
      <ListingInfo />
    </div>
  );
});
Listing.displayName = "Listing";
export default Listing;
