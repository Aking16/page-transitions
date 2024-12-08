"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation"; // New API
import { ReactNode, useEffect, useRef, useState } from "react";

interface TransitionProps {
  children: ReactNode;
}

const Transition = ({ children }: TransitionProps) => {
  const pathname = usePathname(); // Detect route changes
  const lastChild = useRef(children);

  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setTransitioning(true);
    const timer = setTimeout(() => {
      lastChild.current = children;
      setTransitioning(false);
    }, 300); // Match your animation duration

    return () => clearTimeout(timer); // Clean up timeout on unmount or route change
  }, [pathname, children]);

  const Content = transitioning ? lastChild.current : children;

  return (
    <div className={cn(transitioning ? "animate-fadeOut" : "animate-fadeIn")}>
      {Content}
    </div>
  );
};

export default Transition;