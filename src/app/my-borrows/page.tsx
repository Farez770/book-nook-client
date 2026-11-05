import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, CalendarDays, RotateCcw } from "lucide-react";

const borrowedBooks = [
  {
    id: 1,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    borrowDate: "Oct 20, 2026",
    returnDate: "Nov 10, 2026",
  },
  {
    id: 2,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
    borrowDate: "Oct 25, 2026",
    returnDate: "Nov 15, 2026",
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
    borrowDate: "Oct 28, 2026",
    returnDate: "Nov 18, 2026",
  },
];

export default function MyBorrowsPage() {
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

        <section className="overflow-hidden rounded-2xl border border-[#E5E1D7] bg-white">
          <div className="flex flex-col gap-2 border-b border-[#EAE7DE] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <h2 className="font-serif text-xl font-bold">Borrowed Books</h2>
              <p className="mt-1 text-sm text-[#68746B]">
                Your books and their scheduled return dates
              </p>
            </div>
            <span className="w-fit rounded-full bg-[#EAF1E9] px-3 py-1.5 text-xs font-semibold text-[#174D38]">
              {borrowedBooks.length} books
            </span>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead className="bg-[#F8F6F0] text-xs uppercase tracking-wider text-[#68746B]">
                <tr>
                  <th className="px-6 py-4 font-semibold">Book Details</th>
                  <th className="px-5 py-4 font-semibold">Borrow Date</th>
                  <th className="px-5 py-4 font-semibold">Return Date</th>
                  <th className="px-6 py-4 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE7DE]">
                {borrowedBooks.map((book) => (
                  <tr key={book.id} className="transition hover:bg-[#FCFBF8]">
                    <td className="px-6 py-5">
                      <div className="flex min-w-56 items-center gap-4">
                        <Image
                          src={book.image}
                          alt={book.title}
                          width={64}
                          height={84}
                          className="h-20 w-14 rounded-md object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-[#20392C]">
                            {book.title}
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
                        {book.borrowDate}
                      </div>
                    </td>
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-2 text-sm text-[#536458]">
                        <CalendarDays
                          size={15}
                          className="shrink-0 text-[#B66E4D]"
                        />
                        {book.returnDate}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#D9A18A] px-4 py-2.5 text-sm font-semibold text-[#A65338] transition hover:bg-[#FBF0EB]"
                      >
                        <RotateCcw size={15} />
                        Return Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 p-4 md:hidden">
            {borrowedBooks.map((book) => (
              <article
                key={book.id}
                className="rounded-xl border border-[#E5E1D7] p-4"
              >
                <div className="flex gap-4">
                  <Image
                    src={book.image}
                    alt={book.title}
                    width={80}
                    height={112}
                    className="h-28 w-20 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-lg font-bold">
                      {book.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#68746B]">{book.author}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-[#F8F6F0] p-3">
                  <div>
                    <p className="text-xs text-[#89938A]">Borrow Date</p>
                    <p className="mt-1 text-sm font-medium">
                      {book.borrowDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#89938A]">Return Date</p>
                    <p className="mt-1 text-sm font-medium">
                      {book.returnDate}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-[#D9A18A] px-4 py-3 text-sm font-semibold text-[#A65338] transition hover:bg-[#FBF0EB] cursor-pointer"
                >
                  <RotateCcw size={15} />
                  Return Book
                </button>
              </article>
            ))}
          </div>

          <div className="border-t border-[#EAE7DE] px-5 py-4 text-xs leading-5 text-[#89938A] sm:px-7">
            Please return your books on time so other readers can enjoy them
            too.
          </div>
        </section>
      </div>
    </main>
  );
}
