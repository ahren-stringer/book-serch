import { Book, BooksList, BooksListItem } from "../types/types";

export async function search(searchStr: string, category: string | null, sort: string, pageNumber: number, paginationStep: number): Promise<BooksList | undefined> {

        const base_url = 'https://www.googleapis.com/books/v1/volumes?key=AIzaSyCnuQN1Tye6GbxO7V44xXaS2Syv2lWX_aA';

        let categoryStr: string = '';
        if (category) {
            categoryStr = `+subject:${category}`
        }
    
        let response = await fetch(`${base_url}&q=+intitle:${searchStr}${categoryStr}&orderBy=${sort}&startIndex=${pageNumber}&maxResults=${paginationStep}`)
        let result: BooksList = await response.json()

        if (result.items) {
            result.items = result.items.map(item => {
                
                let requiredfills: BooksListItem = {
                    id: item.id,
                    title: item.volumeInfo.title,
                    authors: item.volumeInfo.authors ? item.volumeInfo.authors : null,
                    categories: item.volumeInfo.categories ? item.volumeInfo.categories : null,
                    imageLinks: item.volumeInfo.imageLinks 
                    ? item.volumeInfo.imageLinks.thumbnail ? item.volumeInfo.imageLinks.thumbnail
                    : item.volumeInfo.imageLinks.smallThumbnail ? item.volumeInfo.imageLinks.smallThumbnail
                    : null
                    : null 
                };
                return requiredfills
    
            })
        }

        return result
}

export async function getOne(id: string) {

        let response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyCnuQN1Tye6GbxO7V44xXaS2Syv2lWX_aA`)
        let result = await response.json()

        let requiredfills: Book = {
            id: result.id,
            title: result.volumeInfo.title,
            authors: result.volumeInfo.authors ? result.volumeInfo.authors : null,
            categories: result.volumeInfo.categories ? result.volumeInfo.categories : null,
            description: result.volumeInfo.description ? result.volumeInfo.description : null,
            imageLinks: result.volumeInfo.imageLinks 
            ? result.volumeInfo.imageLinks.medium ? result.volumeInfo.imageLinks.medium 
            : result.volumeInfo.imageLinks.small ? result.volumeInfo.imageLinks.small
            : result.volumeInfo.imageLinks.large ? result.volumeInfo.imageLinks.large
            : result.volumeInfo.imageLinks.extraLarge ? result.volumeInfo.imageLinks.extraLarge
            : result.volumeInfo.imageLinks.large ? result.volumeInfo.imageLinks.large
            : result.volumeInfo.imageLinks.thumbnail ? result.volumeInfo.imageLinks.thumbnail
            : result.volumeInfo.imageLinks.smallThumbnail ? result.volumeInfo.imageLinks.smallThumbnail
            : null
            : null 
        };
           
        return requiredfills

}