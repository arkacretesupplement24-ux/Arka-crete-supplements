import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";

// 1. Roles table
export const roles = sqliteTable("roles", {
  id: text("id").primaryKey(),
  name: text("name").unique().notNull(),
  description: text("description"),
  createdAt: text("created_at").default("datetime('now')"),
  updatedAt: text("updated_at").default("datetime('now')"),
});

// 2. Users table
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  passwordHash: text("password_hash").notNull(),
  roleId: text("role_id").references(() => roles.id),
  isActive: integer("is_active").default(1), // 0 or 1
  lastLoginAt: text("last_login_at"),
  createdAt: text("created_at").default("datetime('now')"),
  updatedAt: text("updated_at").default("datetime('now')"),
  deletedAt: text("deleted_at"),
});

// 3. Permissions table
export const permissions = sqliteTable("permissions", {
  id: text("id").primaryKey(),
  key: text("key").unique().notNull(), // e.g. 'products:write'
  description: text("description"),
});

// 4. Role Permissions junction table
export const rolePermissions = sqliteTable("role_permissions", {
  roleId: text("role_id").references(() => roles.id).notNull(),
  permissionId: text("permission_id").references(() => permissions.id).notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.roleId, t.permissionId] }),
}));

// 5. Categories table
export const categories = sqliteTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description"),
  sortOrder: integer("sort_order").default(0),
  isActive: integer("is_active").default(1),
  createdAt: text("created_at").default("datetime('now')"),
  updatedAt: text("updated_at").default("datetime('now')"),
});

// 6. Products table
export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  categoryId: text("category_id").references(() => categories.id).notNull(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  shortDescription: text("short_description"),
  longDescription: text("long_description"),
  packaging: text("packaging"),
  coverage: text("coverage"),
  applicationType: text("application_type"),
  productType: text("product_type"),
  featuresJson: text("features_json"), // stringified JSON array
  benefitsJson: text("benefits_json"),   // stringified JSON array
  specsJson: text("specs_json"),       // stringified JSON key-value object
  isFeatured: integer("is_featured").default(0),
  isActive: integer("is_active").default(1),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  createdAt: text("created_at").default("datetime('now')"),
  updatedAt: text("updated_at").default("datetime('now')"),
  deletedAt: text("deleted_at"),
  imageUrl: text("image_url"),
  galleryImagesJson: text("gallery_images_json"), // holds stringified JSON array of additional image URLs
  price: text("price"),
  sortOrder: integer("sort_order").default(0),
});

// 7. Product Images table
export const productImages = sqliteTable("product_images", {
  id: text("id").primaryKey(),
  productId: text("product_id").references(() => products.id).notNull(),
  imageUrl: text("image_url").notNull(),
  altText: text("alt_text"),
  sortOrder: integer("sort_order").default(0),
});

// 8. Product Documents table
export const productDocuments = sqliteTable("product_documents", {
  id: text("id").primaryKey(),
  productId: text("product_id").references(() => products.id).notNull(),
  title: text("title").notNull(),
  fileUrl: text("file_url").notNull(),
  fileType: text("file_type"), // e.g. 'pdf'
  sortOrder: integer("sort_order").default(0),
});

// 9. Pages table (custom content pages)
export const pages = sqliteTable("pages", {
  id: text("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  isPublished: integer("is_published").default(1),
  createdAt: text("created_at").default("datetime('now')"),
  updatedAt: text("updated_at").default("datetime('now')"),
});

// 10. Inquiries table
export const inquiries = sqliteTable("inquiries", {
  id: text("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  companyName: text("company_name"),
  city: text("city"),
  state: text("state"),
  productId: text("product_id").references(() => products.id),
  inquiryType: text("inquiry_type").notNull(), // 'product' | 'general' | 'dealer'
  message: text("message").notNull(),
  status: text("status").default("new"), // 'new' | 'contacted' | 'closed'
  source: text("source").default("website"),
  createdAt: text("created_at").default("datetime('now')"),
  updatedAt: text("updated_at").default("datetime('now')"),
});

// 11. Media Assets table
export const mediaAssets = sqliteTable("media_assets", {
  id: text("id").primaryKey(),
  fileName: text("file_name").notNull(),
  fileUrl: text("file_url").notNull(),
  fileType: text("file_type").notNull(), // e.g. 'image/png'
  altText: text("alt_text"),
  uploadedBy: text("uploaded_by").references(() => users.id),
  createdAt: text("created_at").default("datetime('now')"),
});

// 12. Settings table
export const settings = sqliteTable("settings", {
  id: text("id").primaryKey(),
  key: text("key").unique().notNull(), // e.g. 'site_config'
  valueJson: text("value_json").notNull(), // stringified JSON
  updatedAt: text("updated_at").default("datetime('now')"),
});

// 13. Audit Logs table
export const auditLogs = sqliteTable("audit_logs", {
  id: text("id").primaryKey(),
  actorUserId: text("actor_user_id").references(() => users.id),
  action: text("action").notNull(), // e.g. 'product:create'
  entityType: text("entity_type").notNull(), // e.g. 'products'
  entityId: text("entity_id").notNull(),
  beforeJson: text("before_json"), // stringified JSON state before changes
  afterJson: text("after_json"),   // stringified JSON state after changes
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: text("created_at").default("datetime('now')"),
});
export type Role = typeof roles.$inferSelect;
export type User = typeof users.$inferSelect;
export type Permission = typeof permissions.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type ProductImage = typeof productImages.$inferSelect;
export type ProductDocument = typeof productDocuments.$inferSelect;
export type CustomPage = typeof pages.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
export type MediaAsset = typeof mediaAssets.$inferSelect;
export type Setting = typeof settings.$inferSelect;
export type AuditLog = typeof auditLogs.$inferSelect;
