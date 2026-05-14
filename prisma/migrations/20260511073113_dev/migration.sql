/*
  Warnings:

  - You are about to drop the column `userId` on the `WinningTickets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `LotteryDraw` ADD COLUMN `customerId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `WinningTickets` DROP COLUMN `userId`,
    ADD COLUMN `customerId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Customer` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Customer_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LotteryDraw` ADD CONSTRAINT `LotteryDraw_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WinningTickets` ADD CONSTRAINT `WinningTickets_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
