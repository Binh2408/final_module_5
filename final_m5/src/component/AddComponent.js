import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findAllCategory } from "../service/categoryService";
import { addBook } from "../service/bookService";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { Container, Button, Card, Row, Col } from "react-bootstrap";

function AddComponent() {
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategory = async () => {
      const data = await findAllCategory();
      setCategoryList(data);
    };
    fetchCategory();
  }, []);

  const [book] = useState({
    code: "",
    name: "",
    importDate: "",
    quantity: "",
    category: "",
  });

  const handleAdd = async (value) => {
    const newBook = {
      ...value,
      category: JSON.parse(value.category),
    };
    try {
      const result = await addBook(newBook);
      if (result) {
        toast.success("Add success");
        navigate("/list");
      } else {
        toast.error("Failed to add book. Please try again.");
      }
    } catch (error) {
      toast.error("Error while adding book.");
    }
    // await addBook(newBook);
    // toast.success("Add success");
    // navigate("/list");
  };

  const handleValidate = Yup.object({
    name: Yup.string()
      .required("Please input name")
      .max(100, "Less than 100 characters"),
    quantity: Yup.number()
      .min(1, "Greater than 0")
      .required("Quantity required")
      .integer("Must be is INTERGER"),
    category: Yup.string().required("Choose a category"),
    code: Yup.string()
      .required("Please input code")
      .matches(/^BO-[0-9]{4}$/, "Must be match BO-XXXX (with X is a number)"),
    importDate: Yup.date()
      .required("Please choose")
      .max(new Date(), "Must is in the past"),
  });
  return (
    <Container className="mt-4">
      <Card className="shadow-lg">
        <Card.Body>
          <Card.Title className="text-center mb-4">🛒 Add New Book</Card.Title>
          <Formik
            initialValues={book}
            onSubmit={handleAdd}
            validationSchema={handleValidate}
          >
            <Form>
              <Row className="mb-3">
                <Col>
                  <label className="form-label">Code</label>
                  <Field name="code" className="form-control" />
                  <ErrorMessage
                    name="code"
                    component="div"
                    className="text-danger"
                  />
                </Col>
                <Col>
                  <label className="form-label">Name</label>
                  <Field type="text" name="name" className="form-control" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <label className="form-label">Quantity</label>
                  <Field
                    type="number"
                    name="quantity"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="quantity"
                    component="div"
                    className="text-danger"
                  />
                </Col>
                <Col>
                  <label className="form-label">Date:</label>
                  <Field
                    type="date"
                    name="importDate"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="importDate"
                    component="div"
                    className="text-danger"
                  />
                </Col>
              </Row>

              <div className="mb-3">
                <label className="form-label">Category</label>
                <Field as="select" name="category" className="form-select">
                  <option value="">-- Select Category --</option>
                  {categoryList.map((cls, index) => (
                    <option key={index} value={JSON.stringify(cls)}>
                      {cls.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="d-flex justify-content-end gap-2">
                <Button variant="primary" type="submit">
                  Save
                </Button>
                <Button variant="secondary" onClick={() => navigate("/list")}>
                  Back
                </Button>
              </div>
            </Form>
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddComponent;
