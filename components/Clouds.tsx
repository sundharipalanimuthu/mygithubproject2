'use client';
import Image from 'next/image';

export default function Clouds() {
  return (
    <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden z-20 pointer-events-none">
      {/* Cloud 1 */}
      <div className="absolute bottom-0 animate-[cloudMove_20s_linear_infinite_-4s] opacity-70">
        <Image
          src="/navarasu/img/cloud1.webp"
          alt="Cloud 1"
          width={1920}
          height={583}
          quality={70}
          priority
          className="block border-none w-full h-auto"
          sizes="100vw"
        />
      </div>

      {/* Cloud 2 */}
      <div className="absolute bottom-0 animate-[cloudMove_30s_linear_infinite_-6s] opacity-60">
        <Image
          src="/navarasu/img/cloud2.webp"
          alt="Cloud 2"
          width={1920}
          height={1152}
          loading="lazy"
          quality={70}
          sizes="100vw"
          className="block border-none w-full h-auto"
        />
      </div>

      {/* Cloud 3 */}
      <div className="absolute bottom-0 animate-[cloudMove_40s_linear_infinite_-8s] opacity-50">
        <Image
          src="/navarasu/img/cloud3.webp"
          alt="Cloud 3"
          width={1920}
          height={701}
          loading="lazy"
          quality={70}
          sizes="100vw"
          className="block border-none w-full h-auto"
        />
      </div>

      {/* Cloud 4 */}
      <div className="absolute bottom-0 animate-[cloudMove_50s_linear_infinite_-10s] opacity-40">
        <Image
          src="/navarasu/img/cloud4.webp"
          alt="Cloud 4"
          width={1920}
          height={815}
          loading="lazy"
          quality={70}
          sizes="100vw"
          className="block border-none w-full h-auto"
        />
      </div>
    </div>
  );
}