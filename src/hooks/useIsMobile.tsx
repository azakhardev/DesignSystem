import { useSyncExternalStore } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  return useSyncExternalStore(
    // 1. Subscribes the function
    (notify) => {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
      mql.addEventListener("change", notify);
      return () => mql.removeEventListener("change", notify);
    },
    // 2. GetSnapshot (returns current value to the client)
    () => window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches,
    // 3. GetServerSnapshot (returns value for the server/SSR - always false)
    () => false,
  );
}
