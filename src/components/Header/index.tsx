import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

export default function Header() {
    const [currentUser, setCurrentUser]: any = useState('');
    const router = useRouter();

    useEffect(() => {
        setCurrentUser(localStorage.getItem('encryptedSeedPhrase'))
    }, [])

    const onLockWallet = () => {
        localStorage.removeItem('passwordHash');
        localStorage.removeItem('encryptedSeedPhrase');
        localStorage.removeItem('walletInitialized');

        router.push('/');
    }

    return (
        <>
            <Nav>
                {currentUser && (
                    <>
                        <NavItem onClick={onLockWallet}>
                            <NavLink
                                disabled
                                href="#">
                                Lock wallet
                            </NavLink>
                        </NavItem>
                    </>
                )}

            </Nav>
        </>
    )
}