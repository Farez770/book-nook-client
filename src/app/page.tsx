import HeroBanner from "./components/HeroBanner";
import HowItWorks from "./components/HowItWorks";
import ReaderReviews from "./components/ReaderReviews";
import TopCategories from "./components/TopCategories";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <HowItWorks />
      <TopCategories />
      <ReaderReviews />
    </div>
  );
}
