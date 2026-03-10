export type Snippet = {
  id: string;
  user_id: string;
  title: string;
  language: string;
  code_content: string;
  is_public: boolean;
  is_favorite: boolean;
  tags: string[];
  created_at: string;
};
