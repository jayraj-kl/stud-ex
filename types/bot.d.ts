export type Bot = {
  id: string;
  name: string;
  subject: string;
  description: string;
  resources: string;
  pdfPath: string;
  imagePath: string | null;
  indexName: string;
  createdAt: Date;
  updatedAt: Date;
};
