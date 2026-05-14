/*
  Warnings:

  - The values [CANCELLED] on the enum `Ticket_status` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[externalId]` on the table `LotteryDraw` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expireDate` to the `LotteryDraw` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `LotteryDraw` ADD COLUMN `expireDate` DATETIME(3) NOT NULL,
    ADD COLUMN `externalId` VARCHAR(191) NULL,
    ADD COLUMN `status` ENUM('UPCOMING', 'PENDING_RESULT', 'FINISHED') NOT NULL DEFAULT 'UPCOMING';

-- AlterTable
ALTER TABLE `Ticket` MODIFY `status` ENUM('PENDING', 'WON', 'LOST', 'EXPIRED') NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX `LotteryDraw_externalId_key` ON `LotteryDraw`(`externalId`);
