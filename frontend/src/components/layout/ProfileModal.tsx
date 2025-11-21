import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
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
import { LogOut, Mail, Phone, Droplet, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import type { IUserInfoResponse } from "@/types/auth.types";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { useState } from "react";

interface ProfileModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userData: IUserInfoResponse;
}

export default function ProfileModal({
  isOpen,
  onOpenChange,
  userData,
}: ProfileModalProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

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
        onOpenChange(false);
        navigate("/");
      }
    } catch (error) {
      toast.error("Error while logging out");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>Your account information</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Avatar and Name */}
          <div className="flex flex-col items-center space-y-3">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="text-lg font-bold">
                {getInitials(userData.name)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-lg font-semibold">{userData.name}</h3>
              <p className="text-sm text-muted-foreground capitalize">
                {userData.role.toLowerCase()}
              </p>
            </div>
          </div>

          <Separator />

          {/* User Information Grid */}
          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium break-all">
                  {userData.email}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium">{userData.phoneNumber}</p>
              </div>
            </div>

            {/* Blood Group */}
            <div className="flex items-start gap-3">
              <Droplet className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Blood Group</p>
                <p className="text-sm font-medium">{userData.bloodGroup}</p>
              </div>
            </div>

            {/* Gender */}
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0 flex items-center justify-center">
                <span className="text-xs">♀♂</span>
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Gender</p>
                <p className="text-sm font-medium capitalize">
                  {userData.gender.toLowerCase()}
                </p>
              </div>
            </div>

            {/* Date of Birth */}
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Date of Birth</p>
                <p className="text-sm font-medium">
                  {format(new Date(userData.dateOfBirth), "MMM d, yyyy")}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm font-medium">
                  {userData.thana}, {userData.city}, {userData.district}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Logout Button */}
          <AlertDialog
            open={isLogoutDialogOpen}
            onOpenChange={setIsLogoutDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <Button className="w-full" variant="destructive" size="lg">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Logout Confirmation</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to logout? You'll be redirected to the
                  home page.
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
