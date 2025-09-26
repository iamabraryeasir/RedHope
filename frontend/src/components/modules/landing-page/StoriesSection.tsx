import Marquee from "react-fast-marquee";
export default function StoriesSection() {
  return (
    <section className="mb-15 w-full">
      <div className="text text-center mt-10 mx-5">
        <h2 className="leading-[120%]  tracking-[-1.5px] text-2xl font-[500] sm:text-4xl lg:text-[60px] ">
          Stories of Hope
        </h2>
        <p className="text-[#526061] text-[10px] mt-2 sm:text-[15px] lg:text-[18px]">
          Real stories from donors and recipients whose lives were transformed
          through blood donation.
        </p>
      </div>

      {/*/////////////////////////////////////  cards1 */}

      <Marquee direction={"right"} pauseOnHover={true} autoFill={true}>
        <div className="cards mx-5 flex flex-row gap-5 my-5 sm:my-20 ">
          {/* card 1 */}
          <div className="card h-40 w-52 sm:h-55 sm:w-70 lg:h-62 lg:w-90 bg-white  shadow-lg  rounded-lg ">
            <div className="information mx-5 flex flex-row mt-4 gap-5">
              <img
                className="w-[25px] sm:w-[45px]"
                src="src/assets/pro1.svg"
                alt=""
              />
              <div className="text">
                <h2 className=" font-[600] text-[12px] sm:text-2xl ">
                  Marci Senter
                </h2>
                <p className="text-[#526061] text-[10px]  sm:text-[15px] lg:text-[18px]">
                  Founder, TechMatter
                </p>
              </div>
            </div>
            <p className="text-[10px]  sm:text-[15px] lg:text-[18px] mx-5 mt-2">
              During my wife’s delivery, she lost a lot of blood. Thanks to
              quick donors, doctors saved her. Today, both mother and child are
              safe, and I’ll never forget that gift.
            </p>
          </div>
          {/* card2 */}
          <div className="card h-40 w-52 sm:h-55 sm:w-70 lg:h-62 lg:w-90 bg-white  shadow-lg  rounded-lg ">
            <div className="information mx-5 flex flex-row mt-4 gap-5">
              <img
                className="w-[25px] sm:w-[45px]"
                src="src/assets/pro2.svg"
                alt=""
              />
              <div className="text">
                <h2 className=" font-[600] text-[12px] sm:text-2xl ">
                  Daryl Nehls
                </h2>
                <p className="text-[#526061] text-[10px]  sm:text-[15px] lg:text-[18px]">
                  Founder, TechMatter
                </p>
              </div>
            </div>
            <p className="text-[10px]  sm:text-[15px] lg:text-[18px] mx-5 mt-2">
              I met with a serious road accident and needed several
              transfusions. Within hours, donors responded. Their kindness kept
              me alive, and I now see every donor as a silent hero.
            </p>
          </div>
          {/* card 3 */}
          <div className="card h-40 w-52 sm:h-55 sm:w-70 lg:h-62 lg:w-90 bg-white  shadow-lg  rounded-lg ">
            <div className="information mx-5 flex flex-row mt-4 gap-5">
              <img
                className="w-[25px] sm:w-[45px]"
                src="src/assets/pro3.svg"
                alt=""
              />
              <div className="text">
                <h2 className=" font-[600] text-[12px] sm:text-2xl ">
                  Freida Varnes
                </h2>
                <p className="text-[#526061] text-[10px]  sm:text-[15px] lg:text-[18px]">
                  Founder, TechMatter
                </p>
              </div>
            </div>
            <p className="text-[10px]  sm:text-[15px] lg:text-[18px] mx-5 mt-2">
              My father’s heart surgery required rare blood. We thought it was
              impossible, but donors came forward in time. Because of them, my
              father is still with us.
            </p>
          </div>
          {/* card4 */}
          <div className="card h-40 w-52 sm:h-55 sm:w-70 lg:h-62 lg:w-90 bg-white  shadow-lg  rounded-lg ">
            <div className="information mx-5 flex flex-row mt-4 gap-5">
              <img
                className="w-[25px] sm:w-[45px]"
                src="src/assets/pro4.svg"
                alt=""
              />
              <div className="text">
                <h2 className=" font-[600] text-[12px] sm:text-2xl ">
                  Rayford Chenail
                </h2>
                <p className="text-[#526061] text-[10px]  sm:text-[15px] lg:text-[18px]">
                  Founder, TechMatter
                </p>
              </div>
            </div>
            <p className="text-[10px]  sm:text-[15px] lg:text-[18px] mx-5 mt-2">
              Life-changing experience! I learned so much from their program.
              Participating in their program was a transformative experience for
              me.
            </p>
          </div>
        </div>
      </Marquee>

      {/* ////////////////////////////////////////////////////////cards 2 */}
      <Marquee pauseOnHover={true} autoFill={true}>
        <div className="cards mx-5 flex flex-row gap-5 my-5 sm:my-20 ">
          {/* card 1 */}
          <div className="card h-40 w-52 sm:h-55 sm:w-70 lg:h-62 lg:w-90 bg-white  shadow-lg  rounded-lg ">
            <div className="information mx-5 flex flex-row mt-4 gap-5">
              <img
                className="w-[25px] sm:w-[45px]"
                src="src/assets/pro2.svg"
                alt=""
              />
              <div className="text">
                <h2 className=" font-[600] text-[12px] sm:text-2xl ">
                  Daryl Nehls
                </h2>
                <p className="text-[#526061] text-[10px]  sm:text-[15px] lg:text-[18px]">
                  Founder, TechMatter
                </p>
              </div>
            </div>
            <p className="text-[10px]  sm:text-[15px] lg:text-[18px] mx-5 mt-2">
              I met with a serious road accident and needed several
              transfusions. Within hours, donors responded. Their kindness kept
              me alive, and I now see every donor as a silent hero.
            </p>
          </div>
          {/* card2 */}
          <div className="card h-40 w-52 sm:h-55 sm:w-70 lg:h-62 lg:w-90 bg-white  shadow-lg  rounded-lg ">
            <div className="information mx-5 flex flex-row mt-4 gap-5">
              <img
                className="w-[25px] sm:w-[45px]"
                src="src/assets/pro1.svg"
                alt=""
              />
              <div className="text">
                <h2 className=" font-[600] text-[12px] sm:text-2xl ">
                  Marci Senter
                </h2>
                <p className="text-[#526061] text-[10px]  sm:text-[15px] lg:text-[18px]">
                  Founder, TechMatter
                </p>
              </div>
            </div>
            <p className="text-[10px]  sm:text-[15px] lg:text-[18px] mx-5 mt-2">
              During my wife’s delivery, she lost a lot of blood. Thanks to
              quick donors, doctors saved her. Today, both mother and child are
              safe, and I’ll never forget that gift.
            </p>
          </div>

          {/* card 3 */}
          <div className="card h-40 w-52 sm:h-55 sm:w-70 lg:h-62 lg:w-90 bg-white  shadow-lg  rounded-lg ">
            <div className="information mx-5 flex flex-row mt-4 gap-5">
              <img
                className="w-[25px] sm:w-[45px]"
                src="src/assets/pro4.svg"
                alt=""
              />
              <div className="text">
                <h2 className=" font-[600] text-[12px] sm:text-2xl ">
                  Rayford Chenail
                </h2>
                <p className="text-[#526061] text-[10px]  sm:text-[15px] lg:text-[18px]">
                  Founder, TechMatter
                </p>
              </div>
            </div>
            <p className="text-[10px]  sm:text-[15px] lg:text-[18px] mx-5 mt-2">
              Life-changing experience! I learned so much from their program.
              Participating in their program was a transformative experience for
              me.
            </p>
          </div>
          {/* card4 */}
          <div className="card h-40 w-52 sm:h-55 sm:w-70 lg:h-62 lg:w-90 bg-white  shadow-lg  rounded-lg ">
            <div className="information mx-5 flex flex-row mt-4 gap-5">
              <img
                className="w-[25px] sm:w-[45px]"
                src="src/assets/pro3.svg"
                alt=""
              />
              <div className="text">
                <h2 className=" font-[600] text-[12px] sm:text-2xl ">
                  Freida Varnes
                </h2>
                <p className="text-[#526061] text-[10px]  sm:text-[15px] lg:text-[18px]">
                  Founder, TechMatter
                </p>
              </div>
            </div>
            <p className="text-[10px]  sm:text-[15px] lg:text-[18px] mx-5 mt-2">
              My father’s heart surgery required rare blood. We thought it was
              impossible, but donors came forward in time. Because of them, my
              father is still with us.
            </p>
          </div>
        </div>
      </Marquee>
    </section>
  );
}
