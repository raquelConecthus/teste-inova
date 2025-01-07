/*
  Warnings:

  - You are about to drop the column `approver` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `creator` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `startDate` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `endDate` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - Added the required column `approverId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `approver`,
    DROP COLUMN `creator`,
    ADD COLUMN `approverId` INTEGER NOT NULL,
    ADD COLUMN `creatorId` INTEGER NOT NULL,
    MODIFY `startDate` DATETIME(3) NOT NULL,
    MODIFY `endDate` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_approverId_fkey` FOREIGN KEY (`approverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
