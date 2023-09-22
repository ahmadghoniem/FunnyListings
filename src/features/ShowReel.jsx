import SkeletonReel from "@/components/SkeletonReel";
import { intlFormatDistance } from "date-fns";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { supabaseClient } from "@/store/supabaseClient";

const ShowReel = forwardRef((props, ref) => {
  const [offset, setOffset] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [lastFetched, setLastFetched] = useState(() => new Date().getTime());
  const PAGE_COUNT = 20;
  const myref = useRef(null);

  const fetchData = useCallback(async (offset, PAGE_COUNT) => {
    console.log("been calledx");
    const from = offset * PAGE_COUNT;
    const to = from + PAGE_COUNT - 1;
    return await supabaseClient
      .from("public")
      .select("*")
      .range(from, to)
      .order("created_at", { ascending: false });
  }, []);

  const loadMoreData = useCallback(
    async (offset) => {
      setIsLoading(true);
      // Every time we fetch, we want to increase
      setOffset((prevOffset) => prevOffset + 1);
      const { data: newData } = await fetchData(offset, PAGE_COUNT);

      setFetchedData((prevData) => [...prevData, ...newData]);

      if (newData.length < PAGE_COUNT) {
        console.log(newData.length, PAGE_COUNT);
        setIsLast(true);
      } else {
        console.log(newData.length, PAGE_COUNT);
      }
      setIsLoading(false);
    },
    [fetchData],
  );

  useEffect(() => {
    const listenToDbChange = async () => {
      supabaseClient
        .channel("any")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "public" },
          (payload) => {
            console.log(payload);
            if (payload.eventType === "INSERT") {
              setFetchedData((prevData) => [payload.new, ...prevData]);
            }
            setLastFetched(payload.commit_timestamp);
          },
        )
        .subscribe();
      const { data: newData } = await fetchData(0, PAGE_COUNT);
      setFetchedData(newData);
    };
    listenToDbChange();
    // laod data once
  }, [fetchData]);

  useEffect(() => {
    if (isInView) {
      console.log("hera MAA");
      loadMoreData(offset);
      // setIsInView(false);
    }
  }, [isInView, loadMoreData]);

  useEffect(() => {
    const handleScroll = () => {
      // return;
      if (myref.current && typeof window !== "undefined") {
        const container = myref.current;
        const { bottom } = container.getBoundingClientRect();
        const { innerHeight } = window;
        setIsInView(innerHeight >= bottom);
      }
    };

    const handleDebouncedScroll = debounce(() => !isLast && handleScroll(), 20);

    window.addEventListener("scroll", handleDebouncedScroll);

    return () => {
      window.removeEventListener("scroll", handleDebouncedScroll);
    };
  }, [myref, isLast]);

  return (
    <section ref={myref} className="mt-6 flex min-h-screen flex-col gap-6">
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
              <img src={image_base64} loading="lazy" />
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
        {isLoading && (
          <p className="mx-auto text-3xl text-green-600">Loading..</p>
        )}
      </div>
    </section>
  );
});
ShowReel.displayName = "ShowReel";

export default ShowReel;
