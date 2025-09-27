import { Linkedin } from "lucide-react";

export default function AboutPage() {
  return (
    <section className="mx-auto sm:max-w-2xl lg:max-w-7xl sm:mx-auto lg:mx-auto">
      <div className="text text-center mt-5 mx-5">
        <h2 className="font-[500] text-xl sm:text-5xl">Team Member</h2>
        <p className="font-[400] text-[10px] sm:text-sm mt-3">
          Brand is more important than ever, and clothes are the ultimate
          storytellers.  See for yourself how industry leaders.
        </p>
      </div>

    <div className="cards mt-10 sm:mt-14 flex flex-row sm:flex-row items-center justify-center gap-10 mx-auto flex-wrap">
  <div className="card1">
    <div className="img relative w-52  sm:w-72 group">
      <div className="linkedin absolute right-5 top-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <a href=""><Linkedin/></a> 
      </div>

      <img
        src="src/assets/about-us-images/abrar pic.png"
        alt=""
        className="w-full"
      />
      
      <h3 className="absolute bottom-8 left-2 w-50 py-5 font-[600] text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-30">
        Abrar Yasir
      </h3>

      <p className="absolute bottom-1 left-2 w-50 py-5 font-[400] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pt-5 z-30">
        Full Stack
      </p>

      <div className="opacity-0 group-hover:opacity-100 absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#FFF9EE] to-transparent h-30 z-20"></div>
    </div>
  </div>
    <div className="card2">
    <div className="img relative w-52  sm:w-72 group">
      <div className="linkedin absolute right-5 top-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <a href=""><Linkedin/></a> 
      </div>

      <img 
        src="src/assets/about-us-images/abrar pic.png"
        alt=""
        className=" w-52 sm:w-full"
      />
      
      <h3 className="absolute bottom-8 left-2 w-50 py-5 font-[600] text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-30">
        Abrar Yasir
      </h3>

      <p className="absolute bottom-1 left-2 w-50 py-5 font-[400] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pt-5 z-30">
        Full Stack
      </p>

      <div className="opacity-0 group-hover:opacity-100 absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#FFF9EE] to-transparent h-30 z-20"></div>
    </div>
  </div>
    <div className="card3">
    <div className="img relative w-52  sm:w-72 group">
      <div className="linkedin absolute right-5 top-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <a href=""><Linkedin/></a> 
      </div>

      <img
        src="src/assets/about-us-images/abrar pic.png"
        alt=""
        className="w-full"
      />
      
      <h3 className="absolute bottom-8 left-2 w-50 py-5 font-[600] text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-30">
        Abrar Yasir
      </h3>

      <p className="absolute bottom-1 left-2 w-50 py-5 font-[400] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pt-5 z-30">
        Full Stack
      </p>

      <div className="opacity-0 group-hover:opacity-100 absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#FFF9EE] to-transparent h-30 z-20"></div>
    </div>
  </div>
    <div className="card4">
    <div className="img relative w-52  sm:w-72 group">
      <div className="linkedin absolute right-5 top-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <a href=""><Linkedin/></a> 
      </div>

      <img
        src="src/assets/about-us-images/abrar pic.png"
        alt=""
        className="w-full"
      />
      
      <h3 className="absolute bottom-8 left-2 w-50 py-5 font-[600] text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-30">
        Abrar Yasir
      </h3>

      <p className="absolute bottom-1 left-2 w-50 py-5 font-[400] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pt-5 z-30">
        Full Stack
      </p>

      <div className="opacity-0 group-hover:opacity-100 absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#FFF9EE] to-transparent h-30 z-20"></div>
    </div>
  </div>
</div>

    </section>
  );
}
