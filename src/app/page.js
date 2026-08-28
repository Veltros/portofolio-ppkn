import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import ActivityTimeline from '../components/ActivityTimeline';
import DocumentationGallery from '../components/DocumentationGallery';
import PancasilaSection from '../components/PancasilaSection';
import SelfAssessment from '../components/SelfAssessment';
import Reflection from '../components/Reflection';
import Conclusion from '../components/Conclusion';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <PancasilaSection />
      <ActivityTimeline />
      <DocumentationGallery />
      <SelfAssessment />
      <Reflection />
      <Conclusion />
      <Footer />
    </main>
  );
}
