/*
  Warnings:

  - You are about to drop the column `roleId` on the `User_Roles` table. All the data in the column will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `permissionId` to the `User_Roles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Role` DROP FOREIGN KEY `Role_permissionId_fkey`;

-- DropForeignKey
ALTER TABLE `User_Roles` DROP FOREIGN KEY `User_Roles_roleId_fkey`;

-- DropIndex
DROP INDEX `User_Roles_roleId_fkey` ON `User_Roles`;

-- AlterTable
ALTER TABLE `User_Roles` DROP COLUMN `roleId`,
    ADD COLUMN `permissionId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Role`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Roles` ADD CONSTRAINT `User_Roles_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `Permission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
