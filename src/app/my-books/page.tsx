import Image from "next/image";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import IBookType from "@/lib/bookType";
import { headers } from "next/headers";
import React from "react";
import DeleteBookModal from "../components/DeleteBookModal";
import EditBookModal from "../components/EditBookModal";

const MyBookPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const res = await fetch(`http://localhost:8000/my-booking/${user?.email}`);
  const bookings: IBookType[] = await res.json();
  console.log(bookings);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:pb-14 lg-pt-8">
      <section className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#8A6848]">
            Your Collection
          </p>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-[#20392C] sm:text-4xl lg:text-5xl">
            My Books
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#68746B] sm:text-base">
            Manage the books you have shared with the BookNook community. Keep
            your collection organized and up to date.
          </p>
        </div>

        <Link
          href="/add-book"
          className="inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-[#174D38] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#103B2A]"
        >
          <Plus size={18} />
          Add New Book
        </Link>
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#E5E7DF]">
        <div className="flex flex-col gap-2 border-b border-[#E5E7DF] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#20392C]">
              Your Collection
            </h2>
            <p className="mt-1 text-sm text-[#68746B]">
              Books you have added to the library
            </p>
          </div>
          <span className="w-fit rounded-full bg-[#E6EFE7] px-3 py-1 text-xs font-semibold text-[#174D38]">
            {bookings.length} Books
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-[#F7F6F0]">
              <tr className="text-xs font-semibold uppercase tracking-wider text-[#68746B]">
                <th className="px-6 py-4">Book Details</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Total Copies</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E5E7DF]">
              {bookings.map((book) => (
                <tr
                  key={book._id}
                  className="transition-colors hover:bg-[#FAFAF6]"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-20 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#F5F3ED]">
                        <Image
                          src={book.image}
                          alt={book.title}
                          width={56}
                          height={80}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="max-w-xs truncate font-semibold text-[#20392C]">
                          {book.title}
                        </h3>
                        <p className="mt-1 text-sm text-[#68746B]">
                          {book.author}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-5">
                    <span className="inline-flex rounded-full bg-[#E6EFE7] px-3 py-1 text-xs font-medium text-[#174D38]">
                      {book.category}
                    </span>
                  </td>

                  <td className="px-5 py-5">
                    <span className="text-sm font-semibold text-[#20392C]">
                      {book.totalCopies} copies
                    </span>
                  </td>

                  <td className="px-5 py-5">
                    <div className="flex items-center justify-end gap-2">
                      {/* <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg border border-[#D9E2D8] px-3 py-2 text-sm font-medium text-[#174D38] transition-colors hover:bg-[#E6EFE7] cursor-pointer"
                      >
                        <Pencil size={15} />
                        Edit
                      </button> */}
                      <EditBookModal bookData={book} />
                      <DeleteBookModal bookId={book._id} />
                      {/* <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 size={15} />
                        <DeleteBookModal/>
                        
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-[#E5E7DF] px-5 py-4 text-sm text-[#68746B] sm:px-6">
          Showing {bookings.length} books in your collection
        </div>
      </section>
    </main>
  );
};

export default MyBookPage;
