export default function EditModal({ isOpen, onClose, onSave, value, setValue }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Editar</h2>

        <input
          className="border p-2 w-full mb-4"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
          <button onClick={onSave} className="px-4 py-2 bg-blue-500 text-white rounded">Salvar</button>
        </div>
      </div>
    </div>
  );
}
