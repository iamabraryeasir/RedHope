import teamImage1 from "../../../assets/about-us-images/abrar-pic.png";
import teamImage2 from "../../../assets/about-us-images/nafiz-pic.png";
import teamImage3 from "../../../assets/about-us-images/rudra-kaiser-linkedin.png";
import teamImage4 from "../../../assets/about-us-images/supta-pic.png";
import TeamCard from "./TeamCard";

const teamMembers = [
    {
        name: "Abrar Yasir",
        linkedLink: "",
        expertise: "Full Stack",
        image: teamImage1,
    },
    {
        name: "A. K. M. Nafiz Ibn Nasim",
        linkedLink: "",
        expertise: "Frontend",
        image: teamImage2,
    },
    {
        name: "Rudra Kaiser",
        linkedLink: "",
        expertise: "Frontend",
        image: teamImage3,
    },
    {
        name: "Supta Bowl",
        linkedLink: "",
        expertise: "UI/UX Designer",
        image: teamImage4,
    },
];

export default function TeamCards() {
    return (
        <div className="cards mt-10 sm:mt-14 flex flex-row sm:flex-row items-center justify-center gap-10 mx-auto flex-wrap">
            {teamMembers.map((member, index) => (
                <TeamCard
                    key={index}
                    name={member.name}
                    linkedLink={member.linkedLink}
                    expertise={member.expertise}
                    image={member.image}
                />
            ))}
        </div>
    );
}
