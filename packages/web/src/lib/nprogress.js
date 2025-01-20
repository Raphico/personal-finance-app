import debounce from "lodash.debounce";
import nProgress from "nprogress";

nProgress.configure({ showSpinner: false, trickleSpeed: 300 });

const done = debounce(nProgress.done, 300, {
  trailing: true,
  leading: false,
});

export function useNProgress() {
  return {
    start: nProgress.start,
    done,
  };
}
