'use client';

import dynamic from 'next/dynamic';
import { Satisfy } from 'next/font/google';
import { socialLinks } from '@/data/footerData';
import { JSX } from "react";

const FaGithub = dynamic(() => import('react-icons/fa').then(m => m.FaGithub), { ssr: false });
const FaMedium = dynamic(() => import('react-icons/fa').then(m => m.FaMedium), { ssr: false });
const FaLinkedin = dynamic(() => import('react-icons/fa').then(m => m.FaLinkedin), { ssr: false });
const FaStackOverflow = dynamic(() => import('react-icons/fa').then(m => m.FaStackOverflow), { ssr: false });
const FaTwitter = dynamic(() => import('react-icons/fa').then(m => m.FaTwitter), { ssr: false });

const satisfy = Satisfy({ weight: '400', subsets: ['latin'] });

const iconsMap: Record<string, JSX.Element> = {
  github: <FaGithub className="w-4 h-4" />,
  medium: <FaMedium className="w-4 h-4" />,
  linkedin: <FaLinkedin className="w-4 h-4" />,
  stackoverflow: <FaStackOverflow className="w-4 h-4" />,
  twitter: <FaTwitter className="w-3.5 h-3.5" />,
};

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="relative w-full h-64 sm:h-60 lg:h-[339.19px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-top"
          style={{
            backgroundImage:
              "url('https://navarasu.com/navarasu/img/footer.248d512.webp')",
          }}
        ></div>
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h4
            className={`text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 ${satisfy.className}`}
          >
           <strong> Navarasu </strong>
          </h4>

          {/* Social Icons */}
   <ul className="flex justify-center flex-wrap gap-0 sm:gap-2 mb-6 sm:mb-8">
  {socialLinks.map(({ href, icon, label }, i) => (
    <li key={i}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} profile of Navarasu`}
        className="w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-[#FE4066] text-white hover:bg-[#e33355] transition duration-300 shadow-md"
      >
        {iconsMap[icon]}
      </a>
    </li>
  ))}
</ul>


          {/* Copyright */}
          <p className="text-xs sm:text-sm font-medium">
            © Copyright Navarasu. All Rights Reserved
          </p>
        </div>
      </div>

      {/* Scroll-to-top Button */}
 <button
  type="button"
  aria-label="Scroll to top"
  className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[#FE4066] text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-[#e33355] transition-colors"
>
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
</button>

    </footer>
  );
}
