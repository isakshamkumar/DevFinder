import { projects } from "@/app/constant";
import { HoverEffect } from "./card-hover-grid";

export function CardHoverEffectStack() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <h3 className="text-2xl sm:text-left text-center -mb-8 ml-3">Features</h3>
      <HoverEffect items={projects} />
    </div>
  );
}

  