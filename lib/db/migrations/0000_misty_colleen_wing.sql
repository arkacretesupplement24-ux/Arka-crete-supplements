CREATE TABLE `audit_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`actor_user_id` text,
	`action` text NOT NULL,
	`entity_type` text NOT NULL,
	`entity_id` text NOT NULL,
	`before_json` text,
	`after_json` text,
	`ip_address` text,
	`user_agent` text,
	`created_at` text DEFAULT 'datetime(''now'')',
	FOREIGN KEY (`actor_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`sort_order` integer DEFAULT 0,
	`is_active` integer DEFAULT 1,
	`created_at` text DEFAULT 'datetime(''now'')',
	`updated_at` text DEFAULT 'datetime(''now'')'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categories_slug_unique` ON `categories` (`slug`);--> statement-breakpoint
CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`company_name` text,
	`city` text,
	`state` text,
	`product_id` text,
	`inquiry_type` text NOT NULL,
	`message` text NOT NULL,
	`status` text DEFAULT 'new',
	`source` text DEFAULT 'website',
	`created_at` text DEFAULT 'datetime(''now'')',
	`updated_at` text DEFAULT 'datetime(''now'')',
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `media_assets` (
	`id` text PRIMARY KEY NOT NULL,
	`file_name` text NOT NULL,
	`file_url` text NOT NULL,
	`file_type` text NOT NULL,
	`alt_text` text,
	`uploaded_by` text,
	`created_at` text DEFAULT 'datetime(''now'')',
	FOREIGN KEY (`uploaded_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pages` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`seo_title` text,
	`seo_description` text,
	`is_published` integer DEFAULT 1,
	`created_at` text DEFAULT 'datetime(''now'')',
	`updated_at` text DEFAULT 'datetime(''now'')'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pages_slug_unique` ON `pages` (`slug`);--> statement-breakpoint
CREATE TABLE `permissions` (
	`id` text PRIMARY KEY NOT NULL,
	`key` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `permissions_key_unique` ON `permissions` (`key`);--> statement-breakpoint
CREATE TABLE `product_documents` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`title` text NOT NULL,
	`file_url` text NOT NULL,
	`file_type` text,
	`sort_order` integer DEFAULT 0,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product_images` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`image_url` text NOT NULL,
	`alt_text` text,
	`sort_order` integer DEFAULT 0,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`category_id` text NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`short_description` text,
	`long_description` text,
	`packaging` text,
	`coverage` text,
	`application_type` text,
	`product_type` text,
	`features_json` text,
	`benefits_json` text,
	`specs_json` text,
	`is_featured` integer DEFAULT 0,
	`is_active` integer DEFAULT 1,
	`seo_title` text,
	`seo_description` text,
	`created_at` text DEFAULT 'datetime(''now'')',
	`updated_at` text DEFAULT 'datetime(''now'')',
	`deleted_at` text,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);--> statement-breakpoint
CREATE TABLE `role_permissions` (
	`role_id` text NOT NULL,
	`permission_id` text NOT NULL,
	PRIMARY KEY(`role_id`, `permission_id`),
	FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_at` text DEFAULT 'datetime(''now'')',
	`updated_at` text DEFAULT 'datetime(''now'')'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `roles_name_unique` ON `roles` (`name`);--> statement-breakpoint
CREATE TABLE `settings` (
	`id` text PRIMARY KEY NOT NULL,
	`key` text NOT NULL,
	`value_json` text NOT NULL,
	`updated_at` text DEFAULT 'datetime(''now'')'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `settings_key_unique` ON `settings` (`key`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`role_id` text,
	`is_active` integer DEFAULT 1,
	`last_login_at` text,
	`created_at` text DEFAULT 'datetime(''now'')',
	`updated_at` text DEFAULT 'datetime(''now'')',
	`deleted_at` text,
	FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);