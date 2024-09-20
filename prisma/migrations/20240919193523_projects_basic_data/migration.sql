-- CreateTable
CREATE TABLE "Projects" (
    "uuid" UUID NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "ProjectEvents" (
    "uuid" UUID NOT NULL,
    "projectUuid" UUID NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "ProjectEvents_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "ProjectEvents" ADD CONSTRAINT "ProjectEvents_projectUuid_fkey" FOREIGN KEY ("projectUuid") REFERENCES "Projects"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
