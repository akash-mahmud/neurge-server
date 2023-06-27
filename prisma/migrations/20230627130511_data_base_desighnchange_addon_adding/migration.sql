-- CreateTable
CREATE TABLE "Addon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Addon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddonBlogCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "addonId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AddonBlogCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imoji" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "addonId" TEXT NOT NULL,
    "addonBlogCategoryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_userpurchasedAddons" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserPurchasedCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_userpurchasedAddons_AB_unique" ON "_userpurchasedAddons"("A", "B");

-- CreateIndex
CREATE INDEX "_userpurchasedAddons_B_index" ON "_userpurchasedAddons"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserPurchasedCategories_AB_unique" ON "_UserPurchasedCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_UserPurchasedCategories_B_index" ON "_UserPurchasedCategories"("B");

-- AddForeignKey
ALTER TABLE "AddonBlogCategory" ADD CONSTRAINT "AddonBlogCategory_addonId_fkey" FOREIGN KEY ("addonId") REFERENCES "Addon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_addonId_fkey" FOREIGN KEY ("addonId") REFERENCES "Addon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_addonBlogCategoryId_fkey" FOREIGN KEY ("addonBlogCategoryId") REFERENCES "AddonBlogCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userpurchasedAddons" ADD CONSTRAINT "_userpurchasedAddons_A_fkey" FOREIGN KEY ("A") REFERENCES "Addon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userpurchasedAddons" ADD CONSTRAINT "_userpurchasedAddons_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserPurchasedCategories" ADD CONSTRAINT "_UserPurchasedCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserPurchasedCategories" ADD CONSTRAINT "_UserPurchasedCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
