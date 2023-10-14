export type categoryType = {
  catId: string,
  name: string,
  default: boolean
}

export type sortType = {
  id: string,
  name: string,
  default: boolean
}

export interface BooksList {
  kind: string,
  totalItems: number,
  items?:  any []
}

export interface BooksListItem {
  id: string,
  title: string,
  authors: string[] | null,
  categories?: string[] | null,
  imageLinks?:  string | null,
}

export interface Book {
  id: string,
  title: string,
  authors: string[] | null,
  categories?: string[] | null,
  description: string | null
  imageLinks:  string | null,
}