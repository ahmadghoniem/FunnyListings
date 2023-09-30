import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useImperativeHandle, forwardRef, useRef } from "react";

const PostSubmit = forwardRef(({ XHandle, setIsSubmitted, className }, ref) => {
  const downloadBtnRef = useRef(null);
  const deleteBtnRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        setAnchorSrcToBase64Img(generatedImageBase64) {
          console.log(generatedImageBase64);
          downloadBtnRef.current.href = generatedImageBase64;
        },
        disableDeleteBtn() {
          deleteBtnRef.current.disabled = true;
        },
        enableDeleteBtn() {
          deleteBtnRef.current.disabled = false;
        },
      };
    },
    [],
  );

  return (
    <div className={cn("mt-1 flex flex-col gap-1", className)}>
      {XHandle && <p>{XHandle}</p>}
      <div className="flex flex-row justify-between gap-1">
        <Button
          type="button"
          variant="secondary"
          className="mr-2 flex-1"
          onClick={() => setIsSubmitted(false)}
        >
          New one?
        </Button>
        <Button
          variant="default"
          className="cursor-pointer"
          ref={downloadBtnRef}
          asChild
        >
          <a download>Download</a>
        </Button>

        {/** TODO: are  you sure you want to delete! */}
        {/*         <Button ref={deleteBtnRef} variant="destructive">
          Delete
        </Button> */}
      </div>
    </div>
  );
});
PostSubmit.displayName = "PostSubmit";

export default PostSubmit;
