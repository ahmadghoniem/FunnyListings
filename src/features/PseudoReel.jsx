// import { useEffect, useRef } from "react";
// import { debounce } from "lodash";

// const PseudoReel = () => {
//   const [offset, setOffset] = useState(1);
//   const [loading, setIsLoading] = useState(false);
//   const [isInView, setIsInView] = useState(true);

//   const divRef = useRef(null);
//   useEffect(() => {
//     const handleScroll = () => {
//       if (typeof window !== "undefined") {
//         const container = divRef.current;
//         const { bottom } = container.getBoundingClientRect();
//         const { innerHeight } = window;
//         setIsInView(() => bottom <= innerHeight);
//       }
//     };
//     const handleDebouncedScroll = debounce(() => handleScroll(), 200);
//     window.addEventListener("scroll", handleDebouncedScroll);

//     return () => {
//       window.removeEventListener("scroll", handleDebouncedScroll);
//     };
//   }, []);
//   return (
//     <div ref={divRef}>
//       {Array.from({ length: 1000 }).map((_, i) => (
//         <p key={i}>hello {i}</p>
//       ))}
//     </div>
//   );
// };

// export default PseudoReel;
