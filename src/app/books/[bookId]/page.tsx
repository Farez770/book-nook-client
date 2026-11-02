import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import IBookType from "@/lib/bookType";
import NotFound from "@/app/not-found";

const BookDetailsPage = async ({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) => {
  const { bookId } = await params;
  //   const book = await getBookInfo(bookId);

  const res = await fetch(`http://localhost:8000/books/${bookId}`);
  if (!res.ok) {
    NotFound();
  }
  const book: IBookType = await res.json();
  console.log("From Book details page", book);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-16">
      <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-[minmax(260px,380px)_1fr] md:gap-12 lg:gap-16">
        <div className="flex justify-center md:justify-start">
          <div className="relative w-full max-w-[340px] overflow-hidden rounded-xl border border-white/10 shadow-xl sm:max-w-[380px]">
            <Image
              src={book.image}
              alt="Pride and Prejudice book cover"
              width={380}
              height={570}
              className="h-auto max-h-[620px] w-full object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-5">
            <Badge
              variant="outline"
              className="rounded-full px-4 py-3 bg-[#bcf5c3] text-[#08281c] text-sm font-medium"
            >
              {book.category}
            </Badge>
          </div>

          <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {book.title}
          </h1>

          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            by{" "}
            <span className="font-semibold text-emerald-600">
              {book.author}
            </span>
          </p>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            {book.description}
          </p>

          <Card className="mt-7 border-border/70 bg-transparent shadow-none">
            <CardContent className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:gap-8">
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">Added by</p>
                <p className="mt-1 font-semibold">{book.userName}</p>
                <p className="mt-1 break-all text-sm text-muted-foreground">
                  {book.userEmail}
                </p>
              </div>

              <div className="border-t border-border/70 pt-4 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
                <p className="text-sm text-muted-foreground">Copies left</p>
                <p className="mt-1 text-3xl font-bold text-emerald-600">
                  {book.totalCopies}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Button className="h-12 rounded-lg bg-emerald-600 px-6 font-semibold text-white hover:bg-emerald-700">
              <BookOpen size={18} />
              Borrow This Book
            </Button>

            <Link
              href="/books"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-emerald-600"
            >
              <ArrowLeft size={16} />
              Back to all books
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookDetailsPage;
