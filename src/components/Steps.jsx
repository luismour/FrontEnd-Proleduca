
export default function Steps() {
  return (
    <section className="bg-gray-100 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-base md:text-3xl font-bold text-gray-800 mb-12 mt-0">
          Descubra como é simples e rápido garantir sua bolsa de estudos.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Passo 1 */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400 text-gray-800 font-bold">
              1
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="/icon1.png"
                alt="Ícone Passo 1"
                width={80}
                height={40}
              />
              <p className="text-1xl text-gray-700 text-left">
                Acesse o site e crie uma conta
              </p>
            </div>
          </div>

          {/* Passo 2 */}
          <div className="flex items-center space-x-4 ml-7">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400 text-gray-700 font-bold">
              2
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="/icon2.png"
                alt="Ícone Passo 2"
                width={80}
                height={40}
              />
              <p className="text-1 text-gray-700 text-left">Faça seu cadastro</p>
            </div>
          </div>

          {/* Passo 3 */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-15 h-10 rounded-full bg-yellow-400 text-gray-700 font-bold">
              3
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="/icon3.png"
                alt="Ícone Passo 3"
                width={80}
                height={40}
              />
              <p className="text-1 text-gray-700 text-left">
                Pague a taxa de adesão e ganhe a sua Bolsa de estudo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
