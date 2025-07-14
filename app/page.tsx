'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { NewHeroSection } from '@/components/ui/new-hero-section';
import ProvenSuccess from '@/components/ProvenSuccess';
import Projects from '@/components/Projects';
import Pricing from '@/components/Pricing';
import TeamSection from '@/components/TeamSection';
import PartnersSection from '@/components/PartnersSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <NewHeroSection />
      <ProvenSuccess />
      <Projects />
      <TeamSection />
      <Pricing />
      <PartnersSection />
      <Footer />
    </main>
  );
}