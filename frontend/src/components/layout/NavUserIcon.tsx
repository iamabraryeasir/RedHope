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
import { User, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import type { IUserInfoResponse } from "@/types/auth.types";
import type { IResponse } from "@/types";
import { UserRole } from "@/constants/role";
import { useState } from "react";
import ProfileModal from "./ProfileModal";

interface IProps {
  userData: IResponse<IUserInfoResponse>;
}

export default function NavUserIcon({ userData }: IProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [logout] = useLogoutMutation();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  async function handleLogout() {
    try {
      const res = await logout(null).unwrap();

      if (res.success) {
        dispatch(authApi.util.resetApiState());
        toast.success("Logged out successfully");
        setIsLogoutDialogOpen(false);
        navigate("/");
      }
    } catch (error) {
      toast.error("Error while logging out");
    }
  }

  return (
    <>
      {userData.data.role === UserRole.admin ? (
        <Link to="/admin">
          <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>RH</AvatarFallback>
          </Avatar>
        </Link>
      ) : (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-10 w-10 overflow-hidden"
              >
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="text-xs font-bold">
                    {getInitials(userData.data.name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {userData.data.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsProfileOpen(true)}>
                View Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialog
                open={isLogoutDialogOpen}
                onOpenChange={setIsLogoutDialogOpen}
              >
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    className="text-red-600 cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Logout Confirmation</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to logout? You'll be redirected to
                      the home page.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleLogout}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>

          <ProfileModal
            isOpen={isProfileOpen}
            onOpenChange={setIsProfileOpen}
            userData={userData.data}
          />
        </>
      )}
    </>
  );
}
