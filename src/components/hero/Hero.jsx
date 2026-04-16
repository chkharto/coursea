import { useState } from "react";
import slides from "./HeroData";
import HeroSlide from "./HeroSlides";

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="px-44.25 mt-16"> 
      <HeroSlide
        slide={slides[current]}
        next={next}
        prev={prev}
        current={current}
        total={slides.length}
        setCurrent={setCurrent}
      />
    </div>
  );
};

export default Hero;
