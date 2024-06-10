"use client";

import { useArticles } from "@/hooks/useArticles";
import { articlesApi } from "@/lib/api";
import { ArticleListItem } from "./ArticleListItem";

export function ArticleList() {
  const { data: articles, mutate } = useArticles();

  const handleUpdate = async () => {
    await articlesApi.articlesControllerUpdate(1, {
      title: "at " + new Date().toISOString(),
    });
    await mutate();
  };

  return (
    <div>
      <h2>Articles</h2>
      <div>
        {articles?.map((article) => (
          <ArticleListItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
