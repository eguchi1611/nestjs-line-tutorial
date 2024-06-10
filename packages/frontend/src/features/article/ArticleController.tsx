"use client";

import { useArticles } from "@/hooks/useArticles";
import { articlesApi } from "@/lib/api";
import { Box, Button } from "@mui/material";

export function ArticleController() {
  const { mutate } = useArticles();

  const handleAdd = async () => {
    await articlesApi.articlesControllerCreate({
      title: "Notitle",
      content: "",
    });
    mutate();
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleAdd}>
        追加
      </Button>
    </Box>
  );
}
