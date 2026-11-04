"use client";

import { Button, Modal, toast } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const DeleteBookModal = ({ bookId }: { bookId: string }) => {
  const router = useRouter();
  const handleDeleteBook = async () => {
    const res = await fetch(`http://localhost:8000/books/${bookId}`, {
      method: "DELETE",
    });
    await res.json();

    toast.success("The book is delete from your Book list");
    router.refresh();
  };

  return (
    <Modal>
      <Button
        type="button"
        className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
      >
        <Trash2 size={15} />
        Delete
      </Button>

      <Modal.Backdrop className="bg-black/40 backdrop-blur-sm">
        <Modal.Container>
          <Modal.Dialog className="w-full max-w-[400px] rounded-2xl border border-[#E5E7DF] bg-white p-0 text-[#20392C] shadow-2xl">
            <Modal.CloseTrigger className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700" />

            <Modal.Header className="flex flex-col items-center gap-4 px-6 pb-2 pt-8 text-center">
              <div className="space-y-2">
                <Modal.Heading className="font-serif text-2xl font-bold tracking-tight text-[#20392C]">
                  Delete this book?
                </Modal.Heading>
                <p className="text-sm leading-6 text-[#68746B]">
                  Are you sure you want to remove this book from your
                  collection?
                </p>
              </div>
            </Modal.Header>

            <Modal.Body className="px-6 py-4">
              <div className="rounded-lg border border-red-100 bg-red-50/60 px-4 py-3">
                <p className="text-center text-sm leading-6 text-red-700">
                  This action cannot be undone. The book will be permanently
                  deleted.
                </p>
              </div>
            </Modal.Body>

            <Modal.Footer className="flex flex-col-reverse gap-3 border-t border-[#E5E7DF] px-6 py-5 sm:flex-row sm:justify-end">
              <Button
                type="button"
                slot="close"
                className="w-full cursor-pointer rounded-lg border border-[#DDE3DA] bg-white px-5 py-2.5 font-medium text-[#20392C] transition hover:bg-[#F5F6F1] sm:w-auto"
              >
                Cancel
              </Button>

              <Button
                type="button"
                onClick={handleDeleteBook}
                className="w-full cursor-pointer rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-red-700 sm:w-auto"
              >
                <Trash2 size={16} />
                Delete Book
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default DeleteBookModal;
