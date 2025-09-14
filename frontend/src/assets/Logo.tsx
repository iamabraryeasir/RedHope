import LogoIcon from "./icons/logo-icon.png";

export default function Logo() {
  return (
    <div className="flex gap-2 font-semibold text-xl items-center">
      <img src={LogoIcon} />
      RedHope
    </div>
  );
}
