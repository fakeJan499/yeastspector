export default function Layout({
    children,
    dialog,
}: Readonly<{
    children: React.ReactNode;
    dialog: React.ReactNode;
}>) {
    return (
        <>
            {children}
            {dialog}
        </>
    );
}
