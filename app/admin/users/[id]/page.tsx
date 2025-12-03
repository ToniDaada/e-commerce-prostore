import { getUserById } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import UpdateUserForm from "./update-user-form";

export const metadata: Metadata = {
  title: "Update User",
};
const AdminUserUpdatePage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;
  const user = await getUserById(id);

  if (!user) return notFound();

  const userForForm = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role || "user",
  };

  return (
    <div className="space-y-8 max-w-lg mx-auto">
      <h1 className="h2-bold">Update User</h1>
      <UpdateUserForm user={userForForm} />
    </div>
  );
};

export default AdminUserUpdatePage;
