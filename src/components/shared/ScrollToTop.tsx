import { useState, useEffect } from "react";
import { MoveUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-16 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        className="w-13 h-13 flex items-center justify-center
                   rounded-full bg-[#c9a96e]
                   text-white shadow-xl
                   hover:scale-110 hover:shadow-2xl
                   transition-all duration-300"
        aria-label="Scroll to top"
      >
        <MoveUp size={26} strokeWidth={2.5} />
      </button>
    </div>
  );
}
