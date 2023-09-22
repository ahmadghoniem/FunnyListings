import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

const EditableContent = ({ ...props }) => {
  return <Slot contentEditable suppressContentEditableWarning {...props} />;
};

export default EditableContent;
