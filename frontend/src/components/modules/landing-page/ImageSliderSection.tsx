export default function ImageSliderSection() {
  return (
    <section className="w-full mt-25">
      <div className="up flex flex-row gap-4 items-center justify-center">
        <img
          className="w-[300px] h-[300px] rounded-2xl"
          src="src/assets/img-s1.jpg"
          alt=""
        />

        <img src="src/assets/image s-1.png" alt="" />
        <img src="src/assets/image (s4).png" alt="" />
        <img src="src/assets/image (s5).png" alt="" />
        <img src="src/assets/image (s3).png" alt="" />
        <img
          className="w-[300px] h-[300px] rounded-2xl"
          src="src/assets/img-s2.jpg"
          alt=""
        />
      </div>
      <div className="down mt-5 flex flex-row gap-4 items-center justify-center">
        <img src="src/assets/image (s5).png" alt="" />

        <img src="src/assets/image s-1.png" alt="" />
        <img
          className="w-[300px] h-[300px] rounded-2xl"
          src="src/assets/img-s2.jpg"
          alt=""
        />
        <img src="src/assets/image (s4).png" alt="" />
        <img
          className="w-[300px] h-[300px] rounded-2xl"
          src="src/assets/img-s1.jpg"
          alt=""
        />
      </div>
    </section>
  );
}
