import { encryptData } from "@/utils/encrypt";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";
import { Alert, Button, Col, Container, Row } from "reactstrap";
import Image from 'next/image';
import { BiAlarmExclamation } from "react-icons/bi";

export default function SecureWallet() {
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
        if (!password) {
            alert("Password not found. Please create password first");
            router.push('/create-password');
            return;
        }

        const encryptedSeedPhrase = encryptData(seedPhrase, password);
        localStorage.setItem('encryptedSeedPhrase', encryptedSeedPhrase);
        router.push('/confirm-seed-phrase')

    }

    const seedPhraseList = seedPhrase.split(' ');
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
                        <h4>Secure Wallet</h4>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Alert color="warning">
                            <BiAlarmExclamation style={{ color: "#000", fontSize: "20px" }} /> Once you generate seed phrase, you have to save it securly in order to recover your wallet!
                        </Alert>
                    </Col>
                </Row>
                {
                    showSeedPhrase && (
                        <>
                            <Row>
                                <Col>
                                    <div className="d-flex flex-wrap">
                                        {
                                            seedPhraseList.map((item: any, index: number) => {
                                                return (
                                                    <>
                                                        <span style={{ padding: 15, background: "#fff", marginLeft: 15, borderRadius: "10px", marginBottom: 10 }}>
                                                            {item}
                                                        </span>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
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