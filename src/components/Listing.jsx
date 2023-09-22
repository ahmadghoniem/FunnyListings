import React from "react";
import placeholderImg from "@/assets/images/placeholder.png";
import ListingInfo from "@/components/CardInfo";

import { cn } from "@/lib/utils";
const Listing = React.forwardRef(
  ({ handleFileChange, image, isSubmitted, className }, ref) => {
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
  },
);
Listing.displayName = "Listing";
export default Listing;
