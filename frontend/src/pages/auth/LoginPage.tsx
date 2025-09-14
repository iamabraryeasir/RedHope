import { LoginForm } from "@/components/modules/authentication/LoginForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 relative">
      <Link to="/" className="absolute top-3 left-3">
        <Button variant="outline">
          <ArrowLeft /> Go Back
        </Button>
      </Link>
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
