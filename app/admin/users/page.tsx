import DeleteDialog from "@/components/shared/delete-dialog";
import Pagination from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { deleteUser, getAllUsers } from "@/lib/actions/user.actions";
import { formatId } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Users",
};

const AdminUsersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page = "1" } = await props.searchParams;
  const users = await getAllUsers({
    page: Number(page),
  });
  console.log(users);
  return (
    <div className="space-y-2 ">
      <h2 className="h2-bold">Users</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[var(--color-border)] ">
              <TableHead className=" text-[#808080] py-4 px-6">ID</TableHead>
              <TableHead className=" text-[#808080]">NAME</TableHead>
              <TableHead className=" text-[#808080]">EMAIL </TableHead>
              <TableHead className=" text-[#808080]">ROLE </TableHead>
              <TableHead className=" text-[#808080]">ACTIONS </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.data.map((user) => (
              <TableRow
                key={user.id}
                className="border-b border-[var(--color-border)]"
              >
                <TableCell className="py-4 px-6">{formatId(user.id)}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.role === "user" ? (
                    <Badge variant="secondary" className="w-[70px] p-3 ">
                      User
                    </Badge>
                  ) : (
                    <Badge variant="default" className="w-[70px] p-3 ">
                      {" "}
                      Admin
                    </Badge>
                  )}
                </TableCell>

                <TableCell>
                  <Button asChild variant={"outline"} size={"sm"}>
                    <Link href={`/admin/users/${user.id}`}>Edit</Link>
                  </Button>
                  <DeleteDialog id={user.id} action={deleteUser} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {users.totalPages > 1 && (
          <Pagination page={Number(page) || 1} totalPages={users?.totalPages} />
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;
