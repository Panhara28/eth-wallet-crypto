import ApplicationLayout from "@/components/ApplicationLayout";
import NetworkSelect from "@/components/NetworkSelect";
import { formatEth } from "@/functions/formatEth";
import TokenScreen from "@/screens/TokenScreen";
import { getAddressFromSeedPhrase } from "@/utils/crypto";
import { decryptData } from "@/utils/encrypt";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiDollarCircle, BiDownload, BiLogOutCircle, BiSend, BiWallet } from "react-icons/bi";
import { Col, Container, Row } from "reactstrap";

export default function Wallet() {
    const [balance, setBalance]: any = useState('');
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [tokens, setTokens] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const loadAddress = async () => {
            try {

                const encryptedSeedPhrase = localStorage.getItem('encryptedSeedPhrase');
                const password = localStorage.getItem('passwordHash');

                if (encryptedSeedPhrase && password) {
                    const decryptedSeedPhrase = decryptData(encryptedSeedPhrase, password).replace(/"/g, '');
                    const derivedAddress = getAddressFromSeedPhrase(decryptedSeedPhrase);
                    const api = `${process.env.NEXT_PUBLIC_API}/getTokens?address=${derivedAddress}&chain=0xaa36a7` || "http://localhost:3000"
                    const res = await fetch(api, { cache: 'no-store' })
                    const data: any = await res.json();
                    setTokens(data.tokens)
                    setBalance(data.balance)
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
            }

            setIsLoading(false);
        };

        initializeWallet();
    }, []);

    const onLockWallet = () => {
        localStorage.removeItem('passwordHash');
        localStorage.removeItem('encryptedSeedPhrase');
        localStorage.removeItem('walletInitialized');

        router.push('/');
    }

    return (
        <>
            <ApplicationLayout>
                <Container>
                    <Row className="pt-70">
                        <Col>
                            <NetworkSelect address={address} />
                        </Col>
                    </Row>
                </Container>
                <div className="bg-menuDark tf-container mt-2">
                    <div className="pt-12 pb-12 mt-4">
                        <h5><span className="text-primary">My Wallet</span> - <a href="#" className="choose-account" data-bs-toggle="modal" data-bs-target="#accountWallet"><span className="dom-text">Account 1 </span> &nbsp;<i className="icon-select-down"></i></a> </h5>
                        <p style={{ fontSize: 14 }} title={address}>{address && address?.slice(0, 4)}...{address?.slice(38)} <BiLogOutCircle onClick={onLockWallet} style={{ fontSize: 18, cursor: "pointer" }} /></p>
                        <h1 className="mt-16"><Link href="/">{formatEth(balance)} </Link></h1>
                        <ul className="mt-16 grid-4 m--16">
                            <li>
                                <Link href={`#`} className="tf-list-item d-flex flex-column gap-8 align-items-center">
                                    <span className="box-round bg-surface d-flex justify-content-center align-items-center">
                                        <BiSend className="icon icon-way" />
                                    </span>
                                    Send
                                </Link>
                            </li>
                            <li>
                                <Link href="/applications/receive" className="tf-list-item d-flex flex-column gap-8 align-items-center">
                                    <span className="box-round bg-surface d-flex justify-content-center align-items-center">
                                        <BiDownload className="icon icon-way2" />
                                    </span>
                                    Receive
                                </Link>
                            </li>
                            <li>
                                <Link href="/applications/buy" className="tf-list-item d-flex flex-column gap-8 align-items-center">
                                    <span className="box-round bg-surface d-flex justify-content-center align-items-center">
                                        <BiWallet className="icon icon-wallet" />
                                    </span>
                                    Buy
                                </Link>
                            </li>
                            <li>
                                <Link href="/earn" className="tf-list-item d-flex flex-column gap-8 align-items-center">
                                    <span className="box-round bg-surface d-flex justify-content-center align-items-center">
                                        <BiDollarCircle className="icon icon-exchange" />
                                    </span>
                                    Earn
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </ApplicationLayout>

            <Container>
                <Row className="mt-3">
                    <Col>
                        <TokenScreen tokens={tokens} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}