export interface Note {
  slug: string
  title: string
  content: string
  viewCount: number
  likeCount: number
  isDraft: boolean
  createdAt: string
}

export interface NoteVirtual extends Note {
  parsed: any
}
