import { useArticles } from "@/hooks/useArticles";
import { articlesApi } from "@/lib/api";
import { Box, Button, Paper, Stack } from "@mui/material";
import { ArticleWithUserEntity } from "@nestjs-line-tutorial/api-client";
import { useState } from "react";
import { useAuth } from "../auth/hooks/useAuth";
import { ArticleEditDialog } from "./ArticleEditDialog";

interface Props {
  article: ArticleWithUserEntity;
}

export function ArticleListItem({ article }: Props) {
  const { userId } = useAuth();
  const { mutate } = useArticles();

  const handleDelete = async (articleId: number) => {
    await articlesApi.articlesControllerRemove(articleId);
    mutate();
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <Paper sx={{ padding: 2 }}>
      <Box typography="h6">{article.title}</Box>
      <Box>{article.content}</Box>
      <Stack direction="row-reverse" spacing={1} alignItems="center">
        {userId === article.authorId && (
          <>
            <Button color="error" onClick={() => handleDelete(article.id)}>
              削除
            </Button>
            <Button onClick={() => setOpen(true)}>編集</Button>
            <ArticleEditDialog
              open={open}
              handleClose={handleClose}
              article={article}
            />
          </>
        )}
      </Stack>
    </Paper>
  );
}
