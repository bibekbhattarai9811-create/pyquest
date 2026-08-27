-- CreateTable
CREATE TABLE "TutorUsage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TutorUsage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TutorUsage_userId_day_key" ON "TutorUsage"("userId", "day");

-- AddForeignKey
ALTER TABLE "TutorUsage" ADD CONSTRAINT "TutorUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
