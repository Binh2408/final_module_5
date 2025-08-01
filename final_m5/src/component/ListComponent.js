import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Pagination } from "react-bootstrap";
import { search } from "../service/bookService";
import SearchComponent from "./SearchComponent";
import { findAllCategory } from "../service/categoryService";

function ListComponent() {
  const [bookList, setBookList] = useState({});
  const [searchName, setSearchName] = useState("");
  const [selectedCate, setSelectedCate] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [size, setSize] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      const { data, totalRecord } = await search(
        searchName,
        selectedCate,
        page,
        size
      );
      setBookList(data);
      setTotalPage(() => Math.ceil(totalRecord / size));
    };
    fetchData();
  }, [searchName, selectedCate, page, size]);
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      const data = await findAllCategory();
      setCategoryList(data);
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchName, selectedCate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const handlePre = () => {
    if (page > 1) {
      setPage((pre) => pre - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPage) {
      setPage((pre) => pre + 1);
    }
  };
  return (
    <Container className="mt-4">
      <h2 className="mb-3">Book List</h2>
      <SearchComponent
        searchName={searchName}
        setSearchName={setSearchName}
        categoryList={categoryList}
        selectedCate={selectedCate}
        setSelectedCate={setSelectedCate}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Code</th>
            <th>Name</th>
            <th>Date</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {bookList.length > 0 ? (
            bookList.map((book, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{book.code}</td>
                <td>{book.name}</td>
                <td>{formatDate(book.importDate)}</td>
                <td>{book.quantity}</td>
                <td>{book.category?.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center text-danger">
                Not found books
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev disabled={page === 1} onClick={handlePre}>
          Previous
        </Pagination.Prev>
        {[...Array(totalPage)].map((e, i) => (
          <Pagination.Item
            key={i}
            active={i + 1 === page}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next disabled={page === totalPage} onClick={handleNext}>
          Next
        </Pagination.Next>
      </Pagination>
    </Container>
  );
}

export default ListComponent;
