import Link from "next/link";
import { auth } from "@/auth";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { User2Icon } from "lucide-react";
import { signOutUser } from "@/lib/actions/user.actions";
const UserButton = async () => {
  const session = await auth();

  if (!session) {
    return (
      <Button asChild>
        <Link href="/sign-in">
          <User2Icon /> Sign In
        </Link>
      </Button>
    );
  }
  const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? "U";
  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="relative w-8 h-8 rounded-full ml-2 items-center justify-center bg-gray-200 cursor-pointer"
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-56 border-none"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <div className="tect-sm font-medium leading-none">
                {session.user?.name}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <div className="text-sm  text-muted-foreground leading-none">
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href="/user/profile" className="w-full  justify-start ">
              User Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/user/orders" className="w-full ">
              Order History
            </Link>
          </DropdownMenuItem>
          {session?.user?.role === "admin" && (
            <DropdownMenuItem>
              <Link href="/user/orders" className="w-full ">
                Admin
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="p-0 mb-1">
            {/* REMOVE OUT FORM WHEN DEPLOYING */}
            {/* <form action={signOutUser}> */}
            <Button
              type="submit"
              className="w-full justify-start "
              variant="ghost"
              onClick={signOutUser}
            >
              Sign Out
            </Button>
            {/* </form> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
