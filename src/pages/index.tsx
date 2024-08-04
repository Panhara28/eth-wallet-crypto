import Link from "next/link";
import { Col, Container, Row } from "reactstrap";

export default function Home() {
  return (
    <>
      <Container>
        <Row >
          <Col>
            <div  className="mx-auto d-flex align-items-center justify-content-center flex-column" style={{  height: "100vh"}}>
              <p>Create at your own risk</p>
              <Link href="/create-password" className="btn btn-primary">
                Create Wallet
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
