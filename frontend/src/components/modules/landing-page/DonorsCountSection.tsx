import { ChevronRight, Clock, MapPin, ShieldAlert } from "lucide-react";

export default function DonorsCountSection() {
  return (
    <section className=" mt-15 mx-auto sm:max-w-2xl lg:max-w-7xl sm:mx-auto lg:mx-auto">
      <div className="text text-center">
        <h3 className="leading-[120%]  tracking-[-1.5px] text-2xl font-[500] sm:text-4xl lg:text-[60px] ">
          Lives That Need You Today
        </h3>
        <p className="text-[#526061] text-[10px] mt-2 sm:text-[15px] lg:text-[18px]">
          These patients are counting on donors like you. Every minute matters.
        </p>
      </div>
      <div className="cards flex flex-col items-center justify-center  mt-10 sm:flex-row flex-wrap gap-10">
        {/* card1 */}
        <div className="card h-[400px] w-[320px] bg-[#F7F6F4]  rounded-2xl ">
          {/* user name and pic */}
          <div className="info mt-5 mx-5 flex gap-6 items-center  ">
            <div className="img h-10  w-10  rounded-full ">
              <img
                className=" rounded-full "
                src="src/assets/Ellipse 2506.svg"
                alt=""
              />
            </div>
            <div className="text">
              <h3 className="text-[20px] leading-[160%] tracking-[1px]">
                Sarah M.
              </h3>
              <p className="leading-[180%] tracking-[-0.2px] text-[#0a0915a6]">
                Age 34, Mother of 2
              </p>
            </div>
          </div>
          {/* text of blood type */}
          <div className="text mt-5 mx-5 ">
            <h3 className="text-4xl leading-[130%] tracking-[3px] font-semibold">
              O+
            </h3>
            <p className="leading-[180%] tracking-[-0.2px] text-[#0a0915a6] text-[14px]">
              Blood Type
            </p>
          </div>

          {/* button */}
          <div className="button  flex items-center justify-center mt-5 ">
            <button className=" flex items-center justify-between  rounded-2xl w-64 px-5 py-2 text-white  bg-gradient-to-br from-[#570C0C] via-[#932A2A] to-[#000000] ">
              <div className=" flex justify-start">
                <p className="text-[16px] leading-[170%]  tracking-[-0.4px]">
                  Donate Now
                </p>
              </div>
              <div className="div h-5 w-5 bg-white rounded-full text-black flex items-center justify-end">
                <ChevronRight />
              </div>
            </button>
          </div>

          <p className="mt-2 mx-5 text-[16px] leading-[180%]  tracking-[-0.2px] ">
            Person details
          </p>
          <div className="border-t border-dotted border-gray-400  mx-5 mt-2"></div>

          <div className="locations-info mx-5">
            <div className="location  flex items-center gap-2 mt-2 ">
              {" "}
              <MapPin />{" "}
              <p className="text-[12px] leading-[170%]  tracking-[-0.4px]">
                City General Hospital, Downtown
              </p>
            </div>
            <div className="location  flex items-center gap-2 mt-2  ">
              {" "}
              <Clock />{" "}
              <p className="text-[12px] leading-[170%]  tracking-[-0.4px]">
                Posted 2 hours ago
              </p>
            </div>
            <div className="location  flex items-center gap-2  mt-2 ">
              {" "}
              <ShieldAlert />{" "}
              <p className="text-[12px] leading-[170%]  tracking-[-0.4px]">
                Critical - Needed within 6 hours
              </p>
            </div>
          </div>
        </div>
        {/* card2 */}
        <div className="card text-white h-[400px] w-[320px] bg-gradient-to-br from-[#570C0C] via-[#932A2A] to-[#000000c4] rounded-2xl mt-7 sm:mt-0 shadow-lg shadow-black">
          {/* user name and pic */}
          <div className="info mt-5 mx-5 flex gap-6 items-center  ">
            <div className="img h-10  w-10  rounded-full ">
              <img
                className=" rounded-full "
                src="src/assets/Ellipse 2506 (1).svg"
                alt=""
              />
            </div>
            <div className="text">
              <h3 className="text-[20px] leading-[160%] tracking-[1px]">
                Emma L.
              </h3>
              <p className="leading-[180%] tracking-[-0.2px] ">
                Age 34, Mother of 2
              </p>
            </div>
          </div>
          {/* text of blood type */}
          <div className="text mt-5 mx-5 ">
            <h3 className="text-4xl leading-[130%] tracking-[3px] font-semibold">
              B+
            </h3>
            <p className="leading-[180%] tracking-[-0.2px] text-[14px]">
              Blood Type
            </p>
          </div>

          {/* button */}
          <div className="button  flex items-center justify-center mt-5 ">
            <button className=" flex items-center justify-between  rounded-2xl w-64 px-5 py-2 text-black  bg-white ">
              <div className=" flex justify-start">
                <p className="text-[16px] leading-[170%]  tracking-[-0.4px]">
                  Donate Now
                </p>
              </div>
              <div className="div h-5 w-5 bg-black rounded-full text-white flex items-center justify-end">
                <ChevronRight />
              </div>
            </button>
          </div>

          <p className="mt-2 mx-5 text-[16px] leading-[180%]  tracking-[-0.2px] ">
            Person details
          </p>
          <div className="border-t border-dotted border-gray-400  mx-5 mt-2"></div>

          <div className="locations-info mx-5">
            <div className="location  flex items-center gap-2 mt-2 ">
              <MapPin />
              <p className="text-[12px] leading-[170%]  tracking-[-0.4px]">
                City General Hospital, Downtown
              </p>
            </div>
            <div className="location  flex items-center gap-2 mt-2  ">
              {" "}
              <Clock />{" "}
              <p className="text-[12px] leading-[170%]  tracking-[-0.4px]">
                Posted 2 hours ago
              </p>
            </div>
            <div className="location  flex items-center gap-2  mt-2 ">
              {" "}
              <ShieldAlert />{" "}
              <p className="text-[12px] leading-[170%]  tracking-[-0.4px]">
                Critical - Needed within 6 hours
              </p>
            </div>
          </div>
        </div>
        {/* card3 */}
        <div className="card h-[400px] w-[320px] bg-[#F7F6F4]  rounded-2xl mt-7 sm:mt-0">
          {/* user name and pic */}
          <div className="info mt-5 mx-5 flex gap-6 items-center  ">
            <div className="img h-10  w-10  rounded-full ">
              <img
                className=" rounded-full "
                src="src/assets/Ellipse 2507.svg"
                alt=""
              />
            </div>
            <div className="text">
              <h3 className="text-[20px] leading-[160%] tracking-[1px]">
                Michael R.
              </h3>
              <p className="leading-[180%] tracking-[-0.2px] text-[#0a0915a6]">
                Age 38
              </p>
            </div>
          </div>
          {/* text of blood type */}
          <div className="text mt-5 mx-5 ">
            <h3 className="text-4xl leading-[130%] tracking-[3px] font-semibold">
              A+
            </h3>
            <p className="leading-[180%] tracking-[-0.2px] text-[#0a0915a6] text-[14px]">
              Blood Type
            </p>
          </div>

          {/* button */}
          <div className="button  flex items-center justify-center mt-5 ">
            <button className=" flex items-center justify-between  rounded-2xl w-64 px-5 py-2 text-white  bg-gradient-to-br from-[#570C0C] via-[#932A2A] to-[#000000] ">
              <div className=" flex justify-start">
                <p className="text-[16px] leading-[170%]  tracking-[-0.4px]">
                  Donate Now
                </p>
              </div>
              <div className="div h-5 w-5 bg-white rounded-full text-black flex items-center justify-end">
                <ChevronRight />
              </div>
            </button>
          </div>

          <p className="mt-2 mx-5 text-[16px] leading-[180%]  tracking-[-0.2px] ">
            Person details
          </p>
          <div className="border-t border-dotted border-gray-400  mx-5 mt-2"></div>

          <div className="locations-info mx-5">
            <div className="location  flex items-center gap-2 mt-2 ">
              {" "}
              <MapPin />{" "}
              <p className="text-[12px] leading-[170%]  tracking-[-0.4px]">
                City General Hospital, Downtown
              </p>
            </div>
            <div className="location  flex items-center gap-2 mt-2  ">
              {" "}
              <Clock />{" "}
              <p className="text-[12px] leading-[170%]  tracking-[-0.4px]">
                Posted 2 hours ago
              </p>
            </div>
            <div className="location  flex items-center gap-2  mt-2 ">
              {" "}
              <ShieldAlert />{" "}
              <p className="text-[12px] leading-[170%]  tracking-[-0.4px]">
                Critical - Needed within 6 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
