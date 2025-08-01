import axios from "axios";

export async function findAllBook() {
    try {
        const response = await axios.get("http://localhost:8080/books");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function addBook(book) {
    try {
        const response = await axios.post("http://localhost:8080/books1",book);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function findBookById(id) {
    try {
        const response = await axios.get("http://localhost:8080/books/"+id);
        return response.data;
    } catch (error) {
        console.log(error);
        
    }
}

export async function search(searchName, searchCate, page, size) {
  let url = `http://localhost:8080/books?_sort=quantity&_order=desc&name_like=${searchName}&_page=${page}&_limit=${size}`;

  if (searchCate !== "") {
    url += `&category.id=${searchCate}`;
  }

  try {
    const response = await axios.get(url);
    const data = response.data;
    const totalRecord = response.headers['x-total-count'];
    return { data, totalRecord };
  } catch (error) {
    console.log(error);
  }
}