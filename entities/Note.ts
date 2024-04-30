export interface Note {
  slug: string;
  title: string;
  content: string;
  isDraft: boolean;
  createdAt: string;
}

export interface NoteVirtual extends Note {
  parsed: any;
}
