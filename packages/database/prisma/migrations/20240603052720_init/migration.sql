-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lineUid" TEXT NOT NULL,
    "comment" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_lineUid_key" ON "User"("lineUid");
