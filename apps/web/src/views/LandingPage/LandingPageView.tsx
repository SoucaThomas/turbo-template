import { CTA, Features, Footer, Hero, TechStack } from './components';

export default function LandingPageView() {
  return (
    <div className='min-h-screen'>
      <Hero />
      <Features />
      <TechStack />
      <CTA />
      <Footer />
    </div>
  );
}
