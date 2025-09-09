import { useId, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { type ControllerRenderProps } from "react-hook-form";

interface PasswordFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, "password">;
}

export function PasswordField({ field }: PasswordFieldProps) {
  const id = useId();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <div className="relative">
      <Input
        id={id}
        className="pe-9"
        placeholder="Password"
        type={isVisible ? "text" : "password"}
        value={field.value}
        onChange={field.onChange}
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 transition outline-none"
      >
        {isVisible ? (
          <EyeOffIcon size={16} aria-hidden="true" />
        ) : (
          <EyeIcon size={16} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
