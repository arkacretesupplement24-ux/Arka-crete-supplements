import { db } from "./client";
import { roles, users, permissions, rolePermissions, categories, products } from "./schema";
import bcryptjs from "bcryptjs";

async function main() {
  console.log("Seeding database...");

  // 1. Roles
  const rolesData = [
    { id: "role-admin", name: "Admin", description: "Full system administration access" },
    { id: "role-super", name: "Super Admin", description: "Complete system control" },
    { id: "role-sales", name: "Sales Manager", description: "Inquiry and lead management" },
  ];

  for (const r of rolesData) {
    await db.insert(roles).values(r).onConflictDoNothing();
  }
  console.log("Seeded roles.");

  // 2. Users (Admin user)
  const passwordHash = bcryptjs.hashSync("adminpassword123", 10);
  const adminUser = {
    id: "user-admin",
    name: "Arka Admin",
    email: "admin@arkacrete.com",
    passwordHash: passwordHash,
    roleId: "role-admin",
    isActive: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await db.insert(users).values(adminUser).onConflictDoNothing();
  console.log("Seeded admin user.");

  // 3. Permissions
  const permissionsData = [
    { id: "perm-prod-read", key: "products:read", description: "View products list" },
    { id: "perm-prod-write", key: "products:write", description: "Create/Edit products" },
    { id: "perm-inq-read", key: "inquiries:read", description: "View customer inquiries" },
    { id: "perm-inq-write", key: "inquiries:write", description: "Manage inquiry state" },
  ];

  for (const p of permissionsData) {
    await db.insert(permissions).values(p).onConflictDoNothing();
  }
  console.log("Seeded permissions.");

  // 4. Role Permissions
  for (const p of permissionsData) {
    await db.insert(rolePermissions).values({
      roleId: "role-admin",
      permissionId: p.id
    }).onConflictDoNothing();
  }
  console.log("Seeded role permissions.");

  // 5. Categories
  const categoriesData = [
    { id: "cat-tile", name: "Tile Adhesives", slug: "tile-adhesives", description: "High performance polymer modified tile adhesives for all surface classes.", sortOrder: 1, isActive: 1 },
    { id: "cat-block", name: "Block Joining", slug: "block-joining", description: "AAC Block adhesives and light thin-bed joining mortars.", sortOrder: 2, isActive: 1 },
    { id: "cat-grout", name: "Grouts & Anchoring", slug: "grouts-anchoring", description: "Epoxy and cementitious joint fillers, structural grouting, and bolt anchoring.", sortOrder: 3, isActive: 1 },
    { id: "cat-repair", name: "Repair Products", slug: "repair-products", description: "Structural concrete repair systems, micro-concretes, and polymer mortars.", sortOrder: 4, isActive: 1 },
    { id: "cat-waterproof", name: "Waterproofing", slug: "waterproofing", description: "Flexible coatings, integral sealants, and acrylic bonding modifiers.", sortOrder: 5, isActive: 1 },
  ];

  for (const c of categoriesData) {
    await db.insert(categories).values(c).onConflictDoNothing();
  }
  console.log("Seeded categories.");

  // 6. Products
  const productsData = [
    // Tile Adhesives
    {
      id: "prod-tg-classic",
      categoryId: "cat-tile",
      name: "Tile Grip Classic",
      slug: "tile-grip-classic",
      shortDescription: "Standard cementitious tile adhesive for ceramic tiles on floor and wall.",
      longDescription: "Tile Grip Classic is a polymer-modified, cement-based powder adhesive designed for fixing high-porosity tiles such as ceramic tiles, terra cotta, and clay tiles on internal walls and floor surfaces.",
      packaging: "20 Kg bag",
      coverage: "Approx. 50-60 sq. ft. per 20 kg bag at 3mm bed thickness.",
      applicationType: "Tile Fixing (Internal floors & walls)",
      productType: "Cementitious polymer-modified powder",
      featuresJson: JSON.stringify([
        "Excellent bond strength",
        "Easy to mix and apply",
        "Saves time and labor costs",
        "Self-curing properties"
      ]),
      benefitsJson: JSON.stringify([
        "Prevents hollow sounding tiles",
        "Zero shrinkage cracking",
        "Provides long lasting durable joints"
      ]),
      specsJson: JSON.stringify({
        "Appearance": "Grey Powder",
        "Pot Life": "Approx. 2 hours",
        "Open Time": "Approx. 20 minutes",
        "Traffic Time": "24 hours"
      }),
      isFeatured: 1,
      isActive: 1,
      seoTitle: "Tile Grip Classic - Standard Tile Adhesive | ARKA CRETE",
      seoDescription: "Buy Tile Grip Classic polymer-modified tile adhesive for fixing ceramic tiles on walls and floors. Excellent bond and slip resistance."
    },
    {
      id: "prod-tg-premium",
      categoryId: "cat-tile",
      name: "Tile Grip Premium",
      slug: "tile-grip-premium",
      shortDescription: "High performance polymer modified tile adhesive for large vitrified tiles.",
      longDescription: "Tile Grip Premium is a premium grade, polymer-fortified tile adhesive designed for vitrified tiles, granite, and marble on internal and external floor and wall applications. Offers high flexibility and bonding performance.",
      packaging: "20 Kg bag",
      coverage: "Approx. 45-55 sq. ft. per 20 kg bag at 3-4mm thickness.",
      applicationType: "Vitrified & Natural Stone Fixing (Internal & External)",
      productType: "High-grade polymer-modified cementitious powder",
      featuresJson: JSON.stringify([
        "Exceptional adhesion for vitrified tiles",
        "Highly water resistant",
        "Suitable for high-traffic environments",
        "Flexible matrix absorbs structural movements"
      ]),
      benefitsJson: JSON.stringify([
        "Supports heavy natural stone weights",
        "Resists thermal expansions and contractions",
        "Ideal for damp and wet utility zones"
      ]),
      specsJson: JSON.stringify({
        "Appearance": "Grey or White Powder",
        "Tensile Adhesion": "> 1.5 N/mm²",
        "Adjustability Time": "25 minutes",
        "Full Cure Time": "14 days"
      }),
      isFeatured: 1,
      isActive: 1,
      seoTitle: "Tile Grip Premium - Heavy Duty Vitrified Tile Adhesive",
      seoDescription: "Get Tile Grip Premium high-polymer adhesive for granite, marble, and large vitrified tiles. Perfect for interior and exterior installations."
    },
    {
      id: "prod-tf-720",
      categoryId: "cat-tile",
      name: "Tile Fix 720",
      slug: "tile-fix-720",
      shortDescription: "High strength flexible adhesive for natural stone, glass mosaic, and large format tiles.",
      longDescription: "Tile Fix 720 is an ultra-premium, white-cement-based highly flexible tile adhesive ideal for fixing glass mosaics, translucent marble, heavy natural stones, and large-format tiles on demanding wall and floor substrates.",
      packaging: "20 Kg bag",
      coverage: "Approx. 40-50 sq. ft. per 20 kg bag at 4mm thickness.",
      applicationType: "Glass Mosaic, Large Formats & Translucent Marble",
      productType: "White cement based high polymer elastic adhesive",
      featuresJson: JSON.stringify([
        "White color prevents staining of translucent tiles",
        "Superb elasticity to resist structural shifts",
        "Premium sag resistance on vertical walls",
        "High mechanical shock absorbance"
      ]),
      benefitsJson: JSON.stringify([
        "Perfect for swimming pools and glass mosaics",
        "Stain-free bonding for light marbles",
        "Outstanding durability on vertical facades"
      ]),
      specsJson: JSON.stringify({
        "Appearance": "White Powder",
        "Flexural Strength": "Class S1 (Flexible)",
        "Open Time": "30 minutes",
        "Cure Time": "24 hours"
      }),
      isFeatured: 0,
      isActive: 1,
      seoTitle: "Tile Fix 720 - White Flexible Adhesive for Glass Mosaics",
      seoDescription: "Learn more about Tile Fix 720 white cement based elastic tile adhesive. Ideal for swimming pools, glass mosaics, and large format stones."
    },
    // Block Joining
    {
      id: "prod-block-fix",
      categoryId: "cat-block",
      name: "Block Fix",
      slug: "block-fix",
      shortDescription: "High strength polymer modified thin-bed mortar for AAC/CLC blocks.",
      longDescription: "Block Fix is a factory-mixed self-curing block joining mortar designed for structural masonry of lightweight Autoclaved Aerated Concrete (AAC) blocks, concrete blocks, and fly ash bricks. Replaces conventional site-mixed sand-cement mortar.",
      packaging: "40 Kg bag",
      coverage: "Approx. 120-140 sq. ft. per 40 kg bag with a 3mm bed thickness.",
      applicationType: "Masonry Jointing of AAC, CLC & Concrete Blocks",
      productType: "Self-curing thin-bed dry mortar",
      featuresJson: JSON.stringify([
        "Only 3mm joint thickness compared to 12mm mortar",
        "No water curing required (Self-curing technology)",
        "Negligible rebound wastage",
        "High thermal insulation compliance"
      ]),
      benefitsJson: JSON.stringify([
        "Saves cost of structural sand and site curing water",
        "Speeds up masonry construction by 3x",
        "Reduces dead load on columns and slabs"
      ]),
      specsJson: JSON.stringify({
        "Appearance": "Grey Powder",
        "Compressive Strength": "> 7.5 N/mm² at 28 days",
        "Joint Thickness": "2 - 4 mm",
        "Water Demand": "Approx. 25%"
      }),
      isFeatured: 1,
      isActive: 1,
      seoTitle: "Block Fix AAC Block Joining Mortar | ARKA CRETE",
      seoDescription: "Upgrade to Block Fix premium AAC block adhesive. Thin-bed self-curing mortar for fast, clean, and strong block masonry."
    },
    // Grouts & Anchoring
    {
      id: "prod-tg-721",
      categoryId: "cat-grout",
      name: "Tile Grout 721",
      slug: "tile-grout-721",
      shortDescription: "Fine, polymer modified cementitious tile joint filler.",
      longDescription: "Tile Grout 721 is a high-grade, polymer-modified cementitious tile grout designed for filling tile joints from 1mm to 6mm wide. Specially formulated with color-fast pigments and anti-shrink additives for non-cracking tile joints.",
      packaging: "1 Kg & 10 Kg packs",
      coverage: "Varies depending on tile dimensions and joint width.",
      applicationType: "Tile Joint Grouting (1mm - 6mm joints)",
      productType: "Pigmented polymer-modified cementitious powder",
      featuresJson: JSON.stringify([
        "Non-shrinking and crack-free formula",
        "UV resistant and color-fast",
        "Water-repellent finish",
        "Available in multiple aesthetic shades"
      ]),
      benefitsJson: JSON.stringify([
        "Easy cleanup with clean water",
        "Blocks ingress of dirt and bacteria",
        "Maintains vibrant tile aesthetics"
      ]),
      specsJson: JSON.stringify({
        "Joint Width": "1mm - 6mm",
        "Compressive Strength": "> 15 N/mm²",
        "Water Absorption": "< 2g after 240 min"
      }),
      isFeatured: 0,
      isActive: 1,
      seoTitle: "Tile Grout 721 - Cementitious Tile Joint Filler",
      seoDescription: "Choose Tile Grout 721 polymer modified cementitious joint grout for beautiful, non-crack, color-fast tile joints."
    },
    {
      id: "prod-ep-epoxy",
      categoryId: "cat-grout",
      name: "EP Epoxy Grout",
      slug: "ep-epoxy-grout",
      shortDescription: "Stain-free, water-resistant three-component epoxy grout for hygiene areas.",
      longDescription: "EP Epoxy Grout is a highly chemical-resistant, stain-free, and waterproof epoxy grout for filling tile and stone joints. Ideal for commercial kitchens, swimming pools, laboratories, and high hygiene requirements.",
      packaging: "5 Kg kit (Resin, Hardener, and Colored Filler)",
      coverage: "Depends on tile sizing and joint width.",
      applicationType: "Hygiene, Chemical-resistant Grouting",
      productType: "Three-component reaction resin epoxy",
      featuresJson: JSON.stringify([
        "100% stain-proof and acid-proof",
        "Zero water absorption",
        "Antibacterial and anti-fungal barrier",
        "Superior mechanical load limits"
      ]),
      benefitsJson: JSON.stringify([
        "Cleans easily with soapy water",
        "Prevents seepage behind tile linings",
        "Durable under heavy foot and vehicle traffic"
      ]),
      specsJson: JSON.stringify({
        "Full traffic readiness": "24 hours",
        "Compressive Strength": "> 55 N/mm²",
        "Water Absorption": "Nil"
      }),
      isFeatured: 1,
      isActive: 1,
      seoTitle: "EP Epoxy Grout - Stain-free Industrial Joint Grout",
      seoDescription: "Get EP Epoxy Grout three-component stain-free grout for commercial kitchens, hospitals, and pools. Maximum hygiene and stain protection."
    },
    {
      id: "prod-fg-50",
      categoryId: "cat-grout",
      name: "Free Grout 50",
      slug: "free-grout-50",
      shortDescription: "Non-shrink, high strength cementitious grout for machine foundations.",
      longDescription: "Free Grout 50 is a general-purpose, non-shrink cementitious grout that flows easily into gaps to anchor bolts, pillars, and machine foundations. Dual expansion properties compensate for plastic and drying shrinkage.",
      packaging: "25 Kg bag",
      coverage: "Yields approx 12-13 liters of wet grout slurry per 25 kg bag.",
      applicationType: "Foundation Grouting & Bolt Anchoring",
      productType: "Flowable non-shrink cementitious powder",
      featuresJson: JSON.stringify([
        "Self-leveling and highly flowable",
        "Controlled positive expansion",
        "High early strength development",
        "Chlorides and iron-free formula"
      ]),
      benefitsJson: JSON.stringify([
        "Ensures total load transfer under machines",
        "Resists vibrating shock loads",
        "No segregation or bleeding"
      ]),
      specsJson: JSON.stringify({
        "Compressive Strength (1 Day)": "> 20 N/mm²",
        "Compressive Strength (28 Days)": "> 50 N/mm²",
        "Flowability": "Excellent"
      }),
      isFeatured: 0,
      isActive: 1,
      seoTitle: "Free Grout 50 - Non-Shrink Foundation Grout | ARKA CRETE",
      seoDescription: "Configure Free Grout 50 high-early-strength flowable non-shrink cementitious grout for machinery baseplates and anchoring."
    },
    {
      id: "prod-fg-70",
      categoryId: "cat-grout",
      name: "Free Grout 70",
      slug: "free-grout-70",
      shortDescription: "High performance, dual expansion non-shrink cementitious grout.",
      longDescription: "Free Grout 70 is a high-performance, extra-strength cementitious grout specifically formulated for heavy industrial structures, turbine foundation anchoring, and pre-cast concrete block jointing.",
      packaging: "25 Kg bag",
      coverage: "Yields approx 12-13 liters per 25 kg bag.",
      applicationType: "Turbines, Bridge Bearings & Heavy Foundation Grouting",
      productType: "High performance non-shrink cementitious powder",
      featuresJson: JSON.stringify([
        "Sustained 70+ N/mm² compressive strength",
        "Excellent dynamic and static load support",
        "Low water permeability",
        "Extended pot life for large pours"
      ]),
      benefitsJson: JSON.stringify([
        "Supports bridge bearings and rail tracks safely",
        "Endures high dynamic vibrations",
        "Guarantees structural solidity"
      ]),
      specsJson: JSON.stringify({
        "Compressive Strength (28 Days)": "> 70 N/mm²",
        "Initial Setting": "Approx. 4 hours",
        "Expansion": "0.1% to 0.4%"
      }),
      isFeatured: 0,
      isActive: 1,
      seoTitle: "Free Grout 70 - Ultra-High Strength Industrial Grout",
      seoDescription: "Read about Free Grout 70 dual expansion grout for turbines, bridge bearings, and dynamic heavy loads. 70 N/mm² strength."
    },
    {
      id: "prod-polygrout",
      categoryId: "cat-grout",
      name: "Polygrout",
      slug: "polygrout",
      shortDescription: "General purpose polymer-modified structural grout.",
      longDescription: "Polygrout is a polymer-modified structural grout engineered for repairing columns, patching deep concrete voids, and jointing industrial floor panels where high bond strength and structural integrity are crucial.",
      packaging: "25 Kg bag",
      coverage: "Approx 13.5 liters per 25 kg bag.",
      applicationType: "Structural patching and Void Grouting",
      productType: "Polymer modified structural mortar",
      featuresJson: JSON.stringify([
        "High polymer bond matrix",
        "Low shrinkage performance",
        "Thixotropic flow control",
        "Waterproof barrier properties"
      ]),
      benefitsJson: JSON.stringify([
        "Adheres strongly to old concrete",
        "Provides dynamic load transfers",
        "Protects reinforcement steel from corrosion"
      ]),
      specsJson: JSON.stringify({
        "Bond Strength": "> 2.0 N/mm²",
        "Compressive Strength": "> 40 N/mm²"
      }),
      isFeatured: 0,
      isActive: 1,
      seoTitle: "Polygrout - Polymer-Modified Structural Repair Grout",
      seoDescription: "Choose Polygrout for concrete patching and jointing. Outstanding bond strength and durable polymer matrix."
    },
    {
      id: "prod-expacem-225",
      categoryId: "cat-grout",
      name: "Expacem 225",
      slug: "expacem-225",
      shortDescription: "Expansive cementitious grout for anchoring bolts and starter bars.",
      longDescription: "Expacem 225 is an expansive, high-early-strength anchoring grout designed for fixing starter bars, rock bolts, structural anchors, and tie-rods into concrete and rock structures.",
      packaging: "25 Kg bag",
      coverage: "Approx 12.5 liters of wet slurry per 25 kg bag.",
      applicationType: "Anchoring starter bars, bolts & rock anchoring",
      productType: "Expansive cementitious chemical powder",
      featuresJson: JSON.stringify([
        "Rapid expansion forces to lock bars",
        "Extremely high pull-out load resistance",
        "Flowable or plastic consistencies possible",
        "High early strength (Traffic ready in hours)"
      ]),
      benefitsJson: JSON.stringify([
        "Prevents anchor pullout under tension loads",
        "Speeds up structural extensions",
        "Excellent wet-dry stability"
      ]),
      specsJson: JSON.stringify({
        "Pull-out Force": "> 120 kN",
        "Compressive Strength (3 Days)": "> 35 N/mm²"
      }),
      isFeatured: 0,
      isActive: 1,
      seoTitle: "Expacem 225 - Starter Bar & Anchoring Grout",
      seoDescription: "Discover Expacem 225 expansive anchoring grout. Best for anchoring starter bars, tie-rods, and foundation bolts with high pullout loads."
    },
    // Repair Products
    {
      id: "prod-microcrete",
      categoryId: "cat-repair",
      name: "Microcrete",
      slug: "microcrete",
      shortDescription: "Ready-to-use non-shrink micro-concrete for structural repairs.",
      longDescription: "Microcrete is a dry powder mix concrete containing selected aggregates and flow modifiers, designed for jacketing columns, deep concrete repair sections, and structural member restorations where access is limited.",
      packaging: "25 Kg bag",
      coverage: "Approx. 13 liters per 25 kg bag.",
      applicationType: "Structural Member Jacketing & Deep Repair",
      productType: "Flowable non-shrink micro-concrete system",
      featuresJson: JSON.stringify([
        "Highly flowable - fills congested steel cages easily",
        "Zero shrinkage eliminates boundary cracking",
        "Excellent high ultimate compressive strength",
        "Saves cost of vibration and compaction"
      ]),
      benefitsJson: JSON.stringify([
        "Restores slab load capacity completely",
        "Eliminates micro cracks at repair joints",
        "Provides smooth structural finish"
      ]),
      specsJson: JSON.stringify({
        "Compressive Strength (28 Days)": "> 55 N/mm²",
        "Shrinkage": "Nil",
        "Aggregate Size": "0 - 4 mm"
      }),
      isFeatured: 1,
      isActive: 1,
      seoTitle: "Microcrete - Non-Shrink Column Jacketing Concrete | ARKA CRETE",
      seoDescription: "Order Microcrete for structural concrete repairs and column jacketing. Highly flowable, non-shrink, ready-to-use formulation."
    },
    {
      id: "prod-rep-111",
      categoryId: "cat-repair",
      name: "Rep 111",
      slug: "rep-111",
      shortDescription: "Single-component polymer modified concrete repair mortar.",
      longDescription: "Rep 111 is a polymer-modified, cementitious mortar designed for vertical and overhead concrete repairs, patching spalled columns, ceiling repairs, and aesthetic profiling of structural parts.",
      packaging: "25 Kg bag",
      coverage: "Approx 13.5 liters of mortar per 25 kg bag.",
      applicationType: "Overhead and Vertical Concrete Patching",
      productType: "Single component polymer modified structural mortar",
      featuresJson: JSON.stringify([
        "Premium overhead sag resistance (Thixotropic)",
        "Excellent bond strength to substrate concrete",
        "Low water permeability limits rust",
        "Fiber-reinforced for crack inhibition"
      ]),
      benefitsJson: JSON.stringify([
        "Minimizes material rebound waste on ceilings",
        "Prevents carbonation and corrosion cycles",
        "Saves time (no bonding agent required in most cases)"
      ]),
      specsJson: JSON.stringify({
        "Appearance": "Grey Powder",
        "Max thickness per layer": "20 mm",
        "Compressive Strength": "> 35 N/mm²"
      }),
      isFeatured: 0,
      isActive: 1,
      seoTitle: "Rep 111 - Overhead & Vertical Concrete Repair Mortar",
      seoDescription: "Apply Rep 111 polymer-modified mortar for vertical concrete repairs, ceilings, and column repairs. Superb thixotropic property prevents sag."
    },
    // Waterproofing
    {
      id: "prod-arkacoat-fx",
      categoryId: "cat-waterproof",
      name: "Arkacoat FX",
      slug: "arkacoat-fx",
      shortDescription: "Two-component flexible acrylic-polymer modified waterproofing slurry.",
      longDescription: "Arkacoat FX is a premium quality, two-component polymer-modified waterproofing slurry consisting of a liquid polymer and cement-based powder. It cures to form a highly flexible, water-impermeable membrane on structural concrete.",
      packaging: "20 Kg kit (15 Kg Powder + 5 Kg Liquid)",
      coverage: "Approx. 120-140 sq. ft. per 20 kg kit in 2 coats (1mm thickness).",
      applicationType: "Bathrooms, Balconies, Water Tanks & Basements",
      productType: "Two-component flexible polymer waterproofing slurry",
      featuresJson: JSON.stringify([
        "Highly elastomeric - bridges hairline cracks up to 1.5mm",
        "Resists high hydrostatic water pressure",
        "Nontoxic - certified safe for potable water tanks",
        "Breathable matrix allows vapor transmission"
      ]),
      benefitsJson: JSON.stringify([
        "Prevents ceiling dampness and wall efflorescence",
        "Maintains long term concrete reinforcement health",
        "Protects buildings from heavy monsoon seeps"
      ]),
      specsJson: JSON.stringify({
        "Mixing Ratio": "3:1 (Powder:Liquid by weight)",
        "Elongation": "> 100%",
        "Adhesion to Concrete": "> 1.2 N/mm²"
      }),
      isFeatured: 1,
      isActive: 1,
      seoTitle: "Arkacoat FX - Two-Component Waterproofing Membrane | ARKA CRETE",
      seoDescription: "Apply Arkacoat FX flexible polymer modified waterproofing coating for bathrooms, balconies, basements, and water tanks. Prevents leakage."
    },
    {
      id: "prod-arkaguard-iwpl",
      categoryId: "cat-waterproof",
      name: "Arkaguard IWPL",
      slug: "arkaguard-iwpl",
      shortDescription: "High-performance integral liquid waterproofing compound for concrete.",
      longDescription: "Arkaguard IWPL is a specially formulated liquid additive for concrete and cement plasters. It reduces water permeability, enhances workability, and protects structures against water penetration.",
      packaging: "1 Litre, 5 Litres, 20 Litres & 200 Litres drums",
      coverage: "Dosage: 200 ml per 50 kg bag of cement.",
      applicationType: "Integral waterproofing for foundation, slab & plastering",
      productType: "Active chemical liquid waterproofing additive",
      featuresJson: JSON.stringify([
        "Significantly decreases capillary water absorption",
        "Improves concrete workability without high water",
        "Reduces shrinkage crack risks",
        "Protects reinforcing bars from rust"
      ]),
      benefitsJson: JSON.stringify([
        "Ensures damp-proof foundations and slabs",
        "Increases the lifespan of exterior plasters",
        "Reduces honeycombing in structural concrete"
      ]),
      specsJson: JSON.stringify({
        "Appearance": "Light Amber Liquid",
        "Specific Gravity": "Approx 1.05",
        "pH Value": "7 - 9"
      }),
      isFeatured: 0,
      isActive: 1,
      seoTitle: "Arkaguard IWPL - Integral Liquid Waterproofing Additive",
      seoDescription: "Use Arkaguard IWPL integral liquid waterproofing compound for slab castings, brick masonry, and structural concrete. Only 200ml per bag."
    },
    {
      id: "prod-arkabond-sbr",
      categoryId: "cat-waterproof",
      name: "Arkabond SBR",
      slug: "arkabond-sbr",
      shortDescription: "SBR polymer bonding agent for concrete repair and waterproofing.",
      longDescription: "Arkabond SBR is a high-performance styrene-butadiene copolymer latex emulsion designed as a bonding agent for concrete repair, screeds, plastering, and waterproofing slurries. Enhances bond strength and flexibility.",
      packaging: "1 Litre, 5 Litres, 20 Litres & 200 Litres drums",
      coverage: "Varies depending on mix design (screeds, bonding slurry, or mortar).",
      applicationType: "Bonding slurry, concrete repair modifier, and screed additive",
      productType: "SBR polymer latex modifier bonding emulsion",
      featuresJson: JSON.stringify([
        "Exceptional bond to structural concrete",
        "Reduces water permeability of repair mortars",
        "Improves chemical and abrasion resistance",
        "Increases tensile and flexural strengths"
      ]),
      benefitsJson: JSON.stringify([
        "Prevents cold joints between old and new concrete",
        "Ensures durable, non-spalling patching repairs",
        "Ideal for industrial floor toppings and screeds"
      ]),
      specsJson: JSON.stringify({
        "Type": "SBR Copolymer Latex",
        "Solid Content": "35% - 37%",
        "Flexural Strength Improvement": "+20%"
      }),
      isFeatured: 0,
      isActive: 1,
      seoTitle: "Arkabond SBR - Concrete Bonding Agent & Polymer Latex",
      seoDescription: "Choose Arkabond SBR high-performance copolymer latex bonding agent for concrete repairs, waterproof screeds, and key coat plasters."
    }
  ];

  for (const p of productsData) {
    await db.insert(products).values(p).onConflictDoNothing();
  }
  console.log("Seeded products.");

  console.log("Database seeded successfully!");
}

main().catch((err) => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
