import { ModeToggle } from "@/components/layout/ModeToggle";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) py-7">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <h1 className="text-base font-medium">RedHope Admin Dashboard</h1>
        <div className="ml-auto flex items-center gap-2 ">
          <ModeToggle />
          <Button variant="default" size="sm" className="ml-2 sm:flex">
            <LogOut />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
