import Footer  from "./Footer";
import Navbar from "./navbar/Navbar";

const Layout = ({children}) => {
    return (
        <div className="font-inter w-full min-h-screen bg-gradient-to-br from-rose-100 via-blue-50 to-purple-100 flex flex-col">
            <Navbar />
            <main className="px-10 md:px-20 pt-20 ">{children}</main>
            <Footer/>
        </div>
    );
}
 
export default Layout;
