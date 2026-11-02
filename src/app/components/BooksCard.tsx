import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import IBookType from "@/lib/bookType";
import Image from "next/image";
import Link from "next/link";

export default async function BooksCard() {
  const res = await fetch("http://localhost:8000/books");
  const bookInfo: IBookType[] = await res.json();
  console.log(bookInfo);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bookInfo.map((book) => (
        <Card
          className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-[#E5E7DF] bg-white pt-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          key={book._id}
        >
          <div className="flex h-72 items-center justify-center overflow-hidden bg-[#F5F3ED] p-3">
            <Image
              src={book.image}
              alt="Book Cover Image"
              width={40}
              height={40}
              className="h-full w-auto max-w-full object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
            />
          </div>
          <CardHeader className="gap-3 p-5">
            <CardAction>
              <Badge
                variant="secondary"
                className="rounded-full bg-[#E6EFE7] px-3 py-1 text-[#174D38]"
              >
                {book.category}
              </Badge>
            </CardAction>
            <CardTitle className="line-clamp-2 font-serif text-xl font-bold text-[#20392C]">
              {book.title}
            </CardTitle>
            <CardDescription className="line-clamp-3 text-sm leading-6 text-[#68746B]">
              {book.description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto p-5 pt-0">
            <Link href="/books" className="w-full">
              <Button className="w-full cursor-pointer rounded-lg bg-[#174D38] text-white transition-colors hover:bg-[#103B2A]">
                View Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
