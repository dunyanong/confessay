import Head from "next/head";
import Footer  from "./Footer";
import Navbar from "./Navbar";

const Layout = ({children}) => {
    return (
        <div>
            <Navbar />
            <main className="px-5 md:px-20">{children}</main>
            <Footer />
        </div>
    );
}
 
export default Layout;
