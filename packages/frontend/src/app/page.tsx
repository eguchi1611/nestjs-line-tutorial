import { Layout } from "@/components/Layout";
import { ArticleController } from "@/features/article/ArticleController";
import { ArticleList } from "@/features/article/ArticleList";

export default async function IndexPage() {
  return (
    <Layout>
      <h1>nestjs-line-tutorial</h1>
      <ArticleController />
      <ArticleList />
    </Layout>
  );
}
