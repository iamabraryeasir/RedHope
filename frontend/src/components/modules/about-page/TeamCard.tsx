import { Linkedin } from "lucide-react";

interface IProps {
    name: string;
    linkedLink: string;
    expertise: string;
    image: string;
}

export default function TeamCard({
    name,
    linkedLink,
    expertise,
    image,
}: IProps) {
    return (
        <div className="card1">
            <div className="img relative w-52  sm:w-72 group">
                <div className="linkedin absolute right-5 top-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href={linkedLink} target="_blank">
                        <Linkedin />
                    </a>
                </div>

                <img src={image} alt="" className="w-full rounded-3xl" />

                <h3 className="absolute bottom-8 left-2 w-50 py-5 font-[600] text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-30">
                    {name}
                </h3>

                <p className="absolute bottom-1 left-2 w-50 py-5 font-[400] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pt-5 z-30">
                    {expertise}
                </p>

                <div className="opacity-0 group-hover:opacity-100 absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#FFF9EE] to-transparent h-30 z-20"></div>
            </div>
        </div>
    );
}
