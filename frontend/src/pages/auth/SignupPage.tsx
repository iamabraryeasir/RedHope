import { SignupForm } from "@/components/modules/authentication/SignupForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function SignupPage() {
  return (
    <div className="bg-muted relative flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <Link to="/" className="absolute top-3 left-3">
        <Button variant="outline">
          <ArrowLeft /> Go Back
        </Button>
      </Link>
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignupForm />
      </div>
    </div>
  );
}
