"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { toast } from "@heroui/react";
import { RotateCcw } from "lucide-react";

const ReturnBookButton = ({ borrowId }: { borrowId: string }) => {
  const router = useRouter();
  const [isReturning, setIsReturning] = useState(false);

  const handleReturnBook = async () => {
    setIsReturning(true);

    try {
      const token = await getTokenFromClient();

      const res = await fetch(`http://localhost:8000/borrows/${borrowId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (!res.ok) {
        toast.warning(result.message || "Failed to return the book!");
        return;
      }

      toast.success("The book has been returned successfully!");
      router.refresh();
    } catch (error) {
      console.error("Return Book Error:", error);
      toast.error("Something went wrong! Please try again.");
    } finally {
      setIsReturning(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleReturnBook}
      disabled={isReturning}
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#D9A18A] px-4 py-2.5 text-sm font-semibold text-[#A65338] transition hover:bg-[#FBF0EB] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <RotateCcw size={15} className={isReturning ? "animate-spin" : ""} />
      {isReturning ? "Returning..." : "Return Book"}
    </button>
  );
};

export default ReturnBookButton;
