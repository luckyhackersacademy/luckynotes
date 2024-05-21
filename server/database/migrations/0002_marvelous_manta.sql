CREATE TABLE `note_likes` (
	`slug` text,
	`userId` text,
	FOREIGN KEY (`slug`) REFERENCES `notes`(`slug`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `note_views` (
	`slug` text,
	`userId` text,
	FOREIGN KEY (`slug`) REFERENCES `notes`(`slug`) ON UPDATE no action ON DELETE no action
);
