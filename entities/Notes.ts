export interface Note {
  slug: string;
  title: string;
  content: string;
  isDraft?: boolean;
  createdAt: number;
}

export interface NoteVirtual extends Note {
  parsed: object;
}
