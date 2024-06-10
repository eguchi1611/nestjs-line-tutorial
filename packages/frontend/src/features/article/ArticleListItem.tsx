import { ArticleEntity } from "@nestjs-line-tutorial/api-client";

interface Props {
  article: ArticleEntity;
}

export function ArticleListItem({ article }: Props) {
  return (
    <div>
      <pre>{JSON.stringify(article, null, 2)}</pre>
    </div>
  );
}
