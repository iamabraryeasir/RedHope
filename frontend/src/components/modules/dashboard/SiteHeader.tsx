/**
 * Node Modules
 */
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";

/**
 * Local Modules
 */
import { ModeToggle } from "@/components/layout/ModeToggle";
import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/redux/features/auth/auth.api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

/**
 * Component Logic
 */
export function SiteHeader() {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  async function handleLogout() {
    try {
      const res = await logout(null).unwrap();

      if (res.success) {
        toast.success("User Logout Successful");
        navigate("/");
      }
    } catch (error) {
      toast.error("Error while logging out");
      console.log(error);
    }
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) py-7">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <h1 className="text-base font-medium">RedHope Admin Dashboard</h1>
        <div className="ml-auto flex items-center gap-2 ">
          <ModeToggle />
          <AlertDialog>
            <AlertDialogTrigger asChild className="ml-2 sm:flex">
              <Button variant="default" size="sm">
                <LogOut />
                Logout
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently logout
                  from your account and remove your data from your device.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild className="ml-2 sm:flex">
                  <Button onClick={handleLogout}>
                    <LogOut />
                    Logout
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </header>
  );
}
