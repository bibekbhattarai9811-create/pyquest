-- CreateTable
CREATE TABLE "SolutionRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lessonKey" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "SolutionRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SolutionRequest_status_idx" ON "SolutionRequest"("status");

-- CreateIndex
CREATE UNIQUE INDEX "SolutionRequest_userId_lessonKey_key" ON "SolutionRequest"("userId", "lessonKey");

-- AddForeignKey
ALTER TABLE "SolutionRequest" ADD CONSTRAINT "SolutionRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
