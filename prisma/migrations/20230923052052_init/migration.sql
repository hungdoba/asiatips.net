-- CreateTable
CREATE TABLE "post" (
    "url" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "markdown" TEXT NOT NULL,
    "tags" TEXT[],
    "title" TEXT NOT NULL,
    "brief" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tableOfContents" TEXT NOT NULL,
    "active" BOOLEAN,

    CONSTRAINT "post_pkey" PRIMARY KEY ("url")
);

-- CreateTable
CREATE TABLE "subscribe" (
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscribe_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "message" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);
