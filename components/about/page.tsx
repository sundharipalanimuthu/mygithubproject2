'use client';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Raleway, Satisfy } from 'next/font/google';
import { League_Spartan } from 'next/font/google';

const spartan = League_Spartan({ subsets: ['latin'], weight: ['400', '700'] });

const satisfy = Satisfy({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

// Optimized dynamic imports with proper loading states
const FaGithub = dynamic(() => import('react-icons/fa').then(m => m.FaGithub), { 
  ssr: false,
  loading: () => <div className="w-4 h-4 bg-gray-300 rounded animate-pulse" />
});
const FaMedium = dynamic(() => import('react-icons/fa').then(m => m.FaMedium), { 
  ssr: false,
  loading: () => <div className="w-4 h-4 bg-gray-300 rounded animate-pulse" />
});
const FaLinkedin = dynamic(() => import('react-icons/fa').then(m => m.FaLinkedin), { 
  ssr: false,
  loading: () => <div className="w-4 h-4 bg-gray-300 rounded animate-pulse" />
});
const FaStackOverflow = dynamic(() => import('react-icons/fa').then(m => m.FaStackOverflow), { 
  ssr: false,
  loading: () => <div className="w-4 h-4 bg-gray-300 rounded animate-pulse" />
});
const FaTwitter = dynamic(() => import('react-icons/fa').then(m => m.FaTwitter), { 
  ssr: false,
  loading: () => <div className="w-4 h-4 bg-gray-300 rounded animate-pulse" />
});

export default function AboutPage() {
  return (
    <div className="bg-white text-primaryText font-raleway text-[15px] font-light leading-[20px] tracking-[.02em] lg:pl-45 lg:pt-15 border-b border-b-[#e2e3e4]">
      <div className="py-20 md:py-25 lg:py-10">
        <div className="w-full max-w-[1140px] mx-auto h-auto px-4 sm:px-6 lg:px-0">
          <div className="flex flex-wrap justify-between px-4 sm:px-12 lg:mr-28">
            <div className="relative w-full pt-5 py-0 mr-10">
              <h3 className="text-[#233142] font-bold capitalize leading-none text-[30px] ml-0 max-w-full h-auto lg:pl-[50px] md:pl-5 pl-3 pt-2">
                About Me<span className="text-red-600">.</span>
              </h3>
            </div>

            <div className="mr-15">
              <div className="grid grid-cols-1 md:grid-cols-3 p-2 sm:p-4">
                <div className="w-full flex flex-col items-center">
                  <div className="w-full flex justify-center mb-4">
                    <Image
                      src="/navarasu/img/navarasu.webp"
                      alt="Navarasu"
                      width={231}
                      height={329}
                      sizes="(max-width: 640px) 352px, (max-width: 768px) 230px, 231px"
                      className="w-[352px] h-[501px] shadow-lg sm:w-[230px] sm:h-auto object-contain my-auto"
                      priority
                      loading="eager"
                    />
                  </div>

                  <div className="text-center tracking-wide w-full">
                    <h4
                      className={`${raleway.className} text-[#1e4356] font-medium text-[25.6px] leading-[30px] mb-1 sm:text-[24px] sm:leading-[28px] md:text-[22px] md:leading-[26px] lg:text-[25.6px] lg:leading-[30px]`}
                    >
                      Navarasu
                    </h4>

                    <span className="pt-3 italic text-[#1e4356] block mb-3 text-[16px] sm:text-[15px] md:text-[14px] lg:text-[16px]">
                      Solution Architect
                    </span>

                    <ul className="flex justify-center text-[#1e4356] gap-2 flex-wrap pt-3 py-6">
                      {[FaGithub, FaMedium, FaLinkedin, FaStackOverflow, FaTwitter].map((Icon, idx) => (
                        <li key={idx}>
                          <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-[36px] h-[36px] bg-[#eef2f6] rounded-full flex items-center justify-center hover:bg-[#dde4ea] transition-colors sm:w-[32px] sm:h-[32px] md:w-[30px] md:h-[30px] lg:w-[36px] lg:h-[36px]"
                          >
                            <Icon size={16} className="sm:w-[14px] sm:h-[14px] md:w-[13px] md:h-[13px] lg:w-[16px] lg:h-[16px]" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                  <div className="w-full px-4 md:px-0 mx-auto max-w-full md:max-w-[780px]">
                    <h3
                      className="
                        italic text-[#1e4356] font-light text-[18px] sm:text-[19px] md:text-[20.5px]
                        leading-[1.8rem] text-justify break-words
                      "
                    >
                      A Vim fanatic | Data Enthusiast | Devoted Flautist | Intense Samyama Practitioner | Highly Passionate about end‑to‑end digitisation of Health Care
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 md:gap-6 mt-6 w-full lg:gap-6 max-w-[783px] py-4">
                    {[{
                      years: '14',
                      subtitle: 'Years of Experience in IT Industry',
                      desc: 'Born and brought up in both technology and business, I have played versatile roles in this industry, as a Product Designer and Developer, Business Analyst and Project Manager, Pre and Post Sales, QA and Test Automation, DevOps and Data Architect.',
                    }, {
                      years: '21',
                      subtitle: 'Years of Experience in Programming',
                      desc: 'Started with 99\'s FoxPro & Visual Basic to today\'s Rust & Julia, I have been exploring the highest possibility of technology for solving industrial problems. I also have expertise in Health Care, Finance, Intellectual Property, and e-commerce domains.',
                    }].map(({ years, subtitle, desc }, idx) => (
                      <div key={idx} className={`w-full h-auto ${idx === 1 ? 'lg:pl-14' : ''}`}>
                        <div className="flex flex-col bg-white p-5 h-full">
                          <div className="flex items-start gap-6 mb-3">
                            <span className={`${satisfy.className} text-5xl font-bold text-[#1e4356]`} style={{
                              WebkitTextStroke: '0.5px #1e4356',
                              fontWeight: 400,
                            }}>
                              {years}
                              <sup className="text-xl align-super pl-1">+</sup>
                            </span>
                            <div>
                              <span className="block text-[#1e4356] text-[16px] leading-tight font-light font-opensans uppercase max-w-[380px] lg:w-[225px] lg:h-[40px]">
                                {subtitle}
                              </span>
                            </div>
                          </div>
                          <p className={`${raleway.className} text-[15px] text-[#586069] leading-[1.4em] mt-[-10px] p-0 lg:w-[340px]`}>
                            {desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-right mt-0 pl-5">
                    <h2 className={`text-center text-gray-400 text-3xl font-light tracking-wide ${spartan.className}`}>
                      Companies
                    </h2>

                    <div className="pt-5 contrast-125 brightness-110 flex-shrink-0 w-4/5 lg:w-auto flex justify-center gap-6 md:gap-8 flex-wrap">
                      {[
                        { src: 'https://navarasu.com/navarasu/img/i2i.9937d6d.svg', alt: 'Ideas2It', width: 94, height: 120 },
                        { src: 'zoho.svg', alt: 'Zoho', width: 140, height: 80 },
                        { src: 'https://navarasu.com/navarasu/img/vits.73b9758.svg', alt: 'Virtusa', width: 120, height: 100 },
                        { src: 'https://navarasu.com/navarasu/img/prmti.a5f5ade.svg', alt: 'Pramati', width: 150, height: 105 },
                        { src: 'franciumlogo.svg', alt: 'Francium Tech', width: 160, height: 136 },
                      ].map(({ src, alt, width, height }) => (
                        <div
                          key={alt}
                          className="contrast-125 brightness-110 w-1/2 sm:w-1/2 md:w-auto flex justify-center"
                        >
                          <Image
                            src={src}
                            alt={alt}
                            width={width}
                            height={height}
                            className="h-auto max-h-[80px] sm:max-h-[70px] md:max-h-[60px] object-contain"
                            loading="lazy"
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                          
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


