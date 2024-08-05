import { hashPassword } from "@/utils/auth";
import { encryptData } from "@/utils/encrypt";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Col, Container, Input, Row } from "reactstrap";

export default function RecoverWallet() {
    const [step, setStep] = useState(1);
    const [seedPhrase, setSeedPhrase] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRecoverWallet = (e: any) => {
        setSeedPhrase(e.target.value);
    }

    const onRecoverWallet = () => {
        try {
            ethers.Wallet.fromPhrase(seedPhrase);
            setStep(2);
        } catch (err: any) {
            alert("Your seed phrase is incorrect!");
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (password === '') {
            alert("Password is empty");
        } else {
            const hashPass = hashPassword(password);
            const encryptedSeedPhrase: any = encryptData(seedPhrase, hashPass);
            localStorage.setItem('passwordHash', hashPass);
            localStorage.setItem('encryptedSeedPhrase', encryptedSeedPhrase);
            localStorage.setItem('walletInitialized', 'true');
            router.push('/wallet');
        }
    }

    if (step === 1) {
        return (
            <>
                <Container>
                    <Row className="mt-5">
                        <Col>
                            <h4>Recover your wallet</h4>
                            <hr />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-md-6">
                            <textarea onChange={handleRecoverWallet} className="form-control"></textarea>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Button color="primary" onClick={onRecoverWallet}>
                                Recover your wallet
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }

    return (
        <>
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
        </>
    );
}