import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import Loader from "@/components/ui/Loader";

const FakeReel = forwardRef((props, ref) => {
  const [offset, setOffset] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const loaderRef = useRef(null);

  const fetchData = useCallback(async (offset, PAGE_COUNT) => {
    console.log("been calledx");
    // const from = offset * PAGE_COUNT;
    // const to = from + PAGE_COUNT - 1;
    // return await supabaseClient
    //   .from("public")
    //   .select("*")
    //   .range(from, to)
    //   .order("created_at", { ascending: false });
  }, []);

  const loadMoreData = useCallback(async (offset) => {
    setIsLoading(true);
    // Every time we fetch, we want to increase

    const ss = await new Promise((res) => setTimeout(res, 1000, offset));
    console.log(ss);
    setOffset((prevOffset) => prevOffset + 1);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        console.log("intersecting");
        loadMoreData(offset);
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    if (isLast) {
      observer.unobserve(loaderRef.current);
    }
    // return () => {
    //   if (loaderRef.current) {
    //     observer.unobserve(loaderRef.current);
    //   }
    // };
  }, [fetchData, loadMoreData, isLast]);

  return (
    <section
      ref={ref}
      className="mt-6 flex min-h-screen flex-col items-center justify-center gap-6"
    >
      <div>
        <ul>
          <li>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit,
            similique illo doloremque corrupti aliquam, praesentium vitae natus
            ex magnam maxime quaerat, labore quisquam molestiae mollitia qui
            impedit quia reiciendis voluptates!
          </li>
          <li>
            A, voluptatem. Officiis officia quae itaque, neque optio corrupti
            autem corporis recusandae. Delectus voluptatem a, corrupti iure
            modi, eveniet, quaerat vel quidem voluptatum pariatur excepturi quas
            corporis esse! Voluptates, nisi.
          </li>
          <li>
            Consequatur doloribus mollitia ipsa autem iure adipisci at
            necessitatibus pariatur ipsam velit ipsum, itaque eos voluptatem
            dolore excepturi odio exercitationem inventore tempore, beatae
            fugiat, aspernatur rem. Commodi aspernatur blanditiis eos?
          </li>
          <li>
            Reprehenderit repellendus, inventore explicabo nisi et minus cumque
            ullam! Ullam harum sit ratione, dicta aliquid non voluptas
            praesentium placeat ex impedit corporis quaerat blanditiis, libero
            eaque tenetur quod, hic debitis.
          </li>
          <li>
            Ducimus, a alias enim reiciendis perferendis error nemo, quidem
            laudantium iure atque voluptatum id vel, non reprehenderit eveniet
            nesciunt culpa vero deserunt consequuntur est iusto commodi. Quam
            neque libero amet?
          </li>
          <li>
            Ipsa eius impedit ratione voluptatibus? Harum ad commodi vitae
            provident excepturi animi dicta. Aperiam inventore rem veritatis
            possimus perspiciatis esse, dolorem nam, iure, dolor voluptate omnis
            voluptatem pariatur qui consequuntur!
          </li>
          <li>
            Incidunt autem et explicabo, doloremque laboriosam libero voluptates
            cumque aliquid, expedita, praesentium in doloribus porro saepe alias
            necessitatibus quo laudantium non! Eligendi distinctio, mollitia
            ullam exercitationem facilis et sit enim!
          </li>
          <li>
            Consequuntur eos expedita repellat veniam nulla officiis esse
            assumenda voluptate ipsam totam, tempore tempora quos quae soluta
            eum obcaecati explicabo quas autem. Facere voluptatem impedit
            doloribus distinctio quod! Reiciendis, autem?
          </li>
          <li>
            Suscipit, ipsum! Totam, quis ratione et ad dolor itaque nulla quidem
            ab qui ullam architecto sunt fuga placeat at ipsa dolores dolore
            eveniet minima molestias accusantium quia eius possimus. Asperiores.
          </li>
          <li>
            Minus optio veritatis esse nihil earum sed laudantium magnam quo,
            reprehenderit vero labore at accusantium fuga nam est. Molestias
            eaque eveniet numquam atque sapiente obcaecati, cum unde deleniti
            eos. Exercitationem.
          </li>
          <li>
            Eum ipsam ratione fugiat nam totam, inventore quaerat illum
            doloremque ut optio voluptatum tempore accusamus, placeat, a iusto
            alias eos modi? Repellat saepe nemo in rerum porro neque nulla modi.
          </li>
          <li>
            Tenetur, deleniti reiciendis sequi voluptas quidem libero!
            Voluptatibus repellat dolores eaque at repudiandae eum ratione
            voluptates sit voluptate, unde tempora quas ut ipsa saepe rem
            similique quod fuga quidem facere.
          </li>
          <li>
            Omnis, explicabo? Culpa adipisci velit veritatis, inventore
            excepturi molestias eligendi non voluptas asperiores quas iusto
            fugiat? Provident laudantium quo tenetur quis voluptatum, tempore
            maxime asperiores esse ea voluptates, nostrum ut!
          </li>
          <li>
            Provident vero autem magni, iste corrupti quo alias accusamus totam
            non minus, eligendi, quia consequuntur cumque voluptas? Natus
            exercitationem ullam nostrum repudiandae asperiores porro quia
            neque, minus sunt earum eos.
          </li>
          <li>
            Libero repellat atque deserunt dolore ab. A incidunt quidem alias
            qui harum, quod quaerat tenetur obcaecati molestiae fuga tempora
            nobis iste eius soluta sed suscipit accusamus quae dignissimos
            eveniet voluptatibus?
          </li>
          <li>
            Deserunt, at, iste repellat dolor rem non excepturi ipsam aut
            incidunt aperiam voluptate perspiciatis ratione deleniti similique,
            enim minus. Doloremque totam maxime magni odit quia eveniet
            blanditiis unde ipsum ad!
          </li>
          <li>
            Tempora nam maiores, omnis provident quisquam iusto. Exercitationem
            quis accusamus nesciunt fugiat? Repudiandae corporis hic reiciendis,
            eligendi, quisquam impedit consequatur veritatis ipsam voluptate
            autem ea atque voluptatum, reprehenderit quo tenetur.
          </li>
          <li>
            Recusandae modi dolores corporis repudiandae labore. Consectetur
            voluptatem doloremque optio voluptas sunt temporibus laudantium
            aliquam sed officia maxime ducimus pariatur omnis obcaecati nobis
            similique ex unde officiis porro, consequatur veniam.
          </li>
          <li>
            Quos vero quo reprehenderit molestias iste quidem voluptates
            repellat pariatur nulla veniam sit rem quam sunt temporibus,
            perferendis cumque consequatur tempore ipsam mollitia nesciunt quasi
            saepe culpa amet iure! Sit.
          </li>
          <li>
            Ea autem impedit dicta fuga ratione, beatae alias quaerat reiciendis
            inventore, ducimus quisquam eligendi doloremque laboriosam adipisci
            exercitationem dolor quia rem. Aperiam, rem laborum molestiae
            excepturi impedit sit consectetur tempora?
          </li>
        </ul>
        <div ref={loaderRef} className="mx-auto">
          {isLoading && <Loader className="h-10 w-10" />}
        </div>
      </div>
    </section>
  );
});
FakeReel.displayName = "FakeReel";

export default FakeReel;
