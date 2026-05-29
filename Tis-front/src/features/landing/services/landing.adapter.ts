import type { LandingHeroDTO } from "./landing.dto";
import type { LandingHero } from "../models/landing.model";

export const landingAdapter = {
  toLandingHero(dto: LandingHeroDTO): LandingHero {
    return {
      mainTitle: dto.title,
      description: dto.subtitle,
    };
  },
};
