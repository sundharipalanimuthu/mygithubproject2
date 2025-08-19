'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Loader from '@/components/loader/Loader';

// Minimal skeleton loader for lazy-loaded sections
function LoadingPlaceholder({ section }: { section: string }) {
  return (
    <div className="h-60 flex items-center justify-center">
      <div className="text-gray-500 text-sm animate-pulse">
        Loading {section}...
      </div>
    </div>
  );
}

// Dynamically import Header also
const Header = dynamic(() => import('@/components/header/Header'), {
  ssr: true, // Keep SSR for header
  loading: () => <div className="p-4 text-center">Loading Header...</div>,
});

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [visibleSections, setVisibleSections] = useState({
    about: false,
    opensources: false,
    blog: false,
    contact: false,
    footer: false,
  });

  const [sections, setSections] = useState<{
    AboutPage?: React.ComponentType;
    OpenSources?: React.ComponentType;
    Blogs?: React.ComponentType;
    ContactSection?: React.ComponentType;
    Footer?: React.ComponentType;
  }>({});

  const sectionRefs = {
    about: useRef<HTMLDivElement>(null),
    opensources: useRef<HTMLDivElement>(null),
    blog: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
    footer: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id as keyof typeof visibleSections;
            setVisibleSections((prev) => ({ ...prev, [id]: true }));

            // Load component only when visible
            if (id === 'about' && !sections.AboutPage) {
              const mod = await import('@/components/about/page');
              setSections((prev) => ({ ...prev, AboutPage: mod.default }));
            }
            if (id === 'opensources' && !sections.OpenSources) {
              const mod = await import('@/components/opensources/page');
              setSections((prev) => ({ ...prev, OpenSources: mod.default }));
            }
            if (id === 'blog' && !sections.Blogs) {
              const mod = await import('@/components/blog/Blog');
              setSections((prev) => ({ ...prev, Blogs: mod.default }));
            }
            if (id === 'contact' && !sections.ContactSection) {
              const mod = await import('@/components/contact/page');
              setSections((prev) => ({ ...prev, ContactSection: mod.default }));
            }
            if (id === 'footer' && !sections.Footer) {
              const mod = await import('@/components/footer/page');
              setSections((prev) => ({ ...prev, Footer: mod.default }));
            }
          }
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <main
        className={`transition-opacity duration-700 ease-in-out ${
          loading ? 'opacity-0 pointer-events-none select-none' : 'opacity-100'
        }`}
      >
        <div id="header">
          <Header />
        </div>

        <section id="about" ref={sectionRefs.about}>
          {visibleSections.about
            ? sections.AboutPage
              ? <sections.AboutPage />
              : <LoadingPlaceholder section="About" />
            : null}
        </section>

        <section id="opensources" ref={sectionRefs.opensources}>
          {visibleSections.opensources
            ? sections.OpenSources
              ? <sections.OpenSources />
              : <LoadingPlaceholder section="OpenSources" />
            : null}
        </section>

        <section id="blog" ref={sectionRefs.blog}>
          {visibleSections.blog
            ? sections.Blogs
              ? <sections.Blogs />
              : <LoadingPlaceholder section="Blogs" />
            : null}
        </section>

        <section id="contact" ref={sectionRefs.contact}>
          {visibleSections.contact
            ? sections.ContactSection
              ? <sections.ContactSection />
              : <LoadingPlaceholder section="Contact" />
            : null}
        </section>

        <section id="footer" ref={sectionRefs.footer}>
          {visibleSections.footer
            ? sections.Footer
              ? <sections.Footer />
              : <LoadingPlaceholder section="Footer" />
            : null}
        </section>
      </main>
    </>
  );
}
