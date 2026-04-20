function ConfirmModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-lg">

                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                    Emin misiniz?
                </h2>

                <p className="text-sm text-gray-600 mb-4">
                    Bu ürünü silmek istediğinize emin misiniz?
                </p>

                <div className="flex gap-3 justify-end">

                    <button
                        onClick={onClose}
                        className="btn btn-primary"
                    >
                        Vazgeç
                    </button>

                    <button
                        onClick={onConfirm}
                        className="btn btn-danger"
                    >
                        Sil
                    </button>

                </div>
            </div>

        </div>
    );
}

export default ConfirmModal;