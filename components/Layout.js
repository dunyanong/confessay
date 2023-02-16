import Footer  from "./Footer";
import Navbar from "./Navbar";

const Layout = ({children}) => {
    return (
        <div className="font-inter">
            <Navbar />
            <main className="px-5 md:px-20">{children}</main>
            <Footer/>
        </div>
    );
}
 
export default Layout;
