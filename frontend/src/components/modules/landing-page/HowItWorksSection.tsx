export default function HowItWorksSection() {
  return (
    <section className=" mt-25 mx-auto sm:max-w-2xl lg:max-w-7xl sm:mx-auto lg:mx-auto ">
      <div className="text text-center">
        <h2 className=" font-[400]  text-[40px] sm:text-[60px] leading-[120%] tracking-[-1.5px]">
          How it’s work?
        </h2>
        <p className=" mt-3 mx-2 text-[14px] sm:text-[18px] leading-[170%] text-[#526061]  ">
          Our simple, three-step process connects donors with recipients, <br />{" "}
          ensuring every blood donation reaches those who need it most.
        </p>
      </div>

      <div className="allinfo relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto  gap-5  justify-items-center mt-25">
        <img
          className=" absolute   bottom-70 right-[800px] "
          src="src/assets/Object.svg"
          alt=""
        />
        <div className="h-[332px] w-[332px] border-[#73737333] border-2 rounded-2xl box text-center flex flex-col items-center">
          <img className="mt-15" src="src/assets/box.svg" alt="" />
          <h2 className="mt-15 text-[24px] leading-[140%] tracking-[-1px] ">
            Register as Donor
          </h2>
          <p className="mt-3 px-3 text-[#526061] ">
            Join our network of compassionate volunteers committed to making a
            difference.
          </p>
        </div>
        <div className="h-[332px] w-[332px] border-[#73737333] border-2 rounded-2xl box text-center flex flex-col items-center">
          <img className="mt-15" src="src/assets/search.svg" alt="" />
          <h2 className="mt-15 text-[24px] leading-[140%] tracking-[-1px] ">
            Find Compatible Match
          </h2>
          <p className="mt-3 px-3 text-[#526061] ">
            Our tools instantly connect you to donors, drastically reducing
            response time in emergencies.
          </p>
        </div>
        <img
          className=" absolute  top-70 left-[800px]   "
          src="src/assets/Object2.svg"
          alt=""
        />
        <div className="h-[332px] w-[332px] border-[#73737333] border-2 rounded-2xl box text-center flex flex-col items-center">
          <img className="mt-15" src="src/assets/heart.svg" alt="" />
          <h2 className="mt-15 text-[24px] leading-[140%] tracking-[-1px] ">
            Save a Life
          </h2>
          <p className="mt-3 px-3 text-[#526061] ">
            Your single donation provides hope, bridging the gap between donors
            and recipients.
          </p>
        </div>
      </div>
    </section>
  );
}
