/*
  Warnings:

  - Added the required column `updated_at` to the `subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."subscription" ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "trial_end" TIMESTAMP(6),
ADD COLUMN     "trial_start" TIMESTAMP(6),
ADD COLUMN     "updated_at" TIMESTAMP(6) NOT NULL;
