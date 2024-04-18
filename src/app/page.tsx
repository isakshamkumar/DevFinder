import { buttonVariants } from "@/components/ui/button";
import { CardHoverEffectDemo } from "@/components/ui/card-hover-effect";
import { Globe } from "@/components/ui/globe";
import { useClientSession } from "@/hooks/use-ClientSession";
import { Github, StarIcon, StarOff } from "lucide-react";
import Link from "next/link";

export default async function Hero() {
  const { stargazers_count: stars } = await fetch(
    "https://api.github.com/repos/isakshamkumar/DevFinder",
    {
      cache: "no-store",
    }
  )
    .then((res) => res.json())
    .catch((e) => console.error(e));
    
  return (
    <section>
      <div className="container  flex w-full flex-col items-center justify-center space-y-20 py-8 md:py-12 lg:py-16 xl:py-20">
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
              href="https://github.com/moinulmoin/chadnext"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="font-medium">{stars}</span>
              <StarIcon width={16} />
              <span>on</span>
              <Github width={16} />
              {/* <Icons.gitHub width={16} /> */}
            </Link>
          </div>
        </div>
        <div>
          <CardHoverEffectDemo />
        </div>
      </div>
    </section>
  );
}

// const tools = [
//   {
//     link: "https://www.typescriptlang.org/",
//     icon: BrandIcons.ts,
//   },
//   {
//     link: "https://nextjs.org/",
//     icon: BrandIcons.nextjs,
//   },
//   {
//     link: "https://tailwindcss.com/",
//     icon: BrandIcons.tailwind,
//   },
//   {
//     link: "https://www.prisma.io/",
//     icon: BrandIcons.prisma,
//   },
//   {
//     link: "https://vercel.com/",
//     icon: BrandIcons.vercel,
//   },
// ];
