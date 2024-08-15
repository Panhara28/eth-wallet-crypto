import { useState } from "react";
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import Image from 'next/image';

export default function TokenScreen({ tokens }: any) {
    const [tab, setTab] = useState("token");

    const onTab = (tabx: string) => {
        setTab(tabx);
    }

    return (
        <>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={`${tab === "token" ? "active" : "text-white"}`}
                        onClick={() => onTab("token")}
                    >
                        Token
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={tab === "nfts" ? "active" : "text-white"}
                        onClick={() => onTab("nfts")}
                    >
                        NFTs
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={tab}>
                <TabPane tabId="token">
                    <Row>
                        <Col sm="12">
                            <h4 className="mt-3">Tokens</h4>
                            <hr />
                            <div className="d-flex justify-content-between pt-2">
                                Name
                                <p className="d-flex gap-8">
                                    <span>Total Supply</span>
                                </p>
                            </div>
                            <ul className="mt-16" style={{ marginBottom: 100 }}>
                                {
                                    tokens.length > 0 ? tokens.filter((item: any) => item.possible_spam != true).map((item: any, index: number) => {
                                        return (
                                            <>
                                                <li className="mt-3" key={index}>
                                                    <a href="choose-payment.html" className="coin-item style-2 gap-12">
                                                        <Image src={item.logo ? item.logo : "/avt2.jpg"} alt="img" className="img" width={30} height={30} />
                                                        <div className="content">
                                                            <div className="title">
                                                                <p className="mb-4 text-button">{item.symbol}</p>
                                                                <span className="text-secondary">{(
                                                                    Number(item.balance) /
                                                                    10 ** Number(item.decimals)
                                                                ).toFixed(2)}</span>
                                                            </div>
                                                            <div className="d-flex align-items-center gap-12">
                                                                <span className="text-small">{item.total_supply_formatted} {item.symbol.toLowerCase()}</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                            </>
                                        )
                                    }) : <p className="text-center mt-5 fs-4">No tokens</p>
                                }

                            </ul>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="nfts">
                    <Row>
                        <Col sm="12">
                            <h4>NFTs</h4>
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </>
    );
}
