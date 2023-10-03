import SkeletonReel from "@/components/SkeletonReel";
import { intlFormatDistance } from "date-fns";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { supabaseClient } from "@/store/supabaseClient";
import Loader from "@/assets/images/loader.svg?react";

const ShowReel = forwardRef((props, ref) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const observerRef = useRef(null);
  const loaderRef = useRef(null);
  const [offset, setOffset] = useState(null);

  const [fetchedData, setFetchedData] = useState([]);
  const [lastFetched, setLastFetched] = useState(() => new Date().getTime());
  const PAGE_COUNT = 3;

  const fetchData = useCallback(async (offset) => {
    const from = offset * PAGE_COUNT;
    const to = from + PAGE_COUNT - 1;
    return await supabaseClient
      .from("public")
      .select("*")
      .range(from, to)
      .order("created_at", { ascending: false });
  }, []);

  useEffect(() => {
    const listenToDbChange = async () => {
      supabaseClient
        .channel("any")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "public" },
          (payload) => {
            console.log(payload);

            if (payload.eventType === "INSERT") {
              console.log("insert detected");
              setFetchedData((prevData) => {
                console.log([payload.new, ...prevData]);
                return [payload.new, ...prevData];
              });
            } else if (payload.eventType === "DELETE") {
              setFetchedData((prevData) =>
                prevData.filter((datum) => datum.id !== payload.old.id),
              );
            }
            setLastFetched(payload.commit_timestamp);
          },
        )
        .subscribe();
    };
    listenToDbChange();

    const fetchOnMount = async () => {
      const { data } = await fetchData(0);
      setFetchedData(data);
    };
    fetchOnMount();
    // laod data once
  }, []);

  const loadMoreData = useCallback(async (offset) => {
    setIsLoading(true);
    // Pass the current offset
    const { data: newData } = await fetchData(offset);
    setFetchedData((prevData) => [...prevData, ...newData]);

    if (newData.length < PAGE_COUNT) {
      setIsLast(true);
    }
    setOffset((prev) => prev + 1);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Create the IntersectionObserver if it doesn't exist yet
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          // Get the current offset as a number
          let currentOffset = parseInt(target.target.dataset.offset) || 0;
          // Increment the offset
          currentOffset += 1;
          // Set the updated offset
          target.target.dataset.offset = currentOffset;

          loadMoreData(currentOffset);
        }
      });
    }

    if (loaderRef.current) {
      observerRef.current.observe(loaderRef.current);
    }

    if (loaderRef.current && isLast) {
      observerRef.current.unobserve(loaderRef.current);
    }

    // Stop observing and clean up when isLast changes
    return () => {
      observerRef.current.disconnect();
    };
  }, [isLast]);

  return (
    <section ref={ref} className="mt-6 flex min-h-screen flex-col gap-6">
      <div className="self-start">
        <p className="text-2xl">See what other people made!</p>
        <p className="text-sm">
          last Updated: {intlFormatDistance(new Date(lastFetched), Date.now())}
        </p>
      </div>

      <div className="mx-auto grid grid-cols-6 items-center gap-y-8  md:gap-x-[calc((768px-(18rem*2))/3)] lg:gap-x-[calc((1024px-(18rem*3))/4)]">
        {fetchedData?.length > 0 ? (
          fetchedData.map(({ id, created_at, image_base64, X_handle }) => (
            <div
              className="col-span-6 max-w-[17.5rem] md:col-span-3 lg:col-span-2"
              key={id}
            >
              <img src={image_base64} loading="lazy" className="rounded-lg" />
              <div className="mt-1 flex flex-row justify-between text-sm">
                <p>By {X_handle || "Unknown"} </p>
                <span className="text-foreground/80">
                  {intlFormatDistance(new Date(created_at), Date.now())}
                </span>
              </div>
            </div>
          ))
        ) : (
          <SkeletonReel />
        )}
      </div>
      <div ref={loaderRef} data-offset={0} className="mx-auto text-3xl">
        {isLoading && <Loader className="h-7 w-7" />}
      </div>
      {isLast && <p>you reached the end of the page</p>}
    </section>
  );
});
ShowReel.displayName = "ShowReel";

export default ShowReel;
