import teamImage1 from "../../../assets/about-us-images/abrar pic.png";
import TeamCard from "./TeamCard";

const teamMembers = [
    {
        name: "Abrar Yasir",
        linkedLink: "",
        expertise: "Full Stack",
        image: teamImage1,
    },
    {
        name: "A. K. M. Nafiz",
        linkedLink: "",
        expertise: "Frontend",
        image: teamImage1,
    },
    {
        name: "Rudra Kaiser",
        linkedLink: "",
        expertise: "Frontend",
        image: teamImage1,
    },
    {
        name: "Supta Bowl",
        linkedLink: "",
        expertise: "UI/UX Designer",
        image: teamImage1,
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
