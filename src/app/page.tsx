"use client";
import { Spotlight } from "@/components/SpotLight";
import { buttonVariants } from "@/components/ui/button";
import { CardHoverEffectStack } from "@/components/ui/card-hover-effect";
import { Github, StarIcon, StarOff } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { globeConfig, REPO_GITHUB_URL, sampleArcs } from "./constant";
const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
  }
);

export default function Hero() {
  return (
    <section>
      <div className="container  flex w-full flex-col items-center justify-center space-y-20 py-8 md:py-12 lg:py-16 xl:py-20">
        <Spotlight className="top-[-1rem] left-[-5rem]" fill="white" />
        <div className="mx-auto  w-full max-w-[80rem] ">
          <h1 className="  text-balance bg-gradient-to-br w-full  from-gray-900 via-gray-800 to-gray-400 bg-clip-text text-center font-heading text-[40px] font-bold leading-tight tracking-[-0.02em] text-transparent  drop-shadow-sm duration-300 ease-linear [word-spacing:theme(spacing.1)] dark:bg-gradient-to-br dark:from-gray-100 dark:to-gray-900 md:text-7xl md:leading-[5rem]">
            A unified platform for developers worldwide to collaborate, support,
            and network.
          </h1>

          <div className="mx-auto mt-16 flex items-center justify-center space-x-5">
            <Link
              className={buttonVariants() + " gap-x-2"}
              href="/browse-rooms"
            >
              Explore Rooms
              <StarOff width={16} />
            </Link>
            <Link
              className={buttonVariants({ variant: "outline" }) + " gap-x-2"}
              href={REPO_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <StarIcon width={16} />
              <span>on</span>
              <Github width={16} />
            </Link>
          </div>
        </div>
        <div className="w-[20rem] h-[20rem] md:w-[35rem] md:h-[35rem] z-10">
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
        <div>
          <CardHoverEffectStack />
        </div>
      </div>
    </section>
  );
}
