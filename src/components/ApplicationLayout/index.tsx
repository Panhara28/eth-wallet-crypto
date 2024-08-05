import Header from "../Header";

export default function ApplicationLayout({ children }: any) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}