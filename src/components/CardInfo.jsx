import EditableContent from "@/components/EditableContent";
const ListingInfo = () => {
  return (
    <div id="card-info" className="mx-1 my-[0.375rem]">
      <EditableContent>
        <h3 className="mb-[0.3125rem] font-normal">
          Fedora Owned and Signed by the Legendary Tom Waits
        </h3>
      </EditableContent>
      <div
        className="mt-[0.125rem] flex flex-col gap-[0.3125rem]"
        id="card-details"
      >
        <div className="flex flex-row justify-between">
          <EditableContent>
            <span className="text-base font-bold">$4,100.00</span>
          </EditableContent>
          <EditableContent>
            <span className="pt-1 font-medium text-[#707070]">56 bids</span>
          </EditableContent>
        </div>
        <div className="flex flex-row items-start justify-between font-medium text-[#707070]">
          <EditableContent>
            <span>$69.40 shipping</span>
          </EditableContent>
          <EditableContent>
            <span className="pt-1 text-[#707070]">5d 20h</span>
          </EditableContent>
        </div>
        <p className="text-[#e0103a]">Benefits charity</p>
      </div>
    </div>
  );
};

export default ListingInfo;
