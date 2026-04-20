import { useEffect, useState } from "react";
import { getProducts, saveProducts } from "../utils/storage";
import ProductCard from "../components/ProductCard";
import ConfirmModal from "../components/ConfirmModal";
import searchIcon from "../assets/icons/search.svg";

function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        setProducts(getProducts());
    }, []);

    //filtre
    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().startsWith(search.trim().toLowerCase())
    );

    const handleDelete = (id) => {
        setSelectedId(id);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        const filtered = products.filter((p) => p.id !== selectedId);
        setProducts(filtered);
        saveProducts(filtered);
        setIsModalOpen(false);
        setSelectedId(null);
    };

    return (
        <div className="container-custom">

            {/* arama */}
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Ürün ara..."
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <img
                    src={searchIcon}
                    alt="search"
                    className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 opacity-60"
                />
            </div>

            {/* başlık */}
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                Ürünler
            </h1>

            {/* liste */}
            {filteredProducts.length === 0 ? (
                <p className="text-gray-500">
                    {search
                        ? "Arama sonucu bulunamadı."
                        : "Henüz ürün eklenmedi."}
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((p) => (
                        <ProductCard
                            key={p.id}
                            product={p}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            {/* uyarı modalı */}
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedId(null);
                }}
                onConfirm={confirmDelete}
            />

        </div>
    );
}

export default Home;