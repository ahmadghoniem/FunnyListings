import SkeletonReel from "@/components/SkeletonReel";
import { intlFormatDistance } from "date-fns";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { supabaseClient } from "@/store/supabaseClient";
import Loader from "@/assets/images/loader.svg?react";

const ShowReel = forwardRef((props, ref) => {
  const [offset, setOffset] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const observerRef = useRef(null);
  const loaderRef = useRef(null);

  const [fetchedData, setFetchedData] = useState([]);
  const [lastFetched, setLastFetched] = useState(() => new Date().getTime());
  const PAGE_COUNT = 3;

  const fetchData = useCallback(async () => {
    const from = offset * PAGE_COUNT;
    const to = from + PAGE_COUNT - 1;
    return await supabaseClient
      .from("public")
      .select("*")
      .range(from, to)
      .order("created_at", { ascending: false });
  }, [offset]);

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
              setFetchedData((prevData) => [payload.new, ...prevData]);
            } else if (payload.eventType === "DELETE") {
              console.log(payload);
              setFetchedData((prevData) => [
                ...prevData.filter((datum) => datum.id === payload.old.id),
              ]);
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

  const loadMoreData = useCallback(async () => {
    setIsLoading(true);
    // Every time we fetch, we want to increase
    const { data: newData } = await fetchData();
    setFetchedData((prevData) => [...prevData, ...newData]);
    console.log(newData.length);

    if (newData.length < PAGE_COUNT) {
      setIsLast(true);
    }
    setOffset((prevOffset) => prevOffset + 1);
    setIsLoading(false);
  }, [fetchData]);

  useEffect(() => {
    // Create the IntersectionObserver if it doesn't exist yet
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          loadMoreData();
        }
      });
    }

    if (loaderRef.current) {
      observerRef.current.observe(loaderRef.current);
    }

    // Stop observing and clean up when isLast changes
    return () => {
      if (loaderRef.current) {
        observerRef.current.unobserve(loaderRef.current);
      }
    };
  }, [isLast, loaderRef, loadMoreData]);

  return (
    <section ref={ref} className="mt-6 flex min-h-screen flex-col gap-6">
      <div className="self-start">
        <p className="text-2xl">See what other people made!</p>
        <p className="text-sm">
          last Updated: {intlFormatDistance(new Date(lastFetched), Date.now())}
        </p>
      </div>

      <div className="grid grid-cols-6 items-center gap-y-8 md:gap-x-[calc((768px-(18rem*2))/3)] lg:gap-x-[calc((1024px-(18rem*3))/4)]">
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
      <div ref={loaderRef} className="mx-auto text-3xl ">
        {isLoading && <Loader className="h-7 w-7" />}
      </div>
      {isLast && <p>you reached the end of the page</p>}
    </section>
  );
});
ShowReel.displayName = "ShowReel";

export default ShowReel;
