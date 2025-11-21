import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

export default function JoinCommunitySection() {
  const { data: userInfo } = useUserInfoQuery(null);

  // Only show this component if user is not logged in
  if (userInfo?.data) {
    return null;
  }

  return (
    <section className="mx-2 sm:max-w-2xl lg:max-w-7xl sm:mx-auto lg:mx-auto mb-28">
      <div className="container h-[180px] sm:h-72 rounded-2xl bg-gradient-to-br from-[#570C0C] via-[#932A2A] to-[#000000]  w-full  flex flex-col items-center justify-center  ">
        <div className="container relative">
          {/* <div className="img absolute bottom-0 top-15 right-12">
            <img className="h-[120px] w-full " src="src/assets/donorCommunity/Ellipse267.png" alt="" />
          </div> */}
        </div>

        <h3 className=" text-[18px] sm:text-3xl md:text-5xl text-white font-[500] text-center mx-4  leading-[114%] tracking-[-0.35px] ">
          Be the reason someone gets a second chance. Join our donor community.
        </h3>
        <Link
          to="/signup"
          className="flex flex-row items-center justify-center bg-white rounded-4xl py-1 px-2 sm:py-2 sm:px-5  mt-6 "
        >
          <h2 className="ml-2">Resgister as Donor </h2>
          <div className="div h-8 w-8 mx-2    hover:bg-black rounded-full text-white  hover:text-white flex items-center justify-center bg-black">
            <ArrowRight />
          </div>
        </Link>
      </div>
    </section>
  );
}
