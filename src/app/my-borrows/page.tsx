import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, CalendarDays } from "lucide-react";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import IBorrowType from "@/lib/borrowType";
import ReturnBookButton from "@/app/components/ReturnBookButton";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const MyBorrowsPage = async () => {
  const token = await getTokenFromServer();

  let borrows: IBorrowType[] = [];
  let hasError = false;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows`, {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (res.ok) {
      borrows = await res.json();
    } else {
      hasError = true;
    }
  } catch {
    hasError = true;
  }

  return (
    <main className="min-h-screen bg-[#FAF8F2] px-4 py-10 text-[#20392C] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/books"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#68746B] transition hover:text-[#174D38]"
        >
          <ArrowLeft size={17} />
          Browse Books
        </Link>

        <section className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#B66E4D]">
              Your Reading Shelf
            </p>
            <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
              My Borrows
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#68746B] sm:text-base">
              Keep track of the books you have borrowed and their return dates.
            </p>
          </div>

          <Link
            href="/books"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-[#174D38] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#103B2B]"
          >
            <BookOpen size={17} />
            Explore Books
          </Link>
        </section>

        {hasError && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            Failed to load your borrowed books. Please try again later.
          </div>
        )}

        {borrows.length === 0 ? (
          <section className="rounded-2xl border border-[#E5E1D7] bg-white px-6 py-16 text-center">
            <BookOpen size={40} className="mx-auto mb-4 text-[#B66E4D]" />
            <h2 className="font-serif text-2xl font-bold">
              You have not borrowed any books yet
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-[#68746B]">
              Browse the library and borrow your first book to see it listed
              here.
            </p>
            <Link
              href="/books"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#174D38] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#103B2B]"
            >
              <BookOpen size={17} />
              Browse All Books
            </Link>
          </section>
        ) : (
          <section className="overflow-hidden rounded-2xl border border-[#E5E1D7] bg-white">
            <div className="flex flex-col gap-2 border-b border-[#EAE7DE] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div>
                <h2 className="font-serif text-xl font-bold">Borrowed Books</h2>
                <p className="mt-1 text-sm text-[#68746B]">
                  Your books and their scheduled return dates
                </p>
              </div>
              <span className="w-fit rounded-full bg-[#EAF1E9] px-3 py-1.5 text-xs font-semibold text-[#174D38]">
                {borrows.length} books
              </span>
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left">
                <thead className="bg-[#F8F6F0] text-xs uppercase tracking-wider text-[#68746B]">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Book Details</th>
                    <th className="px-5 py-4 font-semibold">Borrow Date</th>
                    <th className="px-5 py-4 font-semibold">Return Date</th>
                    <th className="px-6 py-4 text-right font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE7DE]">
                  {borrows.map((borrow) => (
                    <tr
                      key={borrow._id}
                      className="transition hover:bg-[#FCFBF8]"
                    >
                      <td className="px-6 py-5">
                        <div className="flex min-w-56 items-center gap-4">
                          <div className="flex h-20 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#F5F3ED]">
                            <Image
                              src={borrow.bookImage}
                              alt={borrow.bookTitle}
                              width={56}
                              height={80}
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#20392C]">
                              {borrow.bookTitle}
                            </h3>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2 text-sm text-[#536458]">
                          <CalendarDays
                            size={15}
                            className="shrink-0 text-[#B66E4D]"
                          />
                          {formatDate(borrow.borrowDate)}
                        </div>
                      </td>
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2 text-sm text-[#536458]">
                          <CalendarDays
                            size={15}
                            className="shrink-0 text-[#B66E4D]"
                          />
                          {formatDate(borrow.returnDate)}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <ReturnBookButton borrowId={borrow._id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 p-4 md:hidden">
              {borrows.map((borrow) => (
                <article
                  key={borrow._id}
                  className="rounded-xl border border-[#E5E1D7] p-4"
                >
                  <div className="flex gap-4">
                    <div className="flex h-28 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#F5F3ED]">
                      <Image
                        src={borrow.bookImage}
                        alt={borrow.bookTitle}
                        width={80}
                        height={112}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif text-lg font-bold">
                        {borrow.bookTitle}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-[#F8F6F0] p-3">
                    <div>
                      <p className="text-xs text-[#89938A]">Borrow Date</p>
                      <p className="mt-1 text-sm font-medium">
                        {formatDate(borrow.borrowDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#89938A]">Return Date</p>
                      <p className="mt-1 text-sm font-medium">
                        {formatDate(borrow.returnDate)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <ReturnBookButton borrowId={borrow._id} />
                  </div>
                </article>
              ))}
            </div>

            <div className="border-t border-[#EAE7DE] px-5 py-4 text-xs leading-5 text-[#89938A] sm:px-7">
              Please return your books on time so other readers can enjoy them
              too.
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default MyBorrowsPage;
