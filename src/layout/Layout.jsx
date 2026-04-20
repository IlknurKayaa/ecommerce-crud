import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Layout({ children }) {
    return (
        <div className="page-bg min-h-screen flex flex-col">

            {/* NAVBAR */}
            <Navbar />

            {/* CONTENT (büyüyen alan) */}
            <div className="flex-1">
                <div className="container-custom py-6">
                    {children}
                </div>
            </div>

            {/* FOOTER */}
            <Footer />

        </div>
    );
}

export default Layout;