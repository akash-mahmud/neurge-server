/*
  Warnings:

  - You are about to drop the column `taskId` on the `Addon` table. All the data in the column will be lost.
  - Added the required column `img` to the `Addon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moneyBackGuarantee` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskAutomateCount` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topTierPromptCount` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Addon" DROP COLUMN "taskId",
ADD COLUMN     "img" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "moneyBackGuarantee" INTEGER NOT NULL,
ADD COLUMN     "taskAutomateCount" INTEGER NOT NULL,
ADD COLUMN     "topTierPromptCount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nurgePlus" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
