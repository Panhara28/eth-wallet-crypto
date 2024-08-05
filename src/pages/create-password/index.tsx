import { hashPassword } from "@/utils/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Col, Container, Input, Row } from "reactstrap";

export default function CreatePassword() {
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (password === '') {
            alert("Password is empty");
        } else {
            localStorage.setItem('passwordHash', hashPassword(password));
            router.push('/secure-wallet');
        }
    }

    return (
        <>
            <Container>
                <Row className="mt-5">
                    <Col>
                        <h4>Create Password</h4>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Input placeholder="Password" type="password" onChange={(e: any) => setPassword(e.target.value)} required />
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <Button color="primary" onClick={handleSubmit}>
                            Create
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}