import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const post1 = await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: "Post 1",
      content: "Content 1",
      published: true,
    },
  });
  const post2 = await prisma.post.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      title: "Post 2",
      content: "Content 2",
      published: false,
    },
  });
  const post3 = await prisma.post.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      title: "Post 3",
      content: "Content 3",
      published: true,
    },
  });
  console.log({ post1, post2, post3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
