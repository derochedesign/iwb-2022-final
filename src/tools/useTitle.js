import { useEffect } from "react";

export function useTitle(title) {
  
  useEffect(() => {
    const prevTitle = document.title
    document.title = title + " - IDS22"
    return () => {
      document.title = prevTitle
    }
  }, []);
};