import { useEffect, useState } from "react";
import { getProducts, saveProducts } from "../utils/storage";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        price: "",
        image: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const products = getProducts();
        const product = products.find((p) => p.id === Number(id));

        if (product) {
            setForm(product);
        }
    }, [id]);

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
            newErrors.price = "Fiyat zorunlu";
        } else if (Number(form.price) < 0) {
            newErrors.price = "Fiyat negatif olamaz";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        if (!validate()) return;

        const products = getProducts();

        const updated = products.map((p) =>
            p.id === Number(id)
                ? {
                    ...form,
                    price: Number(form.price),
                }
                : p
        );

        saveProducts(updated);
        navigate("/");
    };

    return (
        <form className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow" onSubmit={handleUpdate}>
            <h1 className="text-2xl font-bold mb-4 text-center">Ürün Güncelle</h1>

            {/* IMAGE */}
            {form.image && (
                <div className="mb-3">
                    <img src={form.image} className="h-32 object-cover rounded mb-4" />

                    <button
                        type="button"
                        onClick={removeImage}
                        className="text-red-500 text-sm underline"
                    >
                        Resmi kaldır
                    </button>
                </div>
            )}

            <input type="file" accept="image/*" onChange={handleImage} className="mb-4" />

            {/* isim */}
            <input
                type="text"
                name="name"
                className={`border p-2 w-full rounded mb-1 ${errors.name ? "border-red-500" : ""}`}
                value={form.name}
                onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

            {/* ücret */}
            <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                className={`border p-2 w-full rounded mb-1 ${errors.price ? "border-red-500" : ""}`}
                value={form.price}
                onChange={handleChange}
            />
            {errors.price && <p className="text-red-500 text-sm mb-2">{errors.price}</p>}

            <button className="w-full btn btn-primary py-2">
                Güncelle
            </button>
        </form>
    );
}

export default EditProduct;