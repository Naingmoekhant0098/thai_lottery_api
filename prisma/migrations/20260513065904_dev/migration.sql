/*
  Warnings:

  - You are about to alter the column `isSold` on the `Ticket` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Ticket` MODIFY `isSold` BOOLEAN NOT NULL DEFAULT false;
