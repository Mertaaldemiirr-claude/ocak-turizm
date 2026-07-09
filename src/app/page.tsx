import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedTours from "@/components/FeaturedTours";
import Destinations from "@/components/Destinations";
import CtaBanner from "@/components/CtaBanner";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ReservationForm from "@/components/ReservationForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedTours />
      <Destinations />
      <CtaBanner />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <ReservationForm />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
