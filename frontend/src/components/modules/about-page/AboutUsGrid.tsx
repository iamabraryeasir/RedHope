import { Flag } from "lucide-react";
import gridImage1 from "../../../assets/grid/001.jpg";
import gridImage2 from "../../../assets/grid/002.png";
import gridImage3 from "../../../assets/grid/003.jpg";
import gridImage4 from "../../../assets/grid/004.jpg";

export default function AboutUsGrid() {
    return (
        <section className="grid grid-cols-12 grid-rows-5 gap-4 mt-20">
            {/* Left Red Card */}
            <div className="col-span-3 row-span-3">
                <div className="bg-[#932A2A] text-white p-8 flex flex-col gap-4 rounded-2xl h-full">
                    <Flag width={40} height={40} />
                    <h3 className="font-semibold text-lg">
                        We have started our journey since 2023
                    </h3>
                    <p className="text-sm leading-relaxed">
                        “No one should wait for blood in critical moments.
                        Founded by a group of dedicated individuals, we set out
                        to make lifesaving donations accessible to all.”
                    </p>
                </div>
            </div>

            {/* Left Bottom Small Image */}
            <div className="col-span-3 row-span-3 col-start-1 row-start-4">
                <div className="h-[240px] w-full overflow-hidden rounded-2xl flex items-center justify-center">
                    <img
                        src={gridImage1}
                        alt=""
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>

            {/* Middle Top Group Image */}
            <div className="col-span-5 row-span-2 col-start-4 row-start-1">
                <div className="h-[240px] w-full rounded-2xl overflow-hidden">
                    <img
                        src={gridImage2}
                        alt=""
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>

            {/* Middle Bottom Donation Image */}
            <div className="col-span-5 row-span-4 col-start-4 row-start-3">
                <div className="h-[370px] w-full rounded-2xl overflow-hidden">
                    <img
                        src={gridImage3}
                        alt=""
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>

            {/* Right Top Arm with Blood Bag Image */}
            <div className="col-span-4 row-span-3 col-start-9 row-start-1">
                <div className="h-[367px] w-full rounded-2xl overflow-hidden">
                    <img
                        src={gridImage4}
                        alt=""
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>

            {/* Right Bottom Testimonial */}
            <div className="col-span-4 row-span-3 col-start-9 row-start-4">
                <div className="bg-[#FEF8EE] rounded-2xl p-8 flex flex-col gap-3 h-[240px]">
                    <h2 className="text-xl font-semibold">
                        “Redhope makes donating blood simple and stress-free.”
                    </h2>
                    <p className="text-sm leading-relaxed">
                        The team at RedHope has been incredible, always
                        supportive and ready to guide donors whenever needed.
                    </p>
                    <div>
                        <p className="font-medium">Rafiq Ahmed</p>
                        <p className="text-xs text-gray-600">
                            Healthcare Volunteer
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
