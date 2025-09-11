import Marque from "react-fast-marquee";

export default function ImageSliderSection() {
  return (
    <section className="w-full mt-25">
      <Marque autoFill={true}>
        <div className="up flex flex-row gap-4 items-center justify-center">
          <img src="src/assets/slider-images/01.png" alt="" className="ml-4" />
          <img src="src/assets/slider-images/02.png" alt="" />
          <img src="src/assets/slider-images/03.png" alt="" />
          <img src="src/assets/slider-images/04.png" alt="" />
          <img src="src/assets/slider-images/05.png" alt="" />
          <img src="src/assets/slider-images/03.png" alt="" />
        </div>
      </Marque>

      <Marque autoFill={true} direction="right">
        <div className="down mt-5 flex flex-row gap-4 items-center justify-center">
          <img src="src/assets/slider-images/05.png" alt="" className="ml-4" />
          <img src="src/assets/slider-images/04.png" alt="" />
          <img src="src/assets/slider-images/03.png" alt="" />
          <img src="src/assets/slider-images/02.png" alt="" />
          <img src="src/assets/slider-images/01.png" alt="" />
          <img src="src/assets/slider-images/03.png" alt="" />
        </div>
      </Marque>
    </section>
  );
}
