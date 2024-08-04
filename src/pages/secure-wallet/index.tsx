import { encryptData } from "@/utils/encrypt";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";

export default function SecureWallet(){
    const [seedPhrase, setSeedPhrase]: any = useState('');
    const [showSeedPhrase, setShowSeedPhrase] = useState(false);
    const router = useRouter();

    const generateSeedPhrase = () => {
        const wallet = ethers.Wallet.createRandom();
        return wallet.mnemonic?.phrase;
    }

    useState(() => {
        setSeedPhrase(generateSeedPhrase());
    });

    const handleReveal = () => {
        setShowSeedPhrase(true);
    }

    const handleNext = () => {
        const password = localStorage.getItem('passwordHash');
        if(!password){
            alert("Password not found. Please create password first");
            router.push('/create-password');
            return;
        }

        const encryptedSeedPhrase = encryptData(seedPhrase, password);
        localStorage.setItem('encryptedSeedPhrase', encryptedSeedPhrase);
        router.push('/confirm-seed-phrase')

    }

    return(
        <>
            <Container>
                <Row className="mt-5">
                    <Col>
                        <h4>Secure Wallet</h4>
                        <hr />
                    </Col>
                </Row>
                {
                    showSeedPhrase && (
                        <>
                            <Row>
                                <Col>
                                    <p>
                                        {seedPhrase}
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button color="primary" onClick={handleNext}>Next</Button>
                                </Col>
                            </Row>
                        </>
                    )
                }
                {
                    !showSeedPhrase && (
                        <>
                            <Row>
                                <Col>
                                    <Button color="primary" onClick={handleReveal}>
                                        Reveal Seed Phrase
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    )
                }
            </Container>
        </>
    )
}