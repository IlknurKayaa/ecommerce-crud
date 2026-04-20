import { Link } from "react-router-dom";

function ProductCard({ product, onDelete }) {
    return (
        <div className="card">

            <div className="h-40 bg-gray-200 rounded-xl mb-3 overflow-hidden flex items-center justify-center">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-gray-400 text-sm">No Image</span>
                )}
            </div>

            <h2 className="text-base font-semibold text-gray-800">{product.name}</h2>

            <p className="text-blue-600 font-semibold text-lg mt-1">
                {product.price} ₺
            </p>

            <div className="flex gap-2 mt-4">
                <Link
                    to={`/edit/${product.id}`}
                    className="btn btn-primary flex-1 text-center"
                >
                    Düzenle
                </Link>

                <button
                    onClick={() => onDelete(product.id)}
                    className="btn btn-danger flex-1"
                >
                    Sil
                </button>
            </div>
        </div>
    );
}

export default ProductCard;