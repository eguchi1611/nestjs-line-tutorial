import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      lineUid: "sample-user-1",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      lineUid: "sample-user-2",
    },
  });

  console.log({ user1, user2 });

  const article1 = await prisma.article.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      authorId: user1.id,
      title: "sample-article-1",
      content: "sample-content-1",
    },
  });

  const article2 = await prisma.article.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      authorId: user1.id,
      title: "sample-article-2",
      content: "sample-content-2",
    },
  });

  const article3 = await prisma.article.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      authorId: user2.id,
      title: "sample-article-3",
      content: "sample-content-3",
    },
  });

  console.log({ article1, article2, article3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
