"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    title: "A small library, open to everyone",
    description:
      "Browse the shelf, borrow a book for a week, or leave one you have finished for the next reader. Free to join, and it takes a minute.",
    image: "/slider-img-main.jpg",
    highlight: "everyone",
  },
  {
    title: "Discover Your Next Great Book",
    description:
      "Explore thousands of books, from timeless classics to modern bestsellers, all in one place.",
    image: "/slider-img1.jpg",
    highlight: "Great Book",
  },
  {
    title: "Every Book Opens a New World",
    description:
      "Travel through different stories, discover new perspectives, and let your imagination grow.",
    image: "/slider-img2.jpg",
    highlight: "New World",
  },
  {
    title: "Find Stories Worth Sharing",
    description:
      "From inspiring journeys to unforgettable adventures, your next favorite read is waiting for you.",
    image: "slider-img3.jpg",
    highlight: "Worth Sharing",
  },
];

const HeroBanner = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const isMounted = useSyncExternalStore(
    (subscribe) => subscribe,
    () => true,
    () => false,
  );

  return (
    <section className="w-full">
      {!isMounted ? (
        <div className="min-h-[460px] w-full bg-[#071F17] sm:min-h-[520px] lg:min-h-[580px]" />
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={0}
          direction="horizontal"
          effect="slide"
          loop={true}
          speed={1000}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          onSwiper={setSwiperInstance}
          pagination={{ clickable: true }}
          className="hero-swiper relative w-full"
        >
          {slides.map((slide, ind) => (
            <SwiperSlide key={ind}>
              <div
                className=" relative flex min-h-[460px] w-full items-center bg-[length:100%_100%] bg-center bg-no-repeat px-6 py-16 sm:min-h-[520px] sm:px-12 lg:min-h-[580px] lg:px-20"
                style={{ backgroundImage: `url('${slide.image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#071F17]/95 via-[#071F17]/75 to-[#071F17]/20" />

                <div className="relative z-10 mx-auto w-full max-w-7xl text-white">
                  <span className="mb-5 inline-block rounded-full border border-green-300/40 bg-green-300/10 px-4 py-2 text-sm font-medium text-green-200">
                    Welcome to BookNook
                  </span>

                  <h1 className="mb-5 max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">
                    {slide.title.split(slide.highlight)[0]}
                    <span className="text-[#C5EF70]">{slide.highlight}</span>
                    {slide.title.split(slide.highlight)[1]}
                  </h1>

                  <p className="mb-8 max-w-xl text-base leading-7 text-gray-200 sm:text-lg">
                    {slide.description}
                  </p>

                  <Link
                    href="/books"
                    className="inline-flex items-center gap-3 rounded-lg bg-[#C5EF70] px-7 py-3.5 font-semibold text-[#123D2D] transition-all duration-300 hover:-translate-y-1 hover:bg-[#D5F99A]"
                  >
                    Browse Books
                    <ArrowRight size={19} />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Previous Button */}
          <button
            ref={prevRef}
            type="button"
            onClick={() => swiperInstance?.slidePrev()}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition hover:bg-[#174D38] sm:left-8 sm:h-12 sm:w-12"
          >
            <ChevronLeft size={25} />
          </button>

          {/* Custom Next Button */}
          <button
            ref={nextRef}
            type="button"
            onClick={() => swiperInstance?.slideNext()}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition hover:bg-[#174D38] sm:right-8 sm:h-12 sm:w-12"
          >
            <ChevronRight size={25} />
          </button>
        </Swiper>
      )}
    </section>
  );
};

export default HeroBanner;
