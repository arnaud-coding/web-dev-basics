-- créer les tables de la base de données "Star Wars"
CREATE TABLE IF NOT EXISTS `People` (
	`id` integer primary key NOT NULL UNIQUE,
	`name` text NOT NULL DEFAULT '',
	`mass` float,
	`height` float
);
CREATE TABLE IF NOT EXISTS `Films` (
	`id` integer primary key NOT NULL UNIQUE,
	`title` text NOT NULL DEFAULT '',
	`episode_id` integer NOT NULL,
	`director` text NOT NULL DEFAULT '',
	`opening_crawl` text NOT NULL DEFAULT '',
	`release_date` datetime NOT NULL
);
CREATE TABLE IF NOT EXISTS `people_films` (
	`id` integer primary key NOT NULL UNIQUE,
	`person_id` integer NOT NULL,
	`film_id` integer NOT NULL,
FOREIGN KEY(`person_id`) REFERENCES `People`(`id`),
FOREIGN KEY(`film_id`) REFERENCES `Films`(`id`)
);
