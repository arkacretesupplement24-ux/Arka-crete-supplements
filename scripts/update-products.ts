import { db } from "../lib/db/client";
import { products } from "../lib/db/schema";
import { eq, notInArray } from "drizzle-orm";

const updates = [
  {
    id: "prod-tg-classic",
    name: "ARKA TILE GRIP CLASSIC",
    slug: "arka-tile-grip-classic",
    shortDescription: "Premium polymer-modified cementitious tile adhesive specially formulated for fixing ceramic and clay tiles on interior walls and floors.",
    longDescription: "ARKA TILE GRIP CLASSIC is a premium polymer-modified cementitious tile adhesive specially formulated for fixing ceramic and clay tiles on interior walls and floors. Engineered to deliver reliable bonding and excellent workability, it provides a durable and long-lasting solution for residential and commercial tiling projects. Its advanced formulation ensures smooth application, extended open time, and consistent adhesion on cement-based substrates while minimizing tile debonding.",
    features: [
      "Premium polymer-modified formulation",
      "Excellent bond strength",
      "Smooth consistency",
      "Extended open time"
    ],
    applicationType: "Ideal for fixing ceramic and clay tiles on interior walls and floors over cement plaster, concrete, masonry, and cement screeds."
  },
  {
    id: "prod-tg-premium",
    name: "ARKA TILE GRIP PREMIUM",
    slug: "arka-tile-grip-premium",
    shortDescription: "High-performance polymer-modified cementitious tile adhesive for ceramic, vitrified, porcelain and natural stone tiles.",
    longDescription: "High-performance polymer-modified cementitious tile adhesive for ceramic, vitrified, porcelain and natural stone tiles on interior and exterior surfaces with superior bond strength, excellent workability and enhanced slip resistance for reliable long-term performance.",
    features: [
      "High-performance polymer technology",
      "Superior adhesion",
      "Interior & exterior use",
      "Excellent workability",
      "Ideal for wet areas"
    ],
    applicationType: "Recommended for ceramic, vitrified, porcelain and natural stone tiles on walls and floors including bathrooms, balconies and terraces."
  },
  {
    id: "prod-tf-720",
    name: "ARKA FIX 720",
    slug: "arka-fix-720",
    shortDescription: "Premium heavy-duty polymer-modified cementitious tile adhesive engineered for large-format tiles, granite, and stones.",
    longDescription: "Premium heavy-duty polymer-modified cementitious tile adhesive engineered for largeformat vitrified tiles, porcelain, granite and natural stone. It provides exceptional bond strength, flexibility and slip resistance for demanding commercial, industrial and exterior façade applications.",
    features: [
      "Heavy-duty formulation",
      "Superior bond strength",
      "Excellent flexibility",
      "Façade applications",
      "High-traffic performance"
    ],
    applicationType: "Ideal for large-format tiles, granite and stone on interior and exterior walls, floors, terraces and façades."
  },
  {
    id: "prod-block-fix",
    name: "ARKA BLOCKFIX",
    slug: "arka-blockfix",
    shortDescription: "Premium polymer-modified cement-based block jointing mortar for AAC, CLC, fly ash and concrete blocks.",
    longDescription: "Premium polymer-modified cement-based block jointing mortar for AAC, CLC, fly ash and concrete blocks delivering thin-bed application, high bond strength and faster construction.",
    features: [
      "High-strength formulation",
      "Thin-bed application",
      "Excellent adhesion",
      "Crack-resistant",
      "Fast construction"
    ],
    applicationType: "Recommended for AAC, CLC, fly ash and concrete block masonry."
  },
  {
    id: "prod-tg-721",
    name: "ARKA 721 TILE JOINTING GROUT",
    slug: "arka-721-tile-jointing-grout",
    shortDescription: "Premium polymer-modified cementitious grout developed to create strong, durable and aesthetically pleasing tile joints.",
    longDescription: "ARKA 721 Tile Jointing Grout is a premium polymer-modified cementitious grout developed to create strong, durable and aesthetically pleasing tile joints. Its advanced formulation delivers excellent adhesion, reduced shrinkage and improved water resistance, producing smooth, uniform joints that enhance the appearance and longevity of tiled surfaces. Suitable for interior and exterior applications, it provides reliable performance in residential, commercial and institutional projects while helping protect tile edges from moisture and dirt penetration.",
    features: [
      "Polymer-modified formulation",
      "Smooth, dense finish",
      "Water-resistant performance",
      "Excellent colour consistency",
      "Suitable for walls and floors"
    ],
    applicationType: "Recommended for grouting ceramic, vitrified, porcelain, mosaic and natural stone tiles in kitchens, bathrooms, living spaces, commercial buildings and exterior tiled areas."
  },
  {
    id: "prod-ep-epoxy",
    name: "ARKA EP Epoxy Grout",
    slug: "arka-ep-epoxy-grout",
    shortDescription: "Premium, high-performance three-component epoxy-based tile joint filling system.",
    longDescription: "ARKA EP Epoxy Tile Grout is a premium, high-performance three-component epoxy-based tile joint filling system designed for areas that demand superior chemical resistance, stain protection, and long-lasting durability. It provides a dense, non-porous, waterproof finish that resists dirt, bacteria, mold, and harsh cleaning chemicals. Ideal for both residential and commercial installations, ARKA EP delivers excellent color consistency and a smooth, aesthetic finish while maintaining exceptional bond strength in demanding environments.",
    features: [
      "Superior Chemical & Stain Resistance",
      "100% Waterproof & Non-Porous",
      "High Strength & Abrasion Resistance",
      "Excellent Colour Stability & Aesthetic Finish",
      "Hygienic, Easy-to-Clean & Low Maintenance Surface"
    ],
    applicationType: "Ideal for grouting ceramic, vitrified, porcelain, marble, granite, glass mosaic, and natural stone tile joints in bathrooms, kitchens, toilets, shower areas, swimming pools, fountains, spas, commercial kitchens, food processing units, hospitals, laboratories, pharmaceutical facilities, hotels, shopping malls, airports, industrial floors, and other residential, commercial, and high-traffic environments requiring durable, waterproof, stain-resistant, and hygienic tile joints."
  },
  {
    id: "prod-polygrout",
    name: "ARKA POLYGROUT",
    slug: "arka-polygrout",
    shortDescription: "Rapid-curing two-component polyester resin anchor grout designed for heavy-duty anchoring.",
    longDescription: "ARKA POLYGROUT is a rapid-curing two-component polyester resin anchor grout designed for heavy-duty anchoring and structural fixing applications. It provides exceptional bond strength, high early strength development and excellent chemical resistance, making it ideal for demanding industrial and infrastructure projects. The fast-setting formulation minimizes downtime while ensuring secure anchoring in concrete, masonry and rock substrates.",
    features: [
      "Rapid-curing technology",
      "High early strength",
      "Excellent chemical resistance",
      "Superior anchoring performance",
      "Heavy-duty structural fixing"
    ],
    applicationType: "Ideal for anchoring threaded rods, reinforcement bars, machinery foundations, handrails, façade supports and structural retrofitting works."
  },
  {
    id: "prod-expacem-225",
    name: "ARKA EXPACEM 225",
    slug: "arka-expacem-225",
    shortDescription: "High-performance expansive grout additive formulated to compensate for shrinkage in cementitious grouts.",
    longDescription: "ARKA EXPACEM 225 is a high-performance expansive grout additive formulated to compensate for shrinkage in cementitious grouts and mortars. It improves dimensional stability, enhances compressive strength and minimizes cracking, ensuring dependable performance in precision grouting applications.",
    features: [
      "Controlled expansion",
      "Compensates shrinkage",
      "Improves grout strength",
      "Reduces cracking",
      "Easy to use"
    ],
    applicationType: "Recommended for machinery base plates, anchor bolts, precast elements, bridge bearings and structural grouting applications."
  },
  {
    id: "prod-arkacoat-fx",
    name: "ARKA COAT FX",
    slug: "arka-coat-fx",
    shortDescription: "Premium two-component flexible waterproofing system engineered to protect concrete and masonry structures.",
    longDescription: "ARKA COAT FX is a premium two-component flexible waterproofing system engineered to protect concrete and masonry structures from water ingress. The cementitious powder and polymer liquid combine to form a seamless, flexible membrane with excellent crack-bridging capability and long-term durability. Suitable for positive-side waterproofing, it delivers reliable protection in residential, commercial and infrastructure projects.",
    features: [
      "Flexible waterproof membrane",
      "Excellent crack-bridging",
      "Superior adhesion",
      "Weather-resistant protection",
      "Easy brush application"
    ],
    applicationType: "Ideal for waterproofing bathrooms, balconies, terraces, roof slabs, basements, retaining walls and water-retaining structures."
  },
  {
    id: "prod-rep-111",
    name: "ARKAREP 111",
    slug: "arkarep-111",
    shortDescription: "Rapid-setting cementitious plugging mortar specially formulated to stop active water leaks instantly.",
    longDescription: "ARKAREP 111 is a rapid-setting cementitious plugging mortar specially formulated to stop active water leaks instantly in concrete and masonry structures. Its fast-setting formulation develops high early strength, making it ideal for emergency repairs and waterproofing works. Easy to mix and apply, it creates a durable, non-shrink seal that withstands continuous water pressure and restores the integrity of damaged structures.",
    features: [
      "Ultra-fast setting",
      "Stops active water leaks",
      "High early strength",
      "Non-shrink formulation",
      "Easy hand application"
    ],
    applicationType: "Ideal for sealing active leaks, cracks, pipe penetrations, lift pits, basements, retaining walls, tunnels and emergency concrete repairs."
  },
  {
    id: "prod-fg-70",
    name: "ARKA FREE GROUT 70",
    slug: "arka-free-grout-70",
    shortDescription: "High-strength, non-shrink, free-flow cementitious grout designed for precision grouting.",
    longDescription: "ARKA FREE GROUT 70 is a high-strength, non-shrink, free-flow cementitious grout designed for precision grouting applications. It offers outstanding flowability, excellent load transfer and durable performance under dynamic and static loads, making it ideal for industrial and structural installations.",
    features: [
      "High early & ultimate strength",
      "Free-flowing consistency",
      "Non-shrink performance",
      "Excellent load transfer",
      "Easy placement"
    ],
    applicationType: "Recommended for machine foundations, anchor bolts, bridge bearings, precast elements and precision structural grouting."
  },
  {
    id: "prod-microcrete",
    name: "ARKA MICROCRETE",
    slug: "arka-microcrete",
    shortDescription: "Shrinkage-compensated, free-flow micro concrete developed for structural repairs.",
    longDescription: "ARKA MICROCRETE is a shrinkage-compensated, free-flow micro concrete developed for structural repairs and strengthening applications. Requiring only the addition of water, it provides excellent flowability, high compressive strength and reliable durability in heavily reinforced and confined sections.",
    features: [
      "Free-flowing formulation",
      "High structural strength",
      "Shrinkage compensated",
      "Excellent durability",
      "Easy placement"
    ],
    applicationType: "Suitable for RCC jacketing, beam and column repairs, pile caps, precast repairs and structural rehabilitation projects."
  },
  {
    id: "prod-arkaguard-iwpl",
    name: "ARKA GUARD IWPL",
    slug: "arka-guard-iwpl",
    shortDescription: "Premium liquid integral waterproofing compound that improves concrete impermeability and durability.",
    longDescription: "ARKA GUARD IWPL is a premium liquid integral waterproofing compound that improves the impermeability, durability and workability of concrete, mortar and plaster. It reduces water absorption and enhances long-term performance without affecting the strength of cement-based mixes.",
    features: [
      "Reduces water permeability",
      "Improves workability",
      "Enhances durability",
      "Chloride-free",
      "Compatible with cement-based mixes"
    ],
    applicationType: "Ideal for roof slabs, water tanks, basements, foundations, plastering, bathrooms and general concrete works."
  },
  {
    id: "prod-arkabond-sbr",
    name: "ARKABOND SBR",
    slug: "arkabond-sbr",
    shortDescription: "High-performance styrene-butadiene rubber bonding agent for concrete repair and waterproofing.",
    longDescription: "ARKABOND SBR is a high-performance styrene-butadiene rubber bonding agent that improves the adhesion, flexibility and waterproofing performance of cementitious mortars and concrete. It enhances bonding between old and new concrete while increasing resistance to cracking and water penetration.",
    features: [
      "Excellent bonding agent",
      "Improves flexibility",
      "Enhances waterproofing",
      "Increases durability",
      "Multi-purpose application"
    ],
    applicationType: "Recommended for concrete repairs, bonding coats, waterproofing systems, polymer-modified mortars, floor screeds and patch repair works."
  }
];

async function main() {
  console.log("Updating database products...");
  
  const updatedIds: string[] = [];

  for (const item of updates) {
    console.log(`Updating product: ${item.name} (${item.id})`);
    
    await db.update(products).set({
      name: item.name,
      slug: item.slug,
      shortDescription: item.shortDescription,
      longDescription: item.longDescription,
      featuresJson: JSON.stringify(item.features),
      applicationType: item.applicationType,
      isActive: 1
    }).where(eq(products.id, item.id));

    updatedIds.push(item.id);
  }

  // Deactivate products not in the updates list
  console.log("Deactivating products not present in the client document...");
  await db.update(products)
    .set({ isActive: 0 })
    .where(notInArray(products.id, updatedIds));

  console.log("Database products updated successfully!");
}

main().catch((err) => {
  console.error("Error updating database products:", err);
  process.exit(1);
});
