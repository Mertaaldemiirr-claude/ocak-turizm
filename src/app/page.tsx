import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Destinations from "@/components/Destinations";
import Experiences from "@/components/Experiences";
import About from "@/components/About";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import ReservationForm from "@/components/ReservationForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Destinations />
      <Experiences />
      <About />
      <WhyUs />
      <Testimonials />
      <ReservationForm />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
