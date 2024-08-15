import { decryptData } from "@/utils/encrypt";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Col, Container, Input, Row } from "reactstrap";
import Image from "next/image";
export default function ConfirmSeedPhrase() {
    const [seedPhrase, setSeedPhrase] = useState([]);
    const [missingWords, setMissingWords]: any = useState([]);
    const [userInput, setUserInput]: any = useState({});
    const router = useRouter();

    useEffect(() => {
        const encryptedSeedPhrase = localStorage.getItem('encryptedSeedPhrase');
        const password = localStorage.getItem('passwordHash');
        if (encryptedSeedPhrase && password) {
            const decryptedSeedPhrase = decryptData(encryptedSeedPhrase, password);
            const words: any = decryptedSeedPhrase.split(' ');
            setSeedPhrase(words);
            setMissingWords([2, 3, 7]); // indices 3, 4, 8 in 1-based indexing
        }
    }, []);

    const handleConfirm = () => {
        const isCorrect = missingWords.every((index: number) =>
            userInput[index] === seedPhrase[index]
        );
        if (isCorrect) {
            localStorage.setItem('walletInitialized', 'true');
            router.push('/wallet');
        } else {
            alert('Incorrect words. Please try again.');
        }
    };

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
                        <h4>Confirm Seed Phrase</h4>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            {seedPhrase.map((word, index) => (
                                <Col md={3} xs={4} key={index}>
                                    {missingWords.includes(index) ? (
                                        <>
                                            <div className="d-flex align-items-center">
                                                <span className="me-2">{index + 1}</span>
                                                <Input
                                                    className="mt-2"
                                                    type="text"
                                                    onChange={(e) => setUserInput({ ...userInput, [index]: e.target.value })}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <span>{index + 1} {word}</span>
                                    )}
                                </Col>
                            ))}
                        </Row>

                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <Button color="primary" onClick={handleConfirm}>Confirm</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}