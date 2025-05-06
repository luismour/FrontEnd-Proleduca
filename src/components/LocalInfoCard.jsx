export default function InfoCard({ icon, address }) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4 flex items-start gap-3">
        <img src={icon} alt="Ícone de localização" className="w-10 h-10" />
        <div>
          <h4 className="font-semibold text-gray-800 mb-1">Onde você vai estudar?</h4>
          <p className="text-sm text-gray-600">{address}</p>
        </div>
      </div>
    );
  }
  