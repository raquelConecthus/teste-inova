import { useState, useEffect } from "react";
import { api } from "../api/api";

export function Home() {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fazendo a requisição à API quando o componente é montado
    api
      .get("")
      .then((res) => {
        setResponse(res.data); // Supondo que os dados relevantes estão em res.data
      })
      .catch((err) => {
        console.error("Erro ao buscar dados:", err);
        setError("Erro ao carregar dados");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // O array vazio [] garante que o useEffect será executado apenas uma vez

  return (
    <>
      <h2>Home</h2>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && <div>{JSON.stringify(response, null, 2)}</div>}
    </>
  );
}
