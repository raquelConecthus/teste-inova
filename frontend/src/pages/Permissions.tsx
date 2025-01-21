import { useEffect, useState } from "react";
import { api, token } from "../api/api";

export function Permissions() {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    // Fazendo a requisição à API quando o componente é montado
    api
      .get("/permission", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
  }, []);
  return (
    <>
      <h2>Permissions</h2>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && <div>{JSON.stringify(response, null, 2)}</div>}
    </>
  );
}
