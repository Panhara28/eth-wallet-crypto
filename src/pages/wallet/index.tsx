import ApplicationLayout from "@/components/ApplicationLayout";
import { getAddressFromSeedPhrase } from "@/utils/crypto";
import { decryptData } from "@/utils/encrypt";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";

export default function Wallet() {
    const [balance, setBalance] = useState('');
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

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

    useEffect(() => {
        const initializeWallet = async () => {
            const isInitialized = localStorage.getItem('walletInitialized');
            if (!isInitialized) {
                router.push('/');
                return;
            }

            const storedAddress = localStorage.getItem('walletAddress');
            if (storedAddress) {
                setAddress(storedAddress);
                await fetchBalance(storedAddress);
            }

            setIsLoading(false);
        };

        initializeWallet();
    }, []);

    const fetchBalance = async (address: any) => {
        // try {
        //     const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
        //     const balanceWei = await provider.getBalance(address);
        //     const balanceEth = ethers.utils.formatEther(balanceWei);
        //     setBalance(balanceEth);
        // } catch (error) {
        //     console.error('Error fetching balance:', error);
        //     setBalance('Error');
        // }
    };

    return (
        <>
            <ApplicationLayout>
                <Container>
                    <Row className="mt-3">
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
            </ApplicationLayout>
        </>
    )
}