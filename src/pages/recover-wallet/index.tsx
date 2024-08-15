import { hashPassword } from "@/utils/auth";
import { encryptData } from "@/utils/encrypt";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { Alert, Button, Col, Container, Input, Row } from "reactstrap";
import Image from "next/image";

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
                        <Col>
                            <Alert color="warning">
                                <BsFillExclamationCircleFill style={{ color: "#000", fontSize: 16 }} /> Type your seed phrase in the field below to recover your wallet (it
                                should include 12 words seperated with spaces)
                            </Alert>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <textarea onChange={handleRecoverWallet}></textarea>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <Button onClick={onRecoverWallet} className="tf-btn primary md mt-3" disabled={
                                seedPhrase?.split(" ").length !== 12 || seedPhrase?.slice(-1) === " "
                            }>Recover wallet</Button>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }

    return (
        <>
            <Container>
                <div className="banner-boarding2 mt-20">
                    <Image src="/boarding3.jpg" alt="img" width={358} height={291} />
                    <svg xmlns="http://www.w3.org/2000/svg" width="375" height="335" viewBox="0 0 381 335" fill="none">
                        <g opacity="0.8" filter="url(#filter0_f_1_12068)">
                            <path d="M269.131 167.427C182.034 233.37 239.606 233.37 203.186 233.37C166.765 233.37 237.195 246.642 137.241 167.427C37.2862 88.2118 166.765 101.483 203.186 101.483C239.606 101.483 356.228 101.483 269.131 167.427Z" fill="url(#paint0_linear_1_12068)"></path>
                        </g>
                        <defs>
                            <filter id="filter0_f_1_12068" x="0.106079" y="0.647461" width="400.637" height="333.559" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                                <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_1_12068"></feGaussianBlur>
                            </filter>
                            <linearGradient id="paint0_linear_1_12068" x1="275.664" y1="100.647" x2="193.485" y2="267.1" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#E250E5"></stop>
                                <stop offset="1" stop-color="#4B50E6"></stop>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
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
                        <Button className="tf-btn primary md mt-3" onClick={handleSubmit}>
                            Create
                        </Button>
                    </Col>
                </Row>
            </Container>

        </>
    );
}