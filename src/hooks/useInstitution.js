// src/hooks/useInstitution.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useInstitution(institutionName) {
  const [institution, setInstitution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInstitution() {
      try {
        const response = await axios.get(`/api/instituicoes`, {
          params: { nome_fantasia: institutionName }
        });
        setInstitution(response.data);
      } catch (error) {
        console.error('Erro ao buscar instituição:', error);
      } finally {
        setLoading(false);
      }
    }

    if (institutionName) {
      fetchInstitution();
    }
  }, [institutionName]);

  return { institution, loading };
}
