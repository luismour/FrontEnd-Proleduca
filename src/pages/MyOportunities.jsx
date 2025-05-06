import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MinhasBolsas() {
  const [minhasBolsas, setMinhasBolsas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMinhasBolsas = async () => {
      const user = JSON.parse(localStorage.getItem("user")); // Pega o usuário do localStorage
      if (!user) {
        navigate("/login"); // Se não houver usuário logado, redireciona para login
        return;
      }

      try {
        const response = await axios.get(`/api/bolsistas/${user.id}/bolsas`); // Supondo que você tenha esse endpoint
        if (response.status === 200) {
          setMinhasBolsas(response.data);
        } else {
          setMessage("Nenhuma bolsa encontrada.");
        }
      } catch (error) {
        console.error(error);
        setMessage("Erro ao carregar as bolsas.");
      } finally {
        setLoading(false);
      }
    };

    fetchMinhasBolsas();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Minhas Bolsas</h2>
        
        {loading ? (
          <div>Carregando...</div>
        ) : message ? (
          <div className="text-red-600">{message}</div>
        ) : (
          <div>
            {minhasBolsas.length === 0 ? (
              <div>Nenhuma bolsa encontrada.</div>
            ) : (
              <ul>
                {minhasBolsas.map((bolsa) => (
                  <li key={bolsa.id} className="mb-4 border-b py-2">
                    <h3 className="text-lg font-semibold">{bolsa.nome_curso}</h3>
                    <p>{`Percentual de bolsa: ${bolsa.percentual}%`}</p>
                    <p>{`Valor com bolsa: R$${bolsa.valor_com_bolsa}`}</p>
                    <p>{`Status: ${bolsa.status ? "Ativo" : "Inativo"}`}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
