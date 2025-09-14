import Marque from "react-fast-marquee";

export default function ImageSliderSection() {
  return (
    <section className="w-full mt-25">
      <Marque autoFill={true}>
        <div className="up flex flex-row gap-4 items-center justify-center">
          <img
            src="src/assets/slider-images/01.png"
            alt=""
            className="h-35 md:h-80 ml-4"
          />
          <img
            src="src/assets/slider-images/02.png"
            alt=""
            className="h-35 md:h-80 "
          />
          <img
            src="src/assets/slider-images/03.png"
            alt=""
            className="h-35 md:h-80 "
          />
          <img
            src="src/assets/slider-images/04.png"
            alt=""
            className="h-35 md:h-80 "
          />
          <img
            src="src/assets/slider-images/05.png"
            alt=""
            className="h-35 md:h-80 "
          />
          <img
            src="src/assets/slider-images/03.png"
            alt=""
            className="h-35 md:h-80 "
          />
        </div>
      </Marque>

      <Marque autoFill={true} direction="right">
        <div className="down mt-5 flex flex-row gap-4 items-center justify-center">
          <img
            src="src/assets/slider-images/05.png"
            alt=""
            className="h-35 md:h-80 ml-4"
          />
          <img
            src="src/assets/slider-images/04.png"
            alt=""
            className="h-35 md:h-80 "
          />
          <img
            src="src/assets/slider-images/03.png"
            alt=""
            className="h-35 md:h-80 "
          />
          <img
            src="src/assets/slider-images/02.png"
            alt=""
            className="h-35 md:h-80 "
          />
          <img
            src="src/assets/slider-images/01.png"
            alt=""
            className="h-35 md:h-80 "
          />
          <img
            src="src/assets/slider-images/03.png"
            alt=""
            className="h-35 md:h-80 "
          />
        </div>
      </Marque>
    </section>
  );
}
