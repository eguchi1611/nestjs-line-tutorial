"use client";

import { accessTokenAtom } from "@/atoms/accessTokenAtom";
import { useArticles } from "@/hooks/useArticles";
import { articlesApi } from "@/lib/api";
import { useRecoilValue } from "recoil";

export function Articles() {
  const { data: articles, mutate } = useArticles();

  const accessToken = useRecoilValue(accessTokenAtom);

  const handleUpdate = async () => {
    await articlesApi.articlesControllerUpdate(1, {
      title: "at " + new Date().toISOString(),
    });
    await mutate();
  };

  return (
    <div>
      <h2>Articles</h2>
      <p>Articles will be displayed here.</p>
      <p>Access Token: {accessToken}</p>
      <ul>
        {(articles || []).map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
      <button type="button" onClick={handleUpdate}>
        Update Article
      </button>
    </div>
  );
}
