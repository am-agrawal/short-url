-- CreateTable
CREATE TABLE "ShortUrl" (
    "id" SERIAL NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "createdBy" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inactive" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ShortUrl_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortUrl_shortUrl_key" ON "ShortUrl"("shortUrl");

-- CreateIndex
CREATE UNIQUE INDEX "ShortUrl_originalUrl_key" ON "ShortUrl"("originalUrl");
