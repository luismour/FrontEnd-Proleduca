export default function Card({ logo, curso, cidade, preco }) {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
      <img src={logo} alt="Logo" className="h-16 mx-auto mb-4" />
      <h3 className="font-bold text-lg text-center">{curso}</h3>
      <p className="text-center text-gray-600 mb-2">{cidade}</p>
      <p className="text-center text-blue-600 font-bold text-xl">{preco}</p>
    </div>
  );
}
