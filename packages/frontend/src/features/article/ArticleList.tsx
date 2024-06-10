"use client";

import { useArticles } from "@/hooks/useArticles";
import { Stack } from "@mui/material";
import { ArticleListItem } from "./ArticleListItem";

export function ArticleList() {
  const { data: articles } = useArticles();

  return (
    <div>
      <h2>Articles</h2>
      <Stack spacing={2}>
        {(articles || [])
          .sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
          )
          .map((article) => (
            <ArticleListItem key={article.id} article={article} />
          ))}
      </Stack>
    </div>
  );
}
