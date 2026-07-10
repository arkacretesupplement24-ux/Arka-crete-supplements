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
      name: "ARKA TILE GRIP CLASSIC",
      slug: "arka-tile-grip-classic",
      shortDescription: "Premium polymer-modified cementitious tile adhesive specially formulated for fixing ceramic and clay tiles on interior walls and floors.",
      longDescription: "ARKA TILE GRIP CLASSIC is a premium polymer-modified cementitious tile adhesive specially formulated for fixing ceramic and clay tiles on interior walls and floors. Engineered to deliver reliable bonding and excellent workability, it provides a durable and long-lasting solution for residential and commercial tiling projects. Its advanced formulation ensures smooth application, extended open time, and consistent adhesion on cement-based substrates while minimizing tile debonding.",
      packaging: "20 Kg bag",
      coverage: "Approx. 50-60 sq. ft. per 20 kg bag at 3mm bed thickness.",
      applicationType: "Ideal for fixing ceramic and clay tiles on interior walls and floors over cement plaster, concrete, masonry, and cement screeds.",
      productType: "Cementitious polymer-modified powder",
      featuresJson: JSON.stringify([
        "Premium polymer-modified formulation",
        "Excellent bond strength",
        "Smooth consistency",
        "Extended open time"
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
      seoDescription: "Buy Tile Grip Classic polymer-modified tile adhesive for fixing ceramic tiles on walls and floors. Excellent bond and slip resistance.",
      imageUrl: "https://res.cloudinary.com/dmohmgbut/image/upload/v1782198120/1._Tile_Grip_Classic_ltlxcf.png",
      galleryImagesJson: "[]",
      price: "Contact for Quote",
      sortOrder: 1
    },
    {
      id: "prod-tg-premium",
      categoryId: "cat-tile",
      name: "ARKA TILE GRIP PREMIUM",
      slug: "arka-tile-grip-premium",
      shortDescription: "High-performance polymer-modified cementitious tile adhesive for ceramic, vitrified, porcelain and natural stone tiles.",
      longDescription: "High-performance polymer-modified cementitious tile adhesive for ceramic, vitrified, porcelain and natural stone tiles on interior and exterior surfaces with superior bond strength, excellent workability and enhanced slip resistance for reliable long-term performance.",
      packaging: "20 Kg bag",
      coverage: "Approx. 45-55 sq. ft. per 20 kg bag at 3-4mm thickness.",
      applicationType: "Recommended for ceramic, vitrified, porcelain and natural stone tiles on walls and floors including bathrooms, balconies and terraces.",
      productType: "High-grade polymer-modified cementitious powder",
      featuresJson: JSON.stringify([
        "High-performance polymer technology",
        "Superior adhesion",
        "Interior & exterior use",
        "Excellent workability",
        "Ideal for wet areas"
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
      seoDescription: "Get Tile Grip Premium high-polymer adhesive for granite, marble, and large vitrified tiles. Perfect for interior and exterior installations.",
      imageUrl: "https://res.cloudinary.com/dmohmgbut/image/upload/v1782198109/2._Tile_Grip_Premium_xetb2j.png",
      galleryImagesJson: "[]",
      price: "Contact for Quote",
      sortOrder: 2
    },
    {
      id: "prod-tg-premium-plus",
      categoryId: "cat-tile",
      name: "Tile Grip Premium Plus",
      slug: "tile-grip-premium-plus",
      shortDescription: "Premium flexible polymer modified tile adhesive for heavy tiles and large stones.",
      longDescription: "Tile Grip Premium Plus is an ultra-premium, high-strength, flexible polymer-modified tile adhesive designed for large format vitrified tiles, marble, granite, and natural stones on both interior and exterior wall and floor installations.",
      packaging: "20 Kg bag",
      coverage: "Approx. 40-50 sq. ft. per 20 kg bag at 3-4mm thickness.",
      applicationType: "Vitrified & Natural Stone Fixing (Interior & Exterior Walls & Floors)",
      productType: "Extra-performance polymer-modified cementitious powder",
      featuresJson: JSON.stringify([
        "High flexibility and shear bond strength",
        "Resistant to water and weather conditions",
        "Excellent grab and non-slip on walls",
        "Extended open time"
      ]),
      benefitsJson: JSON.stringify([
        "Prevents heavy stones from sagging",
        "Absorbs thermal movements",
        "Ideal for external elevations and high rise applications"
      ]),
      specsJson: JSON.stringify({
        "Appearance": "Grey or White Powder",
        "Tensile Adhesion": "> 2.0 N/mm²",
        "Adjustability Time": "30 minutes",
        "Full Cure Time": "14 days"
      }),
      isFeatured: 0,
      isActive: 0,
      seoTitle: "Tile Grip Premium Plus - Flexible Tile & Stone Adhesive",
      seoDescription: "High performance Tile Grip Premium Plus flexible tile adhesive for large vitrified tiles, granite, and marble facade cladding.",
      imageUrl: "https://res.cloudinary.com/dmohmgbut/image/upload/v1782198109/3._Tile_Grip_Premium_Plus_s35asl.png",
      galleryImagesJson: "[]",
      price: "Contact for Quote",
      sortOrder: 3
    },
    {
      id: "prod-tg-premium-pro",
      categoryId: "cat-tile",
      name: "Tile Grip Premium Pro",
      slug: "tile-grip-premium-pro",
      shortDescription: "Professional grade high bond tile adhesive for internal & external cladding.",
      longDescription: "Tile Grip Premium Pro is a professional-grade, high-polymer-modified tile and stone adhesive engineered for high-demand applications, including heavy vitrified tiles, granite, sandstone, and marble on wall cladding and external areas.",
      packaging: "20 Kg bag",
      coverage: "Approx. 40-50 sq. ft. per 20 kg bag at 3-4mm thickness.",
      applicationType: "Heavy Duty Tile & Stone Cladding (Walls & Floors)",
      productType: "Professional polymer-fortified cementitious matrix",
      featuresJson: JSON.stringify([
        "Ultra-high bond strength",
        "Superior non-sag properties on vertical claddings",
        "Excellent shock and impact resistance",
        "Excellent pot life"
      ]),
      benefitsJson: JSON.stringify([
        "Perfect for external wall claddings",
        "Secures heavy granite and marble tiles",
        "Long-term structural reliability"
      ]),
      specsJson: JSON.stringify({
        "Appearance": "Grey or White Powder",
        "Tensile Adhesion": "> 2.2 N/mm²",
        "Open Time": "30 minutes",
        "Cure Time": "24 hours"
      }),
      isFeatured: 0,
      isActive: 0,
      seoTitle: "Tile Grip Premium Pro - Professional Stone & Tile Cladding Adhesive",
      seoDescription: "Buy Tile Grip Premium Pro professional grade stone adhesive. Ideal for interior and exterior tile claddings, heavy granites, and facades.",
      imageUrl: "https://res.cloudinary.com/dmohmgbut/image/upload/v1782198112/4._1_Tile_Grip_Premium_PRO_q9o2pb.png",
      galleryImagesJson: "[]",
      price: "Contact for Quote",
      sortOrder: 4
    },
    {
      id: "prod-tf-720",
      categoryId: "cat-tile",
      name: "ARKA FIX 720",
      slug: "arka-fix-720",
      shortDescription: "Premium heavy-duty polymer-modified cementitious tile adhesive engineered for large-format tiles, granite, and stones.",
      longDescription: "Premium heavy-duty polymer-modified cementitious tile adhesive engineered for largeformat vitrified tiles, porcelain, granite and natural stone. It provides exceptional bond strength, flexibility and slip resistance for demanding commercial, industrial and exterior façade applications.",
      packaging: "20 Kg bag",
      coverage: "Approx. 40-50 sq. ft. per 20 kg bag at 4mm thickness.",
      applicationType: "Ideal for large-format tiles, granite and stone on interior and exterior walls, floors, terraces and façades.",
      productType: "White cement based high polymer elastic adhesive",
      featuresJson: JSON.stringify([
        "Heavy-duty formulation",
        "Superior bond strength",
        "Excellent flexibility",
        "Façade applications",
        "High-traffic performance"
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
      seoDescription: "Learn more about Tile Fix 720 white cement based elastic tile adhesive. Ideal for swimming pools, glass mosaics, and large format stones.",
      imageUrl: "https://res.cloudinary.com/dmohmgbut/image/upload/v1782198103/4._2_ARKA_720_p7gef3.jpg",
      galleryImagesJson: "[]",
      price: "Contact for Quote",
      sortOrder: 5
    },
    // Block Joining
    {
      id: "prod-block-fix",
      categoryId: "cat-block",
      name: "ARKA BLOCKFIX",
      slug: "arka-blockfix",
      shortDescription: "Premium polymer-modified cement-based block jointing mortar for AAC, CLC, fly ash and concrete blocks.",
      longDescription: "Premium polymer-modified cement-based block jointing mortar for AAC, CLC, fly ash and concrete blocks delivering thin-bed application, high bond strength and faster construction.",
      packaging: "40 Kg bag",
      coverage: "Approx. 120-140 sq. ft. per 40 kg bag with a 3mm bed thickness.",
      applicationType: "Recommended for AAC, CLC, fly ash and concrete block masonry.",
      productType: "Self-curing thin-bed dry mortar",
      featuresJson: JSON.stringify([
        "High-strength formulation",
        "Thin-bed application",
        "Excellent adhesion",
        "Crack-resistant",
        "Fast construction"
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
      seoDescription: "Upgrade to Block Fix premium AAC block adhesive. Thin-bed self-curing mortar for fast, clean, and strong block masonry.",
      imageUrl: "https://res.cloudinary.com/dmohmgbut/image/upload/v1782198103/8._ARKA_BLOCK_FIX_z7sawk.png",
      galleryImagesJson: "[]",
      price: "Contact for Quote",
      sortOrder: 6
    },
    // Grouts & Anchoring
    {
      id: "prod-tg-721",
      categoryId: "cat-grout",
      name: "ARKA 721 TILE JOINTING GROUT",
      slug: "arka-721-tile-jointing-grout",
      shortDescription: "Premium polymer-modified cementitious grout developed to create strong, durable and aesthetically pleasing tile joints.",
      longDescription: "ARKA 721 Tile Jointing Grout is a premium polymer-modified cementitious grout developed to create strong, durable and aesthetically pleasing tile joints. Its advanced formulation delivers excellent adhesion, reduced shrinkage and improved water resistance, producing smooth, uniform joints that enhance the appearance and longevity of tiled surfaces. Suitable for interior and exterior applications, it provides reliable performance in residential, commercial and institutional projects while helping protect tile edges from moisture and dirt penetration.",
      packaging: "1 Kg & 10 Kg packs",
      coverage: "Varies depending on tile dimensions and joint width.",
      applicationType: "Recommended for grouting ceramic, vitrified, porcelain, mosaic and natural stone tiles in kitchens, bathrooms, living spaces, commercial buildings and exterior tiled areas.",
      productType: "Pigmented polymer-modified cementitious powder",
      featuresJson: JSON.stringify([
        "Polymer-modified formulation",
        "Smooth, dense finish",
        "Water-resistant performance",
        "Excellent colour consistency",
        "Suitable for walls and floors"
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
      seoDescription: "Choose Tile Grout 721 polymer modified cementitious joint grout for beautiful, non-crack, color-fast tile joints.",
      imageUrl: "https://res.cloudinary.com/dmohmgbut/image/upload/v1782198104/5._ARKA_GROUT_721_cvcwz1.jpg",
      galleryImagesJson: "[]",
      price: "Contact for Quote",
      sortOrder: 7
    },
    {
      id: "prod-ep-epoxy",
      categoryId: "cat-grout",
      name: "ARKA EP Epoxy Grout",
      slug: "arka-ep-epoxy-grout",
      shortDescription: "Premium, high-performance three-component epoxy-based tile joint filling system.",
      longDescription: "ARKA EP Epoxy Tile Grout is a premium, high-performance three-component epoxy-based tile joint filling system designed for areas that demand superior chemical resistance, stain protection, and long-lasting durability. It provides a dense, non-porous, waterproof finish that resists dirt, bacteria, mold, and harsh cleaning chemicals. Ideal for both residential and commercial installations, ARKA EP delivers excellent color consistency and a smooth, aesthetic finish while maintaining exceptional bond strength in demanding environments.",
      packaging: "5 Kg kit (Resin, Hardener, and Colored Filler)",
      coverage: "Depends on tile sizing and joint width.",
      applicationType: "Ideal for grouting ceramic, vitrified, porcelain, marble, granite, glass mosaic, and natural stone tile joints in bathrooms, kitchens, toilets, shower areas, swimming pools, fountains, spas, commercial kitchens, food processing units, hospitals, laboratories, pharmaceutical facilities, hotels, shopping malls, airports, industrial floors, and other residential, commercial, and high-traffic environments requiring durable, waterproof, stain-resistant, and hygienic tile joints.",
      productType: "Three-component reaction resin epoxy",
      featuresJson: JSON.stringify([
        "Superior Chemical & Stain Resistance",
        "100% Waterproof & Non-Porous",
        "High Strength & Abrasion Resistance",
        "Excellent Colour Stability & Aesthetic Finish",
        "Hygienic, Easy-to-Clean & Low Maintenance Surface"
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
      seoDescription: "Get EP Epoxy Grout three-component stain-free grout for commercial kitchens, hospitals, and pools. Maximum hygiene and stain protection.",
      imageUrl: "https://res.cloudinary.com/dmohmgbut/image/upload/v1782198103/6._4_EP_PART_C_zdqt4c.png",
      galleryImagesJson: JSON.stringify([
        "https://res.cloudinary.com/dmohmgbut/image/upload/v1782198104/6._2_EP_PART_A_i6ubpq.png",
        "https://res.cloudinary.com/dmohmgbut/image/upload/v1782198104/6._3_EP_PART_B_i5cfve.png"
      ]),
      price: "Contact for Quote",
      sortOrder: 8
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
      isActive: 0,
      seoTitle: "Free Grout 50 - Non-Shrink Foundation Grout | ARKA CRETE",
      seoDescription: "Configure Free Grout 50 high-early-strength flowable non-shrink cementitious grout for machinery baseplates and anchoring.",
      imageUrl: "https://res.cloudinary.com/dmohmgbut/image/upload/v1782198103/10._ARKA_FREE_GROUT-50_msisas.png",
      galleryImagesJson: "[]",
      price: "Contact for Quote",
      sortOrder: 9
    },
    {
      id: "prod-fg-70",
      categoryId: "cat-grout",
      name: "ARKA FREE GROUT 70",
      slug: "arka-free-grout-70",
      shortDescription: "High-strength, non-shrink, free-flow cementitious grout designed for precision grouting.",
      longDescription: "ARKA FREE GROUT 70 is a high-strength, non-shrink, free-flow cementitious grout designed for precision grouting applications. It offers outstanding flowability, excellent load transfer and durable performance under dynamic and static loads, making it ideal for industrial and structural installations.",
      packaging: "25 Kg bag",
      coverage: "Yields approx 12-13 liters per 25 kg bag.",
      applicationType: "Recommended for machine foundations, anchor bolts, bridge bearings, precast elements and precision structural grouting.",
      productType: "High performance non-shrink cementitious powder",
      featuresJson: JSON.stringify([
        "High early & ultimate strength",
        "Free-flowing consistency",
        "Non-shrink performance",
        "Excellent load transfer",
        "Easy placement"
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
      seoDescription: "Read about Free Grout 70 dual expansion grout for turbines, bridge bearings, and dynamic heavy loads. 70 N/mm² strength.",
      imageUrl: null,
      galleryImagesJson: "[]",
      price: "Contact for Quote",
      sortOrder: 10
    },
    {
      id: "prod-polygrout",
      categoryId: "cat-grout",
      name: "ARKA POLYGROUT",
      slug: "arka-polygrout",
      shortDescription: "Rapid-curing two-component polyester resin anchor grout designed for heavy-duty anchoring.",
      longDescription: "ARKA POLYGROUT is a rapid-curing two-component polyester resin anchor grout designed for heavy-duty anchoring and structural fixing applications. It provides exceptional bond strength, high early strength development and excellent chemical resistance, making it ideal for demanding industrial and infrastructure projects. The fast-setting formulation minimizes downtime while ensuring secure anchoring in concrete, masonry and rock substrates.",
      packaging: "25 Kg bag",
      coverage: "Approx 13.5 liters per 25 kg bag.",
      applicationType: "Ideal for anchoring threaded rods, reinforcement bars, machinery foundations, handrails, façade supports and structural retrofitting works.",
      productType: "Polymer modified structural mortar",
      featuresJson: JSON.stringify([
        "Rapid-curing technology",
        "High early strength",
        "Excellent chemical resistance",
        "Superior anchoring performance",
        "Heavy-duty structural fixing"
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
      seoDescription: "Choose Polygrout for concrete patching and jointing. Outstanding bond strength and durable polymer matrix.",
      imageUrl: "https://res.cloudinary.com/dmohmgbut/image/upload/v1782198156/12._2_ARKA_POLYGROUT_PART-A_pon0xa.png",
      galleryImagesJson: "[]",
      price: "Contact for Quote",
      sortOrder: 11
    },
    {
      id: "prod-expacem-225",
      categoryId: "cat-grout",
      name: "ARKA EXPACEM 225",
      slug: "arka-expacem-225",
      shortDescription: "High-performance expansive grout additive formulated to compensate for shrinkage in cementitious grouts.",
      longDescription: "ARKA EXPACEM 225 is a high-performance expansive grout additive formulated to compensate for shrinkage in cementitious grouts and mortars. It improves dimensional stability, enhances compressive strength and minimizes cracking, ensuring dependable performance in precision grouting applications.",
      packaging: "25 Kg bag",
      coverage: "Approx 12.5 liters of wet slurry per 25 kg bag.",
      applicationType: "Recommended for machinery base plates, anchor bolts, precast elements, bridge bearings and structural grouting applications.",
      productType: "Expansive cementitious chemical powder",
      featuresJson: JSON.stringify([
        "Controlled expansion",
        "Compensates shrinkage",
        "Improves grout strength",
        "Reduces cracking",
        "Easy to use"
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
      seoDescription: "Discover Expacem 225 expansive anchoring grout. Best for anchoring starter bars, tie-rods, and foundation bolts with high pullout loads.",
      imageUrl: "https://res.cloudinary.com/dmohmgbut/image/upload/v1782198161/11._ARKA_EXPACEM_225_qgyhnv.png",
      galleryImagesJson: "[]",
      price: "Contact for Quote",
      sortOrder: 12
    },
    // Repair Products
    {
      id: "prod-microcrete",
      categoryId: "cat-repair",
      name: "ARKA MICROCRETE",
      slug: "arka-microcrete",
      shortDescription: "Shrinkage-compensated, free-flow micro concrete developed for structural repairs.",
      longDescription: "ARKA MICROCRETE is a shrinkage-compensated, free-flow micro concrete developed for structural repairs and strengthening applications. Requiring only the addition of water, it provides excellent flowability, high compressive strength and reliable durability in heavily reinforced and confined sections.",
      packaging: "25 Kg bag",
      coverage: "Approx. 13 liters per 25 kg bag.",
      applicationType: "Suitable for RCC jacketing, beam and column repairs, pile caps, precast repairs and structural rehabilitation projects.",
      productType: "Flowable non-shrink micro-concrete system",
      featuresJson: JSON.stringify([
        "Free-flowing formulation",
        "High structural strength",
        "Shrinkage compensated",
        "Excellent durability",
        "Easy placement"
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
      seoDescription: "Order Microcrete for structural concrete repairs and column jacketing. Highly flowable, non-shrink, ready-to-use formulation.",
      imageUrl: "https://res.cloudinary.com/dmohmgbut/image/upload/v1782198103/7._ARKA_MICROCRETE_a3un02.png",
      galleryImagesJson: "[]",
      price: "Contact for Quote",
      sortOrder: 13
    },
    {
      id: "prod-rep-111",
      categoryId: "cat-repair",
      name: "ARKAREP 111",
      slug: "arkarep-111",
      shortDescription: "Rapid-setting cementitious plugging mortar specially formulated to stop active water leaks instantly.",
      longDescription: "ARKAREP 111 is a rapid-setting cementitious plugging mortar specially formulated to stop active water leaks instantly in concrete and masonry structures. Its fast-setting formulation develops high early strength, making it ideal for emergency repairs and waterproofing works. Easy to mix and apply, it creates a durable, non-shrink seal that withstands continuous water pressure and restores the integrity of damaged structures.",
      packaging: "25 Kg bag",
      coverage: "Approx 13.5 liters of mortar per 25 kg bag.",
      applicationType: "Ideal for sealing active leaks, cracks, pipe penetrations, lift pits, basements, retaining walls, tunnels and emergency concrete repairs.",
      productType: "Single component polymer modified structural mortar",
      featuresJson: JSON.stringify([
        "Ultra-fast setting",
        "Stops active water leaks",
        "High early strength",
        "Non-shrink formulation",
        "Easy hand application"
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
      seoDescription: "Apply Rep 111 polymer-modified mortar for vertical concrete repairs, ceilings, and column repairs. Superb thixotropic property prevents sag.",
      imageUrl: "https://res.cloudinary.com/dmohmgbut/image/upload/v1782198153/9._ARKA_REP111_adtsip.jpg",
      galleryImagesJson: "[]",
      price: "Contact for Quote",
      sortOrder: 14
    },
    // Waterproofing
    {
      id: "prod-arkacoat-fx",
      categoryId: "cat-waterproof",
      name: "ARKA COAT FX",
      slug: "arka-coat-fx",
      shortDescription: "Premium two-component flexible waterproofing system engineered to protect concrete and masonry structures.",
      longDescription: "ARKA COAT FX is a premium two-component flexible waterproofing system engineered to protect concrete and masonry structures from water ingress. The cementitious powder and polymer liquid combine to form a seamless, flexible membrane with excellent crack-bridging capability and long-term durability. Suitable for positive-side waterproofing, it delivers reliable protection in residential, commercial and infrastructure projects.",
      packaging: "20 Kg kit (15 Kg Powder + 5 Kg Liquid)",
      coverage: "Approx. 120-140 sq. ft. per 20 kg kit in 2 coats (1mm thickness).",
      applicationType: "Ideal for waterproofing bathrooms, balconies, terraces, roof slabs, basements, retaining walls and water-retaining structures.",
      productType: "Two-component flexible polymer waterproofing slurry",
      featuresJson: JSON.stringify([
        "Flexible waterproof membrane",
        "Excellent crack-bridging",
        "Superior adhesion",
        "Weather-resistant protection",
        "Easy brush application"
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
      seoDescription: "Apply Arkacoat FX flexible polymer modified waterproofing coating for bathrooms, balconies, basements, and water tanks. Prevents leakage.",
      imageUrl: "https://res.cloudinary.com/dmohmgbut/image/upload/v1782198153/16._2_ARKACOAT_FX_PART_A_rqtkst.png",
      galleryImagesJson: "[]",
      price: "Contact for Quote",
      sortOrder: 15
    },
    {
      id: "prod-arkaguard-iwpl",
      categoryId: "cat-waterproof",
      name: "ARKA GUARD IWPL",
      slug: "arka-guard-iwpl",
      shortDescription: "Premium liquid integral waterproofing compound that improves concrete impermeability and durability.",
      longDescription: "ARKA GUARD IWPL is a premium liquid integral waterproofing compound that improves the impermeability, durability and workability of concrete, mortar and plaster. It reduces water absorption and enhances long-term performance without affecting the strength of cement-based mixes.",
      packaging: "1 Litre, 5 Litres, 20 Litres & 200 Litres drums",
      coverage: "Dosage: 200 ml per 50 kg bag of cement.",
      applicationType: "Ideal for roof slabs, water tanks, basements, foundations, plastering, bathrooms and general concrete works.",
      productType: "Active chemical liquid waterproofing additive",
      featuresJson: JSON.stringify([
        "Reduces water permeability",
        "Improves workability",
        "Enhances durability",
        "Chloride-free",
        "Compatible with cement-based mixes"
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
      seoDescription: "Use Arkaguard IWPL integral liquid waterproofing compound for slab castings, brick masonry, and structural concrete. Only 200ml per bag.",
      imageUrl: "https://res.cloudinary.com/dmohmgbut/image/upload/v1782198152/14._ARKAGUARD_WPL_p3rjyo.png",
      galleryImagesJson: "[]",
      price: "Contact for Quote",
      sortOrder: 16
    },
    {
      id: "prod-arkabond-sbr",
      categoryId: "cat-waterproof",
      name: "ARKABOND SBR",
      slug: "arkabond-sbr",
      shortDescription: "High-performance styrene-butadiene rubber bonding agent for concrete repair and waterproofing.",
      longDescription: "ARKABOND SBR is a high-performance styrene-butadiene rubber bonding agent that improves the adhesion, flexibility and waterproofing performance of cementitious mortars and concrete. It enhances bonding between old and new concrete while increasing resistance to cracking and water penetration.",
      packaging: "1 Litre, 5 Litres, 20 Litres & 200 Litres drums",
      coverage: "Varies depending on mix design (screeds, bonding slurry, or mortar).",
      applicationType: "Recommended for concrete repairs, bonding coats, waterproofing systems, polymer-modified mortars, floor screeds and patch repair works.",
      productType: "SBR polymer latex modifier bonding emulsion",
      featuresJson: JSON.stringify([
        "Excellent bonding agent",
        "Improves flexibility",
        "Enhances waterproofing",
        "Increases durability",
        "Multi-purpose application"
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
      seoDescription: "Choose Arkabond SBR high-performance copolymer latex bonding agent for concrete repairs, waterproof screeds, and key coat plasters.",
      imageUrl: "https://res.cloudinary.com/dmohmgbut/image/upload/v1782198152/15._ARKABOND_SBR_xh0m4m.png",
      galleryImagesJson: "[]",
      price: "Contact for Quote",
      sortOrder: 17
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
