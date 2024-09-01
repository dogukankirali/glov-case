import Scrollbars from "react-custom-scrollbars-2";

export const smoothScrollToTop = (
  scrollbarsRef: React.RefObject<Scrollbars>,
  duration: number
) => {
  const scrollbars = scrollbarsRef.current;
  if (!scrollbars) return;

  const start = scrollbars.getScrollTop();
  const startTime = performance.now();

  const scrollStep = (currentTime: number) => {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    const scrollAmount = start * (1 - progress);
    scrollbars.scrollTop(scrollAmount);

    if (timeElapsed < duration) {
      requestAnimationFrame(scrollStep);
    } else {
      scrollbars.scrollTop(0);
    }
  };

  requestAnimationFrame(scrollStep);
};
