import { apiClient } from "@core/api/api-client";
import type { LandingHeroDTO } from "./landing.dto";
import { landingAdapter } from "./landing.adapter";

export const landingService = {
  async getHeroData() {
    const data = await apiClient.get<LandingHeroDTO>('/landing/hero');
    return landingAdapter.toLandingHero(data);
  },
};
