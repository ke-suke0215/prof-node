import type { Route } from './+types/home';
import { Header } from '../components/landing/Header';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { CTA } from '../components/landing/CTA';
import { Footer } from '../components/landing/Footer';
import { LandingEffects } from '../components/landing/LandingEffects';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'ProfNode - 新しい出会いのカタチ' },
    {
      name: 'description',
      content:
        'ProfNodeは、あなたのプロフィールやSNS、ポートフォリオを一つにまとめ、簡単に共有できるデジタル名刺サービスです。',
    },
  ];
}

export default function Home() {
  return (
    <div id="aurora-wrapper" className="relative overflow-x-hidden">
      <LandingEffects />
      <Header />
      <main>
        <Hero />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
