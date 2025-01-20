CREATE TABLE "account" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" uuid,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" timestamp,
	"refreshTokenExpiresAt" timestamp,
	"scope" text,
	"password" text
);
--> statement-breakpoint
CREATE TABLE "oauthAccessToken" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"accessToken" text NOT NULL,
	"refreshToken" text NOT NULL,
	"accessTokenExpiresAt" timestamp NOT NULL,
	"refreshTokenExpiresAt" timestamp NOT NULL,
	"clientId" text,
	"userId" uuid,
	"scopes" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "oauthApplication" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"clientId" text NOT NULL,
	"clientSecret" text NOT NULL,
	"name" text NOT NULL,
	"redirectURLs" text NOT NULL,
	"metadata" text,
	"type" text NOT NULL,
	"disabled" boolean,
	"userId" uuid,
	CONSTRAINT "oauthApplication_clientId_unique" UNIQUE("clientId")
);
--> statement-breakpoint
CREATE TABLE "oauthConsent" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" uuid,
	"clientId" text,
	"scopes" text NOT NULL,
	"consentGiven" boolean
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"userId" uuid,
	"token" text NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oauthAccessToken" ADD CONSTRAINT "oauthAccessToken_clientId_oauthApplication_clientId_fk" FOREIGN KEY ("clientId") REFERENCES "public"."oauthApplication"("clientId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oauthAccessToken" ADD CONSTRAINT "oauthAccessToken_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oauthConsent" ADD CONSTRAINT "oauthConsent_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oauthConsent" ADD CONSTRAINT "oauthConsent_clientId_oauthApplication_clientId_fk" FOREIGN KEY ("clientId") REFERENCES "public"."oauthApplication"("clientId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "emailIndex" ON "user" USING btree (lower("email"));