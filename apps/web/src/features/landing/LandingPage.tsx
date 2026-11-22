import { StickyNavbar } from "./StickyNavbar.js";
import { HeroPhotographic } from "./HeroPhotographic.js";
import { AppWindowSpotlight } from "./AppWindowSpotlight.js";
import { EmotionalAvatarCloud } from "./EmotionalAvatarCloud.js";
import { AlternatingBenefits } from "./AlternatingBenefits.js";
import { NightBandReveal } from "./NightBandReveal.js";
import { MintClosingRail } from "./MintClosingRail.js";
import { DarkFooter } from "./DarkFooter.js";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fcf5eb] text-[#1c1e21] font-sans antialiased selection:bg-[#25d366] selection:text-[#111b21]">
      {/* 1. Sticky 80px Navigation on #fcf5eb */}
      <StickyNavbar />

      <main>
        {/* 2. Opening Scene: 1376×720px Inset Environmental Photography Hero */}
        <HeroPhotographic />

        {/* 3. Section 2: Overlapping App Window Spotlight */}
        <AppWindowSpotlight />

        {/* 4. Section 3: Centered Emotional Statement + Floating Avatar Cloud */}
        <EmotionalAvatarCloud />

        {/* 5. Alternating Benefit Pairs: Section 4 (Voice) & Section 6 (Spaces) */}
        <AlternatingBenefits />

        {/* 6. Section 5: Night Band Technical Reveal with Continuous Luminous Cipher Loop */}
        <NightBandReveal />

        {/* 7. Section 9: Mint Closing Lip (#e6ffda) & Editorial Horizontal Rail */}
        <MintClosingRail />
      </main>

      {/* 8. Section 10: Deep Blue-Black (#111b21) Directory & Utility Footer */}
      <DarkFooter />
    </div>
  );
}
