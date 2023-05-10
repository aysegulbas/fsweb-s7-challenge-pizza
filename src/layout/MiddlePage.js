import React, { useEffect, useState } from "react";
import "./MiddlePage.css";
import * as yup from "yup";
import {
  Col,
  Row,
  Input,
  Label,
  FormGroup,
  ButtonToolbar,
  ButtonGroup,
  Button,
  Form,
} from "reactstrap";
import Hesaplama from "../Components/Hesaplama";

const initialValues = {
  boyut: "",
  hamur: "",
  secenekler: [],
  instructions: "",
  adet: 1,
  ücret: 85.5,
  ekSecim: "",
  rate: 8.9,
  comments: 200,
};
const secenekler = [
  "pepperoni",
  "sosis",
  "Jambon",
  "Tavuk",
  "soğan",
  "domates",
  "mısır",
  "sucuk",
  "jalepeno",
  "sarımsak",
  "biber",
  "kabak",
  "salam",
];
const initialErrors = {
  isim: "",
  boyut: "",
  hamur: "",
  secenekler: [],
  instructions: "",
};

const MiddlePage = () => {
  const [data, setData] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [submit, setSubmit] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [price, setPrice] = useState(data.ücret);
  const [counter, setCounter] = useState(1);
  const [malzemeSayısı, setMalzemeSayısı] = useState(0);
  const ekSecim = 5;

  const onSubmit = (event) => {
    event.preventDefault();
    submit();
  };

  const schema = yup.object().shape({
    isim: yup
      .string()
      .required("bu alanı doldurmak zorunludur.")
      .min(2, "isim en az 2 karakter olmalıdır"),
    boyut: yup
      .mixed()
      .oneOf(["Küçük", "Orta", "Büyük"], "Bir tanesini seçmelisiniz.")
      .required("Seçim yapınız"),
    hamur: yup
      .mixed()
      .oneOf(["ince", "orta", "kalın"], "Bir tanesini seçmelisiniz."),
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    yup
      .reach(schema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({ ...errors, [e.target.name]: "" });
        console.log("test", errors);
      })
      .catch((err) => {
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
        console.log("test", errors);
      });
  };
  useEffect(() => {
    schema.isValid(data).then((valid) => setDisabled(!valid));
    console.log("test", errors);
  }, [data]);

  const kontrol = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked });
    if (e.target.checked === true) {
      setMalzemeSayısı(malzemeSayısı + 1);
      setPrice(price + ekSecim);
    } else {
      setMalzemeSayısı(malzemeSayısı - 1);
      setPrice(price - ekSecim);
    }
  };

  return (
    <div className="main-container">
      <Form onSubmit={onSubmit}>
        <div className="header-container">
          <h1>HEADER</h1>
        </div>

        <Row className="justify-content-center">
          <Col xs="6">
            <Row>
              <Col>
                <h1>Absolute</h1>
              </Col>
            </Row>
            <Row className="m-auto">
              <Col xs="6">
                <span>{data.ücret} TL</span>{" "}
              </Col>
              <Col>
                <h5>{data.rate}</h5>
              </Col>
              <Col>
                <h5>({data.comments})</h5>
              </Col>
            </Row>
            <Row>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </Row>
            <Row>
              <Col>
                <h3>Boyut Seç</h3>
              </Col>
              <Col>
                <h3>Hamur Seç</h3>
              </Col>
            </Row>
            <Row>
              <Col className="flex-column">
                <Row>
                  <label htmlFor="size-dropdown">
                    <input
                      type="radio"
                      name="boyut"
                      id="size-dropdown"
                      value="Küçük"
                      invalid={errors.name}
                      onChange={changeHandler}
                    />{" "}
                    Küçük
                  </label>

                  <label htmlFor="size-dropdown">
                    <input
                      type="radio"
                      name="boyut"
                      id="size-dropdown"
                      value="Orta"
                      invalid={errors.name}
                      onChange={changeHandler}
                    />{" "}
                    Orta
                  </label>

                  <label htmlFor="size-dropdown">
                    <input
                      type="radio"
                      name="boyut"
                      id="size-dropdown"
                      value="Büyük"
                      invalid={errors.name}
                      onChange={changeHandler}
                    />{" "}
                    Büyük
                  </label>
                </Row>
              </Col>
              <Col>
                <FormGroup>
                  <Label htmlFor="dough-dropdown"></Label>

                  <Input
                    id="dough-dropdown"
                    name="hamur"
                    type="select"
                    value={data.hamur}
                    invalid={errors.hamur}
                    onChange={changeHandler}
                  >
                    <option disabled>hamur Seç</option>
                    <option value="ince">ince</option>
                    <option value="orta">orta</option>
                    <option value="kalın">kalın</option>
                  </Input>
                  {errors.hamur && <div>{errors.hamur}</div>}
                </FormGroup>
              </Col>
            </Row>
            <br></br>
            <Row>
              <h3>Ek Malzemeler</h3>
            </Row>
            <Row>
              <p>En Fazla 10 malzeme seçebilirsiniz. 5tl</p>
            </Row>
            <Row>
              <Col>
                {secenekler.slice(0, 5).map((e, index) => {
                  return (
                    <div key={index}>
                      <Input type="checkbox" name={e} onChange={kontrol} />

                      <Label check>{e} </Label>
                    </div>
                  );
                })}
              </Col>
              <Col>
                {secenekler.slice(5, 10).map((e, index) => {
                  return (
                    <div key={index}>
                      <Input type="checkbox" name={e} onChange={kontrol} />

                      <Label check>{e} </Label>
                    </div>
                  );
                })}
              </Col>
              <Col>
                {secenekler.slice(10, 14).map((e, index) => {
                  return (
                    <div key={index}>
                      <Input type="checkbox" name={e} onChange={kontrol} />

                      <Label check>{e} </Label>
                    </div>
                  );
                })}
              </Col>
            </Row>

            <Row>
              <FormGroup>
                <Label for="Name">İsim Bilgileri</Label>

                <Input id="Name" name="isim" type="text" />
                {errors.isim && <div>{errors.isim}</div>}
              </FormGroup>
              <FormGroup>
                <Label for="instruction">Sipariş Notu</Label>

                <Input id="instruction" name="text" type="textarea" />
                <hr />
              </FormGroup>
              <Col xs="4">
                <ButtonToolbar>
                  <ButtonGroup>
                    <Button
                      color="warning"
                      onClick={() => {
                        if (counter >= 1) setCounter(counter - 1);
                        if (counter <= 1) setCounter(1);
                      }}
                    >
                      -
                    </Button>{" "}
                    <Input id="count" type="number" value={counter} />{" "}
                    <Button
                      color="warning"
                      onClick={() => setCounter(counter + 1)}
                    >
                      +
                    </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Col>
              <Col>
                <Hesaplama
                  counter={counter}
                  price={price}
                  malzemeSayısı={malzemeSayısı}
                  ekSecim={ekSecim}
                  disabled={disabled}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default MiddlePage;
