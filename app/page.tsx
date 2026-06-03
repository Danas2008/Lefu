import Hero from "@/components/home/Hero";
import FeaturedDishes from "@/components/home/FeaturedDishes";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import GalleryPreview from "@/components/home/GalleryPreview";
import Reviews from "@/components/home/Reviews";
import ReservationCTA from "@/components/home/ReservationCTA";
import ContactInfo from "@/components/home/ContactInfo";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedDishes />
      <WhyChooseUs />
      <GalleryPreview />
      <Reviews />
      <ReservationCTA />
      <ContactInfo />
    </>
  );
}
