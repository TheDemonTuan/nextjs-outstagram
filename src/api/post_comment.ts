export interface PostComment {
  id: string;
  post_id: string;
  user_id: string;
  parent_id: string;
  content: string;
  active: boolean;
  children: null;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}