import Link from "next/link";
import { Col, Container, Row } from "reactstrap";
import Image from 'next/image';

export default function Home() {
  return (
    <>

      <div className="wrap-boarding">
        <div className="tf-container">
          <div className="d-flex flex-column min-vh-100 justify-content-between">
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
            <div className="content mb-32">
              <h2 className="text-center">A Fantastic Experience with PkaChhouk!</h2>
              <p className="mt-8 text-center text-large">Explore the diverse features of PkaChhouk Wallet. Send and receive funds, track transaction history, create new wallets, and much more. </p>
              <Link href="/create-password" className="tf-btn primary md mt-40">
                Create Wallet
              </Link>
              <Link href="/recover-wallet" className="tf-btn secondary md mt-10">
                Login With Seed Phrase
              </Link>
              <p className="mt-20 text-center mb-35">By creating an account, you’re agree to out <a href="#notiPrivacy" className="text-white" data-bs-toggle="modal">Privacy policy</a>  and <a href="#notiPrivacy" className="text-white" data-bs-toggle="modal">Term of use</a> </p>
            </div>


          </div>


        </div>
      </div>
      {/* <Container>
        <Row >
          <Col>
            <div className="mx-auto d-flex align-items-center justify-content-center flex-column" style={{ height: "100vh" }}>
              <p>Create at your own risk</p>
              <Link href="/create-password" className="btn btn-primary">
                Create Wallet
              </Link>
              <Link href="/recover-wallet" className="btn btn-primary mt-2">
                Recover your wallet
              </Link>
            </div>
          </Col>
        </Row>
      </Container> */}
    </>
  );
}
