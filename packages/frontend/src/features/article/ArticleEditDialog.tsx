import { useArticles } from "@/hooks/useArticles";
import { articlesApi } from "@/lib/api";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { ArticleWithUserEntity } from "@nestjs-line-tutorial/api-client";
import { useRef } from "react";

interface Props {
  open: boolean;
  article: ArticleWithUserEntity;
  handleClose: () => void;
}

export function ArticleEditDialog({ handleClose, open, article }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const { mutate } = useArticles();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    await articlesApi.articlesControllerUpdate(article.id, { title, content });
    await mutate();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={false} fullWidth>
      <DialogTitle>編集</DialogTitle>
      <DialogContent>
        <Stack
          spacing={2}
          pt={2}
          component="form"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <TextField
            name="title"
            label="タイトル"
            fullWidth
            defaultValue={article.title}
          />
          <TextField
            name="content"
            label="内容"
            fullWidth
            multiline
            defaultValue={article.content}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>閉じる</Button>
        <Button
          color="primary"
          onClick={() => {
            formRef.current?.requestSubmit();
          }}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
}
