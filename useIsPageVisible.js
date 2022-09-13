// A simple React hook to indicate if a page is visible or no. It uses Visibility API under the hood.
// https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API


const useIsPageVisible = () => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    let hidden;
    let visibilityChange;
    if (typeof document.hidden !== "undefined") {
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }

    if (
      typeof document.addEventListener === "undefined" ||
      hidden === undefined
    ) {
      console.error("Browser not supported");
    } else {
      document.addEventListener(
        visibilityChange,
        handleVisibilityChange,
        false
      );
    }
    function handleVisibilityChange() {
      if (document[hidden]) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    }

    return () =>
      document.removeEventListener(visibilityChange, handleVisibilityChange);
  }, []);

  return isVisible;
};

export default useIsPageVisible;
