import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Select from "react-select";

export default function NetworkSelect({ address, chain }: any) {
    const pathname = usePathname();

    const router = useRouter();
    const [selectChain, setSelectChain] = useState([{ value: "0xaa36a7", label: "SepoliaETH" }]);
    return (
        <>
            <Select
                className="basic-single pb-2"
                onChange={(val: any) => {
                    setSelectChain(val);
                    // router.push(`${pathname ? pathname : "/applications/dashboard"}?address=${address}&chain=${val.value}&chainSymbol=${val.label}`)
                }}
                classNamePrefix="select"
                defaultValue={selectChain}
                isSearchable={true}
                name="color"
                options={[
                    {
                        label: "SepoliaETH",
                        value: "0xaa36a7"
                    },
                    {
                        label: "Ethereum",
                        value: "0x1"
                    },
                    {
                        label: "Mumbai Testnet",
                        value: "0x13881"
                    },
                    {
                        label: "Polygon",
                        value: "0x89"
                    },
                    {
                        label: "Avalance",
                        value: "0xa86a"
                    },
                ]}
            />
        </>
    )
}