/**
 * Node Modules
 */
import { Link, useNavigate } from "react-router";

/**
 * Assets
 */
import Logo from "@/assets/Logo";

/**
 * Local Modules
 */
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./ModeToggle";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { UserRole } from "@/constants/role";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
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
import { LogOut } from "lucide-react";

/**
 * Navigation links array to be used in both desktop and mobile menus
 */
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/donors", label: "Donors" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const { data: userData } = useUserInfoQuery(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  async function handleLogout() {
    try {
      const res = await logout(null).unwrap();

      if (res.success) {
        toast.success("User Logout Successful");
        dispatch(authApi.util.resetApiState());
        navigate("/");
      }
    } catch (error) {
      toast.error("Error while logging out");
      console.log(error);
    }
  }

  return (
    <header className="border-b px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex flex-1 items-center gap-2">
            {/* Mobile menu trigger */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group size-8 md:hidden"
                  variant="ghost"
                  size="icon"
                >
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-36 p-1 md:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                    {navigationLinks.map((link, index) => {
                      return (
                        <NavigationMenuItem key={index} className="w-full">
                          <NavigationMenuLink
                            asChild
                            className="flex-row items-center gap-2 py-1.5"
                          >
                            <Link to={link.href}>{link.label}</Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      );
                    })}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-primary hover:text-primary/90">
                <Logo />
              </Link>
            </div>
          </div>
          {/* Middle area */}
          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList className="gap-2">
              {navigationLinks.map((link, index) => {
                return (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      asChild
                      className="text-foreground hover:text-primary flex-row items-center gap-2 py-1.5 font-medium"
                    >
                      <Link to={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
          {/* Right side */}
          <div className="flex flex-1 items-center justify-end gap-2">
            <ModeToggle />

            {userData?.data.email ? (
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
                    <DropdownMenuContent className="mr-10">
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
                                This action cannot be undone. This will
                                permanently logout from your account and remove
                                your data from your device.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                asChild
                                className="ml-2 sm:flex"
                              >
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
            ) : (
              <Link to="/login">
                <Button variant="default">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
