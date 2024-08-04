import { getAddressFromSeedPhrase } from "@/utils/crypto";
import { decryptData } from "@/utils/encrypt";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";

export default function Wallet(){

    const [address, setAddress] = useState('');

    useEffect(() => {
        const loadAddress = async () => {
        try {
            const encryptedSeedPhrase = localStorage.getItem('encryptedSeedPhrase');
            const password = localStorage.getItem('passwordHash');
            
            if (encryptedSeedPhrase && password) {
            const decryptedSeedPhrase = decryptData(encryptedSeedPhrase, password).replace(/"/g, '');
            const derivedAddress = getAddressFromSeedPhrase(decryptedSeedPhrase);
            setAddress(derivedAddress);
            }
        } catch (error) {
            console.error('Error loading address:', error);
            // Handle the error appropriately
        }
        };

        loadAddress();
    }, [])
    
    return(
        <>
            <Container>
                <Row className="mt-5">
                    <Col>
                        <h4>Your Wallet</h4>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Address: {address}</p>
                    </Col>
                </Row>
            </Container>
        </>
    )
}