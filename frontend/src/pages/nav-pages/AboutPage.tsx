import AboutUsGrid from "@/components/modules/about-page/AboutUsGrid";
import TeamCards from "@/components/modules/about-page/TeamCards";
import { ArrowRight, Calendar } from "lucide-react";

export default function AboutPage() {
    return (
        <section>
            <section className="mx-auto sm:max-w-2xl lg:max-w-7xl sm:mx-auto lg:mx-auto">
                <div className="text text-center mt-5 mx-5">
                    <h2 className="font-[500] text-xl sm:text-5xl">
                        Team Member
                    </h2>
                    <p className="font-[400] text-[10px] sm:text-sm mt-3">
                        Brand is more important than ever, and clothes are the
                        ultimate storytellers. See for yourself how industry
                        leaders.
                    </p>
                </div>

                <TeamCards />
                <AboutUsGrid />

                <div className="textarea mx-5 sm:my-20 m-10 sm:mt-40 sm:flex sm:flex-row items-center justify-center gap-15">
                    <div className="left mx-2 ">
                        <h2 className="text-3xl md:text-5xl">
                            The Numbers That Show Why Blood Donation Can’t Wait
                        </h2>
                        <p className="text-[#4E535D] text-xl mt-2">
                            Revealing the impact of every donation, turning
                            numbers into stories of hope and survival.
                        </p>
                    </div>
                    <div className="right my-10 flex flex-row gap-5 items-center justify-center">
                        <div className="one">
                            <h2 className="text-3xl sm:text-5xl">1M+</h2>
                            <p className="text-[#4E535D] text-sm  mt-2">
                                Units of blood needed in Bangladesh every year
                            </p>
                        </div>
                        <div className="two">
                            <h2 className="text-3xl sm:text-5xl">31%</h2>
                            <p className="text-[#4E535D] text-sm  mt-2">
                                Donations come from voluntary donors only
                            </p>
                        </div>
                        <div className="one">
                            <h2 className="text-3xl sm:text-5xl">70%+</h2>
                            <p className="text-[#4E535D] text-sm mt-2">
                                Thalassemia patients rely on regular
                                transfusions
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className=" bg-[#F9F9FA] w-full my-20">
                <div className="mx-auto sm:max-w-2xl lg:max-w-7xl sm:mx-auto lg:mx-auto ">
                    <h2 className="text-center text-2xl sm:text-5xl pt-15">
                        Insights & Blogs
                    </h2>
                    <div className="imgcards flex flex-col sm:flex-row flex-wrap items-center  justify-center mt-16 gap-15 py-10">
                        <div className="img-card-1 ">
                            <img
                                className="w-80 h-53 rounded-4xl"
                                src="src/assets/about-us-images/pic1.jpg"
                                alt=""
                            />

                            <div className="date flex items-center  gap-5 mt-3">
                                <Calendar /> <p>July 25, 2024</p>
                            </div>
                            <div className="border-t border-dotted border-gray-400   mt-2"></div>
                            <h2 className="font-bold text-sm">
                                The life-saving impact of regular blood
                                donations
                            </h2>
                            <button className="flex flex-row items-center justify-center gap-1 my-2 text-red-800 font-bold ">
                                Read more <ArrowRight className="size-5" />
                            </button>
                        </div>
                        <div className="img-card-2 flex-col items-center justify-center ">
                            <img
                                className="w-80 rounded-4xl"
                                src="src/assets/about-us-images/pic2.jpg"
                                alt=""
                            />

                            <div className="date flex items-center  gap-5 mt-3">
                                <Calendar /> <p>July 25, 2024</p>
                            </div>
                            <div className="border-t border-dotted border-gray-400   mt-2"></div>
                            <h2 className="font-bold text-sm">
                                Why voluntary blood donation is crucial in
                                Bangladesh
                            </h2>
                            <button className="flex flex-row items-center justify-center gap-1 my-2 text-red-800 font-bold ">
                                Read more <ArrowRight className="size-5" />
                            </button>
                        </div>
                        <div className="img-card-3 ">
                            <img
                                className="w-80 rounded-4xl"
                                src="src/assets/about-us-images/pic3.jpg"
                                alt=""
                            />

                            <div className="date flex items-center  gap-5 mt-3">
                                <Calendar /> <p>July 25, 2024</p>
                            </div>
                            <div className="border-t border-dotted border-gray-400   mt-2"></div>
                            <h2 className="font-bold text-sm">
                                How small acts of giving can save lives
                            </h2>
                            <button className="flex flex-row items-center justify-center gap-1 my-2 text-red-800 font-bold ">
                                Read more <ArrowRight className="size-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
