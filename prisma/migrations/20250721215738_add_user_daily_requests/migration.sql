-- CreateTable
CREATE TABLE "DailyRequest" (
    "day" TIMESTAMP(3) NOT NULL,
    "total" INTEGER NOT NULL DEFAULT 1,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "DailyRequest_pkey" PRIMARY KEY ("day","userId")
);

-- AddForeignKey
ALTER TABLE "DailyRequest" ADD CONSTRAINT "DailyRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
