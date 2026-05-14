-- CreateTable
CREATE TABLE `LotteryDraw` (
    `id` VARCHAR(191) NOT NULL,
    `drawDate` DATETIME(3) NOT NULL,
    `isClosed` BOOLEAN NOT NULL DEFAULT false,
    `results` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `LotteryDraw_drawDate_key`(`drawDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `id` VARCHAR(191) NOT NULL,
    `ticketNumber` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` ENUM('PENDING', 'WON', 'LOST', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `prizeWon` VARCHAR(191) NULL,
    `rewardAmount` DOUBLE NULL,
    `expireDate` DATETIME(3) NULL,
    `drawId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_drawId_fkey` FOREIGN KEY (`drawId`) REFERENCES `LotteryDraw`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
