import { toPng } from "html-to-image";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Listing from "@/components/Listing";
import PreSubmit from "@/components/PreSubmit";
import PostSubmit from "@/components/PostSubmit";
import HintsLayer from "@/components/HintsLayer";
import ThemeContext from "@/components/ThemeContext";

const ListingGenerator = ({ insertRow, checkIsSafe, isSafe }) => {
  const { currentTheme } = useContext(ThemeContext);

  const listingRef = useRef(null);
  const ListingImageRef = useRef(null);
  const postSubmitRef = useRef(null);
  const preSubmitRef = useRef(null);
  const [XHandle, setXHandle] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(null);

  useEffect(() => {
    if (!isSafe) preSubmitRef.current.disableSubmitBtn();
    else preSubmitRef.current.enableSubmitBtn();
  }, [isSafe]);

  const generateImage = useCallback(async () => {
    if (listingRef.current === null) return;
    // generates image
    try {
      const generatedImageBase64 = await toPng(listingRef.current, {
        cacheBust: true,
        backgroundColor:
          currentTheme === "light" ? "hsl(0 0% 100%)" : "hsl(229 84% 5%)",
      });
      return generatedImageBase64;
    } catch (err) {
      alert(err);
    }
  }, [listingRef, currentTheme]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const xHandleValue = e.currentTarget.XHandle.value;
      setXHandle(xHandleValue);
      // generate Img from DOM content using Html-to-img
      // toPng so we can get a transparent background
      // if you set isSubmitted to true before generating the image it will be an empty image
      const generatedImageBase64 = await generateImage();
      ListingImageRef.current.src = generatedImageBase64;

      // update database rows
      insertRow({
        X_handle: xHandleValue,
        image_base64: generatedImageBase64,
      });
      // change the src of the final image rendered to the user
      setIsSubmitted(true);
      postSubmitRef.current.setAnchorSrcToBase64Img(generatedImageBase64);
    },

    [generateImage, insertRow, setIsSubmitted, setXHandle],
  );

  return (
    <section className="relative flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center">
      <HintsLayer className="" />
      <div className="z-10">
        <Listing
          isSubmitted={isSubmitted}
          ref={listingRef}
          checkIsSafe={checkIsSafe}
          disableSubmitBtn={preSubmitRef.current?.disableSubmitBtn}
        />
        <img
          ref={ListingImageRef}
          // will be filled later after the finalImage has been generated
          src=""
          className={cn("max-w-xs rounded-lg", !isSubmitted && "hidden")}
        />
        <PreSubmit
          ref={preSubmitRef}
          XHandle={XHandle}
          handleSubmit={handleSubmit}
          className={isSubmitted && "hidden"}
          isSafe={isSafe}
        />
        <PostSubmit
          ref={postSubmitRef}
          XHandle={XHandle}
          setIsSubmitted={setIsSubmitted}
          className={!isSubmitted && "hidden"}
        />
      </div>
    </section>
  );
};

export default ListingGenerator;

// {!isSubmitted ? (
//   <PreSubmit
//     ref={preSubmitRef}
//     XHandle={XHandle}
//     handleSubmit={handleSubmit}
//   />
// ) : (
//   <PostSubmit
//     ref={postSubmitRef}
//     XHandle={XHandle}
//     setIsSubmitted={setIsSubmitted}
//   />
// )}
