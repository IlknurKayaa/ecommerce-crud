import { Link } from "react-router-dom";
import shoppingIcon from "../assets/icons/shopping.svg";

function Navbar() {
    return (
        <div className="container-custom py-2">

            <div className="navbar-box px-4 py-3 rounded-xl flex justify-between items-center">

                <div className="flex items-center">
                    <img
                        src={shoppingIcon}
                        alt="shopping"
                        className="w-6 h-6 opacity-70 mr-1"
                    />

                    <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
                        Ürün Sistemi
                    </h1>
                </div>

                <div className="flex gap-4 items-center">
                    <Link to="/" className="text-gray-600 hover:text-black text-lg">
                        Ana Sayfa
                    </Link>

                    <Link
                        to="/add"
                        className="btn btn-add btn-nav">
                        + Ürün Ekle
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default Navbar;