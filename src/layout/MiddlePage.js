import React, { useEffect, useState } from "react";
import "./MiddlePage.css";
import * as yup from "yup";
import axios from "axios";
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
import { useHistory, NavLink } from "react-router-dom";

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
  const navigate = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    // submit();
    axios.post("https://reqres.in/api/orders", data).then((response) => {
      navigate.push("/order");
    });
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
    e.target.name !== "instructions" &&
      yup
        .reach(schema, e.target.name)
        .ate(e.target.value)
        .then(() => {
          setErrors({ ...errors, [e.target.name]: "" });
          console.log("test", errors);
        })
        .catch((err) => {
          setErrors({ ...errors, [e.target.name]: err.errors[0] });
          console.log("test", errors);
        });
  };
  useEffect(() => {
    schema.is(data).then(() => setDisabled(!));
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
        <div className="home-container">
          <img className="logo" src="./logo.svg" alt="teknolojik yemekler" />
          <Row className="justify-content-center p-1" xs="6">
            <NavLink to="/">Anasayfa</NavLink>

            <NavLink to="/pizza">Seçenekler</NavLink>

            <NavLink id="order-pizza" className="links" to="/pizza">
              Sipariş oluştur
            </NavLink>
          </Row>
        </div>

        <Row className="justify-content-center">
          <Col xs="6">
            <Row>
              <Col>
                <h1 className="fs-2 fw-bold pt-3 pb-3">
                  Position Absolute Acı Pizza
                </h1>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <span className="fs-4 fw-bold">{data.ücret} TL</span>
              </Col>
              <Col>
                <span className="fs-6 float-end">{data.rate}</span>
              </Col>
              <Col>
                <span className="fs-6 float-end">({data.comments})</span>
              </Col>
            </Row>
            <Row>
              <p className="pt-3">
                Frontend Dev olarak hala position:absolute kullanıyorsan bu çok
                acı pizza tam sana göre.Pizza, domates, peynir ve genellikle
                çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel
                olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen,
                genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan
                oluşanİtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya
                bazen pizetta denir.
              </p>
            </Row>
            <Row>
              <Col className="fs-5 fw-bold p-3" xs="8">
                <h3>Boyut Seç</h3>
              </Col>
              <Col className="fs-5 fw-bold p-3">
                <h3 className="float-end">Hamur Seç</h3>
              </Col>
            </Row>
            <Row>
              <Col className="flex-column">
                <Row className="mb-3">
                  <Label htmlFor="size-dropdown">
                    <input
                      type="radio"
                      name="boyut"
                      id="size-dropdown"
                      value="Küçük"
                      onChange={changeHandler}
                    />
                    Küçük
                  </Label>

                  <Label htmlFor="size-dropdown">
                    <input
                      type="radio"
                      name="boyut"
                      id="size-dropdown"
                      value="Orta"
                      onChange={changeHandler}
                    />
                    Orta
                  </Label>

                  <Label htmlFor="size-dropdown">
                    <input
                      type="radio"
                      name="boyut"
                      id="size-dropdown"
                      value="Büyük"
                      onChange={changeHandler}
                    />
                    Büyük
                  </Label>
                </Row>
              </Col>
              <Col>
                <FormGroup className="float-end">
                  <label>
                    <select
                      id="dough-dropdown"
                      name="hamur"
                      value={data.hamur}
                      defaultValue="none"
                      onChange={changeHandler}
                    >
                      <option value="none">Hamur Kalınlığı:</option>
                      <option value="ince">ince</option>
                      <option value="orta">orta</option>
                      <option value="kalın">kalın</option>
                    </select>
                  </label>

                  {errors.hamur && <div>{errors.hamur}</div>}
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col className="fs-5 fw-bold p-3" xs="6">
                <h3>Ek Malzemeler</h3>
              </Col>
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
              <Col className="float-end">
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
              <FormGroup className="fs-5 fw-bold pt-5">
                <Label className="" htmlFor="isim">
                  <h3>İsim Bilgileri</h3>
                </Label>

                <Input
                  id="Name"
                  name="isim"
                  type="text"
                  value={data.isim}
                  onChange={changeHandler}
                />
                {errors.isim && <div>{errors.isim}</div>}
              </FormGroup>
              <FormGroup className="fs-5 fw-bold pt-3">
                <Label for="instructions">
                  <h3>Sipariş Notu</h3>
                </Label>

                <Input
                  id="instructions"
                  name="instructions"
                  type="textarea"
                  value={data.instructions}
                  onChange={changeHandler}
                />
                <hr />
              </FormGroup>
            </Row>
            <Row>
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
                    </Button>
                    {counter}
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
