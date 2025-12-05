import Image from "next/image";
import Link from "next/link";

import { APP_NAME } from "@/lib/constants";

import Menu from "./menu";
import CategoryDrawer from "./category-drawer";
import Search from "./search";

const Header = () => {
  return (
    <header className="w-full border-b border-gray-200">
      <div className="wrapper flex-between">
        <div className="flex-start ">
          <CategoryDrawer />
          <Link href="/" className="flex items-center ml-4 gap-2">
            <Image
              src="/images/logo.svg"
              alt={`${APP_NAME} logo`}
              width={48}
              height={48}
              priority={true}
            />

            <span className="hidden font-bold text-2xl ml-3 lg:block">
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div className="hidden md:block">
          <Search />
        </div>

        <Menu />
      </div>
    </header>
  );
};

export default Header;
