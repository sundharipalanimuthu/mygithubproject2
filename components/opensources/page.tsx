"use client";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";

type Repo = {
  title: string;
  href: string;
  imageSrc: string;
  badgeSrc: string;
  badgeAlt: string;
  desc: string;
  langColor: string;
  lang: string;
  shortLang: string;
  forks: number;
  stars: number;
};

type GitHubRepo = {
  name: string;
  html_url: string;
  description?: string;
  language?: string;
  forks_count?: number;
  stargazers_count?: number;
};

const cache = new Map<string, unknown>();
const CACHE_DURATION = 5 * 60 * 1000;

async function fetchWithCache(url: string): Promise<unknown> {
  const cached = cache.get(url);
  if (
    cached &&
    Date.now() - (cached as { timestamp: number }).timestamp < CACHE_DURATION
  ) {
    return (cached as { data: unknown }).data;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    cache.set(url, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    console.error("Failed to fetch:", url, error);
    return null;
  }
}

export default function OpenSources() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const repoUrls = [
      "https://api.github.com/repos/navarasu/opencv-log",
      "https://api.github.com/repos/navarasu/serverless-ruby-layer",
      "https://api.github.com/repos/navarasu/onedark.nvim",
    ];

    const fetchRepos = async () => {
      try {
        const data = await Promise.all(
          repoUrls.map((url) => fetchWithCache(url))
        );
        const formatted = data
          .filter(Boolean)
          .map((repo) => {
            const r = repo as GitHubRepo;
            return {
              title: r.name,
              href: r.html_url,
              imageSrc:
                r.name === "opencv-log"
                  ? "https://raw.githubusercontent.com/navarasu/opencv-log/master/docs/assets/opencv-log-bl.png"
                  : r.name === "serverless-ruby-layer"
                  ? "https://raw.githubusercontent.com/navarasu/serverless-ruby-layer/master/docs/assets/serverless-ruby-layer.png"
                  : "https://user-images.githubusercontent.com/20145075/119054213-e1635e80-b9e4-11eb-8a8a-b228c185121a.png",
              badgeSrc:
                r.name === "opencv-log"
                  ? "https://img.shields.io/pypi/v/opencv-log.svg"
                  : r.name === "serverless-ruby-layer"
                  ? "https://img.shields.io/npm/v/serverless-ruby-layer.svg"
                  : "https://img.shields.io/badge/vimplug-latest-blue",
              badgeAlt: "Version Badge",
              desc: r.description || "No description available",
              langColor:
                r.language === "Python"
                  ? "#3572A5"
                  : r.language === "JavaScript"
                  ? "#f1e05a"
                  : "#000080",
              lang: r.language || "Unknown",
              shortLang:
                r.language === "Python"
                  ? "Py"
                  : r.language === "JavaScript"
                  ? "JS"
                  : "Lu",
              forks: r.forks_count || 0,
              stars: r.stargazers_count || 0,
            };
          });
        setRepos(formatted);
      } catch (error) {
        console.error("Error fetching repos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const memoizedRepos = useMemo(() => repos, [repos]);

  // Loading state skeleton
  if (loading) {
    return (
      <div className="w-full bg-[#fbfbfb] text-[#1e4356] border-b border-b-[#e5e5e5]">
        <div className="pt-6 pb-4 max-w-[1140px] mx-auto">
          <div className="px-4 sm:px-6 md:px-8">
            <h3 className="text-[30px] leading-[46px] text-[#233142] mb-8 capitalize font-bold font-[Spartan,sans-serif]">
              Open Sources<span className="text-[#FE4066]">.</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border border-gray-200 p-5 rounded-[10px] bg-white shadow-sm h-40 animate-pulse"
                >
                  <div className="h-8 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="opensource" className="w-full bg-[#fbfbfb] text-[#1e4356] border-b border-b-[#e5e5e5]">
      <div className="pt-6 pb-4 max-w-[1140px] mx-auto">
        <div className="px-4 sm:px-6 md:px-8">
          <h3 className="text-[30px] leading-[46px] text-[#233142] mb-8 capitalize font-bold font-[Spartan,sans-serif]">
            Open Sources<span className="text-[#FE4066]">.</span>
          </h3>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {memoizedRepos.map((item) => (
              <div
                key={item.title}
                className={`border border-gray-200 p-5 rounded-[10px] bg-white shadow-sm min-h-[160px] flex flex-col relative`}
              >
                <div className="flex justify-between items-start mb-4">
                  <a href={item.href} target="_blank" rel="noreferrer">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      width={50}
                      height={50}
                      className="object-contain h-[35px] sm:h-[40px] lg:h-[50px] w-auto"
                    />
                  </a>
                  <a href={item.badgeSrc} target="_blank" rel="noreferrer">
                    <Image
                      src={item.badgeSrc}
                      alt={item.badgeAlt}
                      width={60}
                      height={15}
                      unoptimized
                      className="h-[12px] sm:h-[13px] lg:h-[15px] w-auto"
                    />
                  </a>
                </div>

                <div className="h-[1px] bg-gray-200 mb-3"></div>

                <p className="text-[14px] sm:text-[15px] mb-4 text-[#586069] leading-[20px]">
                  {item.desc}
                </p>

                <div className="flex justify-end space-x-3 text-[12px] sm:text-[13px] text-gray-600 mt-auto">
                  <span className="flex items-center gap-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.langColor }}
                    ></div>
                    <span className="hidden sm:inline">{item.lang}</span>
                    <span className="sm:hidden">{item.shortLang}</span>
                  </span>

                  <span className="flex items-center gap-1 text-gray-500">
                    <svg
                      aria-hidden="true"
                      height="14"
                      width="10"
                      fill="currentColor"
                      viewBox="0 0 10 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1z"
                      />
                    </svg>
                    <span>{item.forks}</span>
                  </span>

                  <span className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 14 14"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"
                      />
                    </svg>
                    <span>{item.stars}</span>
                  </span>
                </div>
              </div>
            ))}

            {/* View More Link - Outside the Cards */}
            <div className="w-full flex justify-end mt-8">
              <a
                href="https://github.com/navarasu"
                target="_blank"
                rel="noopener noreferrer"
                className="uppercase font-bold text-[#777777] text-[14px] font-[Raleway,sans-serif] hover:text-[#FE4066] transition-colors duration-200"
              >
                View More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
