CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"email" varchar(255),
	"admin" BOOLEAN DEFAULT false,
	"dev" BOOLEAN DEFAULT false
)

CREATE TABLE "surveys" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar(255) NOT NULL,
	"end_date" varchar(255) NOT NULL,
	"user_id" integer NOT NULL,
	"status" varchar(255),
)

CREATE TABLE "questions" (
	"id" SERIAL PRIMARY KEY,
	"question_text" varchar(1000) NOT NULL,
	"survey_id" integer REFERENCES "surveys" NOT NULL
)

CREATE TABLE "answers" (
	"id" SERIAL PRIMARY KEY,
	"question_id" integer REFERENCES "questions" NOT NULL,
	"survey_id" integer REFERENCES "surveys" NOT NULL,
	"answer_text" varchar(1000) NOT NULL,
	"num_of_votes" integer NOT NULL DEFAULT 0
)

CREATE TABLE "migs" (
	"id" SERIAL PRIMARY KEY,
	"persona" varchar(255) NOT NULL,
	"legal_name" varchar(255),
	"email" varchar(255) NOT NULL
)

CREATE TABLE "survey_migs" (
	"id" SERIAL PRIMARY KEY,
	"migs_id" integer REFERENCES "migs" NOT NULL,
	"survey_id" integer REFERENCES "surveys" NOT NULL,
	"token" varchar(1000),
	"has_voted" BOOLEAN DEFAULT false
)

