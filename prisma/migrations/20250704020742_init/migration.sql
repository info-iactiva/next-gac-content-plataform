/*
  Warnings:

  - Added the required column `apellidos` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre_empresa` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero_empleados` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sector` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "apellidos" TEXT NOT NULL,
ADD COLUMN     "nombre" TEXT NOT NULL,
ADD COLUMN     "nombre_empresa" TEXT NOT NULL,
ADD COLUMN     "numero_empleados" INTEGER NOT NULL,
ADD COLUMN     "sector" TEXT NOT NULL;
