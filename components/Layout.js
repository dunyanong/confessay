import Footer  from "./Footer";

const Layout = ({children}) => {
    return (
        <div>
            <main className="px-10 md:px-20">{children}</main>
            <Footer />
        </div>
    );
}
 
export default Layout;