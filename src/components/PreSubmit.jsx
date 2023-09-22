import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const PreSubmit = forwardRef(({ XHandle, className, handleSubmit }, ref) => {
  const inputBtnRef = useRef(null);
  const submitBtnRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        disableSubmitBtn() {
          submitBtnRef.current.disabled = true;
        },
        enableSubmitBtn() {
          submitBtnRef.current.disabled = false;
        },
        // ... whatever else one may need
      };
    },
    [],
  );

  const validateXhandle = useCallback(async (e) => {
    const xHandle = e.currentTarget.value;
    const XUserNameRegex = /^@[A-Za-z0-9_]{4,15}$/;
    if (xHandle !== "") {
      if (XUserNameRegex.test(xHandle)) {
        inputBtnRef.current.dataset.isValidHandle = true;
        submitBtnRef.current.disabled = false;
      } else {
        inputBtnRef.current.dataset.isValidHandle = false;
        submitBtnRef.current.disabled = true;
      }
    } else {
      inputBtnRef.current.dataset.isValidHandle = null;
      submitBtnRef.current.disabled = false;
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-row items-center justify-center gap-4",
        className,
      )}
    >
      <Input
        defaultValue={XHandle}
        ref={inputBtnRef}
        onChange={validateXhandle}
        name="XHandle"
        data-is-valid-handle={null}
        placeholder="@XHandle (optional)"
        className="border-2 border-slate-500 focus-visible:ring-0 data-[is-valid-handle=false]:border-destructive  data-[is-valid-handle=true]:border-green-600"
      />
      <Button ref={submitBtnRef} type="submit">
        Generate
      </Button>
    </form>
  );
});
PreSubmit.displayName = "PreSubmit";
export default PreSubmit;
