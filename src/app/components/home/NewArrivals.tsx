import IBookType from "@/lib/bookType";
import React, { Suspense } from "react";
import BooksCard from "../BooksCard";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

const NewArrivals = async () => {
  const res = await fetch("http://localhost:8000/new-arrivals");
  const books: IBookType[] = await res.json();
  console.log(books);
  const newArrivals = books.slice(0, 6);

  console.log(newArrivals);

  return (
    <section className="mt-12 mx-auto w-full max-w-7xl px-6 sm:px-10  lg:px-16">
      <div className="mb-10 text-center">
        <h2 className="font-serif text-3xl font-bold  text-[#20392C] sm:text-4xl md:text-5xl">
          New Arrivals
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#55504B] sm:text-base">
          {/* text-[#55504B]  text-[#68746B] */}
          Discover the latest additions to our library, from captivating stories
          to inspiring ideas. Find your next favorite book and start a new
          reading adventure.
        </p>
      </div>
      <Suspense
        fallback={
          <div className="py-16 text-center text-[#68746B]">
            Loading your library...
          </div>
        }
      >
        <BooksCard bookInfo={newArrivals} />
      </Suspense>

      <div className="pt-8 text-center text-[#0a4b1a] cursor-pointer ">
        <Link
          href="/books"
          className="inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-[#174D38] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#103B2A]"
        >
          See All Books <GoArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default NewArrivals;
