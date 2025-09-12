import { Check } from "lucide-react";
export default function UniversalDonorsSection() {
  return (
    <section className="sm:bg-gradient-to-br from-[#F8F8F9] via-[#FFFFFF] to-[#FFF3F3] sm:h-[500px] sm:flex items-center justify-items-center mt-20 ">
      <div className="div mx-auto sm:max-w-2xl lg:max-w-7xl sm:mx-auto lg:mx-auto  sm:flex sm:items-center gap-15 sm:flex-row-reverse ">
         <div className="right-of-fulldiv flex justify-center items-center mx-5">
          <img
            className="sm:h-50 sm:w-56 lg:h-full lg:w-full "
            src="src/assets/Blood Guide.png"
            alt=""
          />
        </div>
        <div className="left-of-full-div sm:bg-white rounded-2xl   ">
          <h2 className="text-black text-[24px]  font-semibold px-2 mt-5 leading-[120%] sm:text-[25px] lg:text-[32px] text-center  sm:text-left  sm:mx-10">
            Universal Donors & Recipients
          </h2>
          {/* for the O+ */}
          <div className="c1 flex flex-row items-center  mx-10 gap-5 mt-5">
            <div
              className="left bg-[#A21C1C] rounded-full  w-12 h-12 sm:w-[52px] sm:h-[52px] flex
     items-center justify-center text-white "
            >
              O-{" "}
            </div>
            <div className="right">
              <h2 className="text-[12px] font-semibold leading-[80%]  tracking-[-0.5px] sm:text-[18px] lg:text-2xl">
                Universal Donor
              </h2>
              <p className=" mt-1 text-[#526061] w-[400] text-[10px] sm:text-[12px] lg:text-[16px] leading-[120%] tracking-[-0.5px] ">
                Can donate to all blood types
              </p>
            </div>
          </div>
          {/* for the AB+ */}
          <div className="c2 mt-3 flex flex-row items-center  mx-10 gap-5">
            <div
              className="left bg-[#1A1ABD] rounded-full  w-12 h-12  sm:w-[52px] sm:h-[52px] flex
     items-center justify-center text-white "
            >
              AB+
            </div>
            <div className="right">
              <h2 className="text-[12px] font-semibold leading-[80%]  tracking-[-0.5px] sm:text-[18px] lg:text-2xl">
                Universal Recipient
              </h2>
              <p className=" mt-1 text-[#526061] w-[400] text-[10px] sm:text-[12px] lg:text-[16px] leading-[120%] tracking-[-0.5px] ">
                Can receive from all blood types
              </p>
            </div>
          </div>
          {/* for the O+ A+ And B+ and others */}
          <div className="group mx-10 flex  items-center gap-5 ">
            <div className="part1">
              <div className="info mt-5 flex items-center gap-3 ">
                <div className="h-3 w-3 sm:h-5 sm:w-5 flex items-center justify-center    rounded-full bg-gradient-to-br from-[#570C0C] via-[#932A2A] to-[#000000]  text-white  ">
                  <Check />
                </div>
                <p className="text-[#131313] text-[9px] sm:text-[12px] lg:text-[18px]">
                  {" "}
                  O+ Positive: About 42%
                </p>
              </div>
              <div className="info mt-5 flex items-center gap-3 ">
                <div className="h-3 w-3 sm:h-5 sm:w-5 flex items-center justify-center    rounded-full bg-gradient-to-br from-[#570C0C] via-[#932A2A] to-[#000000]  text-white  ">
                  <Check />
                </div>
                <p className="text-[#131313] text-[9px] sm:text-[12px] lg:text-[18px]">
                  {" "}
                  A+ Positive: About 31%
                </p>
              </div>
            </div>

            <div className="part2">
              <div className="info mt-5 flex items-center gap-3 ">
                <div className="h-3 w-3  sm:h-5 sm:w-5 flex items-center justify-center    rounded-full bg-gradient-to-br from-[#570C0C] via-[#932A2A] to-[#000000]  text-white  ">
                  <Check />
                </div>
                <p className="text-[#131313] text-[9px] sm:text-[12px] lg:text-[18px]">
                  {" "}
                  B+ Positive: About 15%
                </p>
              </div>
              <div className="info mt-5 flex items-center gap-3 ">
                <div className="h-3 w-3 sm:h-5 sm:w-5 flex items-center justify-center    rounded-full bg-gradient-to-br from-[#570C0C] via-[#932A2A] to-[#000000]  text-white  ">
                  <Check />
                </div>
                <p className="text-[#131313] text-[9px] sm:text-[12px] lg:text-[18px]">
                  {" "}
                  others 4% - 20%
                </p>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </section>
  );
}
