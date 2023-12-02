/*
  Warnings:

  - The primary key for the `post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `brief` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `markdown` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `tableOfContents` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "post" DROP CONSTRAINT "post_pkey",
DROP COLUMN "brief",
DROP COLUMN "markdown",
DROP COLUMN "tableOfContents",
DROP COLUMN "title",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "post_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "post_translation" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER,
    "language_code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "brief" TEXT NOT NULL,
    "tableOfContents" TEXT NOT NULL,
    "markdown" TEXT NOT NULL,

    CONSTRAINT "post_translation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "post_translation_unique" ON "post_translation"("post_id", "language_code");

-- AddForeignKey
ALTER TABLE "post_translation" ADD CONSTRAINT "post_translation_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
