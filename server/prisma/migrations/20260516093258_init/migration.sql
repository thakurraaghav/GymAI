/*
  Warnings:

  - You are about to drop the column `preferred_spilt` on the `user_profiles` table. All the data in the column will be lost.
  - Added the required column `preferred_split` to the `user_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_profiles" DROP COLUMN "preferred_spilt",
ADD COLUMN     "preferred_split" VARCHAR(20) NOT NULL;
