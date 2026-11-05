import React, { Suspense } from "react";
import BooksCard from "../components/BooksCard";
import { BookOpen, Sparkles } from "lucide-react";
import IBookType from "@/lib/bookType";

const AllBooksPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`);
  const bookInfo: IBookType[] = await res.json();
  console.log(bookInfo);

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-4 py-8 sm:px-6 sm:pb-16 sm:pt-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-10 text-center sm:mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#DCE5D9] bg-white px-4 py-2 text-sm font-medium text-[#315B43] shadow-sm">
            <BookOpen size={16} />
            <span>Your Next Favorite Read Awaits</span>
          </div>

          <h1 className="font-serif text-3xl font-bold tracking-tight text-[#20392C] sm:text-4xl lg:text-5xl">
            Explore Our <span className="text-[#B66A50]">Library</span>
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-6 text-[#68746B] sm:text-lg sm:leading-7">
            From timeless classics to exciting new discoveries, find the books
            that inspire your imagination, expand your knowledge, and bring your
            next reading adventure to life.
          </p>

          <div className="mt-5 flex items-center justify-center gap-2 text-sm text-[#526B59]">
            <Sparkles size={16} />
            <span>Discover stories. Explore ideas. Keep reading.</span>
          </div>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-[#B66A50]" />
        </section>

        <Suspense
          fallback={
            <div className="py-16 text-center text-[#68746B]">
              Loading your library...
            </div>
          }
        >
          <BooksCard bookInfo={bookInfo} />
        </Suspense>
      </div>
    </main>
  );
};

export default AllBooksPage;
