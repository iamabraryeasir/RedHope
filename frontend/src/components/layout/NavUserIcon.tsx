import { Link, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
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
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import type { IUserInfoResponse } from "@/types/auth.types";
import type { IResponse } from "@/types";
import { UserRole } from "@/constants/role";

interface IProps {
  userData: IResponse<IUserInfoResponse>;
}

export default function NavUserIcon({ userData }: IProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  async function handleLogout() {
    try {
      const res = await logout(null).unwrap();

      if (res.success) {
        dispatch(authApi.util.resetApiState());

        toast.success("User Logout Successful");
        navigate("/");
      }
    } catch (error) {
      toast.error("Error while logging out");
      console.log(error);
    }
  }

  return (
    <>
      {userData.data.role === UserRole.admin ? (
        <Link to="/admin">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>RH</AvatarFallback>
          </Avatar>
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>RH</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-0 lg:mr-10">
            <DropdownMenuLabel>Donors Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>My Requests</DropdownMenuItem>
            <DropdownMenuItem asChild>
              <AlertDialog>
                <AlertDialogTrigger className="pl-2 text-sm w-full text-start">
                  Logout
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
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
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
