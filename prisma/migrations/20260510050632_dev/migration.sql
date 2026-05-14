/*
  Warnings:

  - Added the required column `firstThree` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastThree` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastTwo` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ticket` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `firstThree` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastThree` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastTwo` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NULL,
    MODIFY `amount` INTEGER NOT NULL,
    MODIFY `rewardAmount` INTEGER NULL;

-- CreateTable
CREATE TABLE `WinningTickets` (
    `id` VARCHAR(191) NOT NULL,
    `ticketId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `prizeName` VARCHAR(191) NOT NULL,
    `prizeAmount` INTEGER NOT NULL,
    `isClaimed` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `WinningTickets_ticketId_key`(`ticketId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Ticket_ticketNumber_idx` ON `Ticket`(`ticketNumber`);

-- CreateIndex
CREATE INDEX `Ticket_lastTwo_idx` ON `Ticket`(`lastTwo`);

-- AddForeignKey
ALTER TABLE `WinningTickets` ADD CONSTRAINT `WinningTickets_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
