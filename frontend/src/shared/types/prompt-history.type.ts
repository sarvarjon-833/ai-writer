export type TPromptLink = {
  title: string;
  url: string;
};

export type TPromptHistory = {
  date: string;
  links: TPromptLink[];
};

export interface IContentItem {
  _id: string;
  title: string;
  description: string;
  aiResponse: string;
  user: string;
  createdAt: string;
}
