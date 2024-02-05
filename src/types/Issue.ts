export interface Issue {
  node_id: number;
  number: number;
  title: string;
  created_at: string;
  state: string;
  assignee: { login: string } | null;
  comments: number;
  author_association: string;
}