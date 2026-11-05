"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import IBookType from "@/lib/bookType";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { BookOpen } from "lucide-react";

export default function BorrowBtnModal({ book }: { book: IBookType }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // logged in user info (read-only fields inside the modal)
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const isSoldOut = book.totalCopies <= 0;

  const handleConfirmBorrow = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = await getTokenFromClient();

      const res = await fetch(`http://localhost:8000/borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId: book._id }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.warning(result.message || "Failed to borrow this book!");
        return;
      }

      toast.success("You borrowed this book successfully!");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Borrow Error:", error);
      toast.warning("Something went wrong! Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            type="button"
            disabled={isSoldOut}
            className="h-12 rounded-lg px-6 font-semibold text-white bg-[#174D38] transition-colors hover:bg-[#103B2A] cursor-pointer"
          >
            <BookOpen size={18} />
            {isSoldOut ? "No Copies Available" : "Borrow This Book"}
          </Button>
        }
      />

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleConfirmBorrow}>
          <DialogHeader>
            <DialogTitle>Borrow {book.title}</DialogTitle>
            <DialogDescription>You keep this book for 7 days</DialogDescription>
          </DialogHeader>

          <FieldGroup className="my-5">
            <Field>
              <Label htmlFor="borrower-name">User Name</Label>
              <Input id="borrower-name" value={user?.name ?? ""} readOnly />
            </Field>

            <Field>
              <Label htmlFor="borrower-email">User Email</Label>
              <Input id="borrower-email" value={user?.email ?? ""} readOnly />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose
              render={
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              }
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-8 rounded-lg px-4 font-semibold text-white bg-[#174D38] transition-colors hover:bg-[#103B2A] cursor-pointer"
            >
              {isSubmitting ? "Borrowing..." : "Confirm Borrow"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
