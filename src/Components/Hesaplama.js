import React from "react";
import { Button, Col, Row } from "reactstrap";

const Hesaplama = ({
  ekSecim,
  counter,
  price,
  malzemeSayısı,
  disabled,
  siparisGonder,
}) => {
  const ekTutar = ekSecim * malzemeSayısı * counter;
  const toplamTutar = price * counter;

  return (
    <Row className="border border-grey rounded-2">
      <Row>
        <h5>Sipariş Toplamı</h5>
      </Row>
      <Row>
        <Col>Seçimler</Col>
        <Col>{ekTutar}</Col>
      </Row>
      <Row>
        <Col>Toplam</Col>
        <Col>{toplamTutar}</Col>
      </Row>

      <Button disabled={disabled} color="warning">
        Sipariş Ver
      </Button>
    </Row>
  );
};
export default Hesaplama;
