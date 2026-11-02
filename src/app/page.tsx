import { Suspense } from "react";
import HeroBanner from "./components/home/HeroBanner";
import HowItWorks from "./components/home/HowItWorks";
import NewArrivals from "./components/home/NewArrivals";
import ReaderReviews from "./components/home/ReaderReviews";
import TopCategories from "./components/home/TopCategories";

export default async function Home() {
  return (
    <div>
      <HeroBanner />
      <Suspense fallback={<div>New Arrivals Books is Loading....</div>}>
        <NewArrivals />
      </Suspense>
      <HowItWorks />
      <TopCategories />
      <ReaderReviews />
    </div>
  );
}
