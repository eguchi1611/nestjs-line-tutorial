import { useAuth } from "@/features/auth/hooks/useAuth";
import { articlesApi } from "@/lib/api";
import { ArticleWithUserEntity } from "@nestjs-line-tutorial/api-client";
import useSWR from "swr";
const fetcher = async () =>
  articlesApi.articlesControllerFindAll().then((res) => res.data);

export function useArticles() {
  const { isAuthenticated } = useAuth();
  return useSWR<ArticleWithUserEntity[]>(
    isAuthenticated ? "articles" : null,
    fetcher,
  );
}
