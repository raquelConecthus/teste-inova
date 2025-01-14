-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_departmentId_fkey`;

-- DropIndex
DROP INDEX `User_departmentId_key` ON `User`;

