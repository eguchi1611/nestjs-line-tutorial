import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      lineUid: "U8189cf6745fc0d808977bdb0b9f22991",
      comment: "Hello, World!",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      lineUid: "U8189cf6745fc0d808977bdb0b9f22992",
      comment: "Oh, Hi!",
    },
  });

  const user3 = await prisma.user.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      lineUid: "U8189cf6745fc0d808977bdb0b9f22993",
      comment: "Hey, There!",
    },
  });

  console.log({ user1, user2, user3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
