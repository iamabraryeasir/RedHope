export default function ImageSliderSection() {
  return (
    <section className="w-full mt-25">
      <div className="top-slider grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        <div className="w-full h-60">
          <img
            src="src/assets/slider-images/01.jpg"
            alt="Image 1"
            className="w-full h-60 object-cover rounded-xl shadow-md"
          />
        </div>
        <div className="w-full h-60">
          <img
            src="src/assets/slider-images/02.jpg"
            alt="Image 2"
            className="w-full h-60 object-cover rounded-xl shadow-md"
          />
        </div>
        <div className="w-full h-60">
          <img
            src="src/assets/slider-images/03.jpg"
            alt="Image 3"
            className="w-full h-60 object-cover rounded-xl shadow-md"
          />
        </div>
        <div className="w-full h-60">
          <img
            src="src/assets/slider-images/04.jpg"
            alt="Image 4"
            className="w-full h-60 object-cover rounded-xl shadow-md"
          />
        </div>
        <div className="w-full h-60">
          <img
            src="src/assets/slider-images/05.jpg"
            alt="Image 5"
            className="w-full h-60 object-cover rounded-xl shadow-md"
          />
        </div>
      </div>

      <div className="bottom-slider grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        <div className="w-full h-60">
          <img
            src="src/assets/slider-images/05.jpg"
            alt="Image 1"
            className="w-full h-60 object-cover rounded-xl shadow-md"
          />
        </div>
        <div className="w-full h-60">
          <img
            src="src/assets/slider-images/04.jpg"
            alt="Image 2"
            className="w-full h-60 object-cover rounded-xl shadow-md"
          />
        </div>
        <div className="w-full h-60">
          <img
            src="src/assets/slider-images/03.jpg"
            alt="Image 3"
            className="w-full h-60 object-cover rounded-xl shadow-md"
          />
        </div>
        <div className="w-full h-60">
          <img
            src="src/assets/slider-images/02.jpg"
            alt="Image 4"
            className="w-full h-60 object-cover rounded-xl shadow-md"
          />
        </div>
        <div className="w-full h-60">
          <img
            src="src/assets/slider-images/01.jpg"
            alt="Image 5"
            className="w-full h-60 object-cover rounded-xl shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
