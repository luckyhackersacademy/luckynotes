CREATE TABLE `notes` (
	`slug` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`is_draft` integer DEFAULT true,
	`created_at` integer DEFAULT (CURRENT_DATE) NOT NULL
);
