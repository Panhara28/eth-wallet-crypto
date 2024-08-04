import { decryptData } from "@/utils/encrypt";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Col, Container, Input, Row } from "reactstrap";

export default function ConfirmSeedPhrase(){
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

    return(
        <>
            <Container>
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
                        <Col md={3} key={index}>
                        {missingWords.includes(index) ? (
                            <>
                                <div className="d-flex align-items-center">
                                <span className="me-2">{index + 1}</span>
                                <Input 
                                    className="mt-2"
                                    type="text" 
                                    onChange={(e) => setUserInput({...userInput, [index]: e.target.value})}
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
                <Row className="mt-4">
                    <Col>
                        <Button color="primary" onClick={handleConfirm}>Confirm</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}