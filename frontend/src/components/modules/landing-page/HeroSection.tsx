import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="  text-center mx-auto sm:max-w-2xl lg:max-w-7xl sm:mx-auto lg:mx-auto ">
      <h2 className="text-[48px] sm:text-7xl   font-[600] mt-16 leading-[117%] tracking-[-2px] ">
        Your Next <span className="text-[#A21C1C]">Blood</span> Donor is Here.
      </h2>

      <p className="text-[14px] sm:text-[20px]  leading-[170%] mt-[16px]  ">
        Join our community of voluntary blood donors and be a lifeline for those
        in need.
      </p>
      <div className="buttons  gap-5 mt-10  flex flex-col sm:flex-row items-center justify-center   ">
        <button className="flex items-center  mr-3 shadow-lg  shadow-black bg-gradient-to-br from-[#570C0C] via-[#932A2A] to-[#000000] px-7 py-4  rounded-4xl text-white text-[12px] sm:text-[16px] font-[500]  ">
          Find a Donor Now{" "}
          <div className="bg-white rounded-full text-black  p-1 ml-5">
            <ArrowRight />
          </div>
        </button>
        <button className="bg-white border-[1px] shadow-lg   shadow-black  border-black px-18 py-4 rounded-4xl text-[12px] sm:text-[16px] font-[500] ">
          Explore Us
        </button>
      </div>
      <div className="info-of-donations  mt-8 flex flex-row gap-0 justify-center items-center ">
        <div className=" left flex flex-row  relative bg-amber-950  ">
          <img
            className="absolute left-0  "
            src="src/assets/38.png"
            alt=" img 1"
          />
          <img
            className="absolute left-6"
            src="src/assets/51.png"
            alt=" img 2"
          />
          <img
            className="absolute left-12"
            src="src/assets/70.png"
            alt=" img 3"
          />
        </div>
        <div className="right ">
          <p className="text-[16px] font-[400] leading-[140%] tracking-[-0.642px]">
            500+ Donations received
          </p>
        </div>
      </div>
    </section>
  );
}
