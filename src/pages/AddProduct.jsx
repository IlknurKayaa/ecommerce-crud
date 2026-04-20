import { useState } from "react";
import { getProducts, saveProducts } from "../utils/storage";
import { useNavigate } from "react-router-dom";

function AddProduct() {
    const [form, setForm] = useState({
        name: "",
        price: "",
        image: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "price" && Number(value) < 0) return;

        setForm({ ...form, [name]: value });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setForm({ ...form, image: reader.result });
        };

        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setForm({ ...form, image: "" });
    };

    const validate = () => {
        let newErrors = {};

        if (!form.name.trim()) newErrors.name = "Ürün adı zorunlu!";
        if (!form.price) {
            newErrors.price = "Fiyat zorunlu!";
        } else if (Number(form.price) < 0) {
            newErrors.price = "Fiyat negatif olamaz!";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        const products = getProducts();

        const newProduct = {
            id: Date.now() + Math.random(),
            name: form.name,
            price: Number(form.price),
            image: form.image,
        };

        saveProducts([...products, newProduct]);
        navigate("/");
    };

    return (
        <form className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-4 text-center">Ürün Ekle</h1>

            {/* NAME */}
            <input
                type="text"
                name="name"
                placeholder="Ürün adı"
                className={`border p-2 w-full rounded mb-4 ${errors.name ? "border-red-500" : ""}`}
                value={form.name}
                onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

            {/* PRICE */}
            <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                placeholder="Fiyat"
                className={`border p-2 w-full rounded mb-1 ${errors.price ? "border-red-500" : ""}`}
                value={form.price}
                onChange={handleChange}
            />
            {errors.price && <p className="text-red-500 text-sm mb-2">{errors.price}</p>}

            {/* IMAGE */}
            <input type="file" accept="image/*" onChange={handleImage} className="mb-2" />

            {form.image && (
                <div className="mb-3">
                    <img src={form.image} className="h-32 object-cover rounded mb-2" />

                    <button
                        type="button"
                        onClick={removeImage}
                        className="text-red-500 text-sm underline"
                    >
                        Resmi kaldır
                    </button>
                </div>
            )}

            <button className="w-full bg-green-500 text-white py-2 rounded">
                Kaydet
            </button>
        </form>
    );
}

export default AddProduct;