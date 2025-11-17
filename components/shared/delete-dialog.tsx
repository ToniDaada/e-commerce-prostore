"use client";
import { useState } from "react";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const DeleteDialog = ({
  id,
  action,
}: {
  id: string;
  action: (id: string) => Promise<{ success: boolean; message: string }>;
}) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteClick = function () {
    startTransition(async () => {
      const res = await action(id);

      if (!res.success) {
        toast.error(res.message as string);
      } else {
        setOpen(false);
        toast.success(res.message);
      }
    });
  };

  //   return <Alert open={open}></Alert>;
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant={"destructive"} className="ml-2">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure ?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be done
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant={"destructive"}
            size="sm"
            disabled={isPending}
            onClick={handleDeleteClick}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
