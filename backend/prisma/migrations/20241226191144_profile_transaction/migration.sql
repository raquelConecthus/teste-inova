-- AlterTable
ALTER TABLE `User` ADD COLUMN `profile_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `status` TINYINT NULL,
    `identifier` VARCHAR(100) NULL,
    `code` INTEGER NULL,
    `updated_at` DATETIME NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile_Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profile_id` INTEGER NULL,
    `transaction_id` INTEGER NULL,

    INDEX `fk_PROFILE_TRANSACTION_PROFILE`(`profile_id`),
    INDEX `fk_PROFILE_TRANSACTION_TRANSACTION`(`transaction_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` DECIMAL(10, 0) NULL,
    `status` TINYINT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile_Transaction` ADD CONSTRAINT `fk_PROFILE_TRANSACTION_PROFILE` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile_Transaction` ADD CONSTRAINT `fk_PROFILE_TRANSACTION_TRANSACTION` FOREIGN KEY (`transaction_id`) REFERENCES `Transaction`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
