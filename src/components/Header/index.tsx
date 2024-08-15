import Image from 'next/image';
import Link from 'next/link';
import { BiBellPlus, BiExit, BiNotification, BiSearch } from 'react-icons/bi';

export default function Header() {
    return (
        <>
            <div className="header-style2 fixed-top bg-menuDark">
                <div className="d-flex justify-content-between align-items-center gap-14">
                    <div className="box-account style-2">
                        <Link href={"/"}>
                            <Image src="/avt2.jpg" alt="img" className="avt" width={32} height={32} />
                        </Link>
                        <div className="search-box box-input-field style-2">
                            <BiSearch className='icon-search' />
                            <input type="text" placeholder="Looking for crypto" required={true} className="clear-ip" />
                            <BiExit className='icon-close' />
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-8">
                        <BiBellPlus className="icon-noti box-noti" />
                    </div>
                </div>
            </div>
        </>
    )
}