import { useState, useEffect } from "react";
import { api, token } from "../api/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

type DashboardResponse = {
  totalProjects: number;
  statusSummary: { status: number; total: number }[];
  projectsByPhase: { fase: number; total: number }[];
  projectsByLeader: { leaderId: number; leaderName: string; total: number }[];
  projectsForGant: {
    projectId: number;
    name: string;
    fase: number;
    status: number;
    leaderId: number;
    end: string | null;
  }[];
  tasksByDepartment: {
    departmentId: number;
    departmentName: string;
    total: number;
  }[];
};

export enum ProgressionStatusCE {
  READY_TO_START = 0,
  IN_PROGRESS = 1,
  PAUSED = 2,
  WAITING_FOR_FINAL_VALIDATION = 3,
  APPROVED = 4,
  REJECTED = 5,
  FINISHED = 6,
  NOT_FINISHED = 7,
}
export enum PhaseId {
  CE = 1,
  DVT = 2,
  PVT = 3,
  SPRV = 4,
  MASS_PROD = 5,
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#d0ed57"];

export function Dashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 🔹 Estados dos filtros
  const [fase, setFase] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [leader, setLeader] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [source, setSource] = useState<string>("");

  // 🔹 Função que busca os dados (reutilizável)
  const fetchDashboard = async (customSource?: string) => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      if (fase) params.append("phase", fase);
      if (status) params.append("progression_status", status);
      if (leader) params.append("project_leader_user_id", leader);
      if (department) params.append("department_id", department);
      if (customSource || source)
        params.append("source", customSource || source);

      console.log("Fetching with params:", params.toString());

      const res = await api.get(`/dashboard?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(res.data);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
      setError(`Erro ao carregar dados ${err}`);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Carrega dados na montagem
  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!data) return null;

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      {" "}
      <h2>Dashboard de Projetos</h2>
      {/* 🔸 FILTROS */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <select value={fase} onChange={(e) => setFase(e.target.value)}>
          <option value="">Todas as Fases</option>
          <option value="1">CE</option>
          <option value="2">DVT</option>
          <option value="3">PVT</option>
          <option value="4">SPRV</option>
          <option value="5">MASS_PROD</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Todos os Status</option>
          <option value="0">READY_TO_START</option>
          <option value="1">IN_PROGRESS</option>
          <option value="2">PAUSED</option>
          <option value="3">WAITING_FOR_FINAL_VALIDATION</option>
          <option value="4">APPROVED</option>
          <option value="5">REJECTED</option>
        </select>

        <input
          type="number"
          placeholder="ID do Líder"
          value={leader}
          onChange={(e) => setLeader(e.target.value)}
        />

        <input
          type="number"
          placeholder="ID do Departamento"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <button onClick={() => fetchDashboard()}>Filtrar</button>
      </div>
      {/* 🔹 Total */}
      <div style={{ background: "#6482bb", padding: 10, marginBottom: 20 }}>
        <strong>Total de Projetos:</strong> {data.totalProjects}
      </div>
      {/* 🔹 Tabela de Projetos */}
      <section>
        <h3>Lista de Projetos</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f2f2f2", color: "#333" }}>
              <th style={{ padding: 8, borderBottom: "1px solid #ccc" }}>
                NUM
              </th>
              <th style={{ padding: 8, borderBottom: "1px solid #ccc" }}>ID</th>
              <th style={{ padding: 8, borderBottom: "1px solid #ccc" }}>
                Nome
              </th>
              <th style={{ padding: 8, borderBottom: "1px solid #ccc" }}>
                Status
              </th>
              <th style={{ padding: 8, borderBottom: "1px solid #ccc" }}>
                Fase
              </th>
              <th style={{ padding: 8, borderBottom: "1px solid #ccc" }}>
                LiderId
              </th>
              <th style={{ padding: 8, borderBottom: "1px solid #ccc" }}>
                Término
              </th>
            </tr>
          </thead>
          <tbody>
            {data.projectsForGant.map((p, i) => (
              <tr key={p.projectId}>
                <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                  {i + 1}
                </td>
                <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                  {p.projectId}
                </td>
                <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                  {p.name}
                </td>
                <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                  {ProgressionStatusCE[p.status]}
                </td>
                <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                  {PhaseId[p.fase]}
                </td>
                <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                  {p.leaderId}
                </td>
                <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                  {p.end ? new Date(p.end).toLocaleDateString("pt-BR") : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* 🔹 Status Summary */}
      <section>
        <h3>Status dos Projetos</h3>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data.statusSummary}
                dataKey="total"
                nameKey="status"
                outerRadius={80}
                onClick={(entry) => {
                  setStatus(entry.status.toString());
                  setSource("status");
                  fetchDashboard("status");
                }}
                label={(entry) => {
                  switch (entry.status) {
                    case ProgressionStatusCE.READY_TO_START:
                      return "Pronto para Iniciar";
                    case ProgressionStatusCE.IN_PROGRESS:
                      return "Em Progresso";
                    case ProgressionStatusCE.PAUSED:
                      return "Pausado";
                    case ProgressionStatusCE.REJECTED:
                      return "Fase Reprovada";
                    case ProgressionStatusCE.WAITING_FOR_FINAL_VALIDATION:
                      return "Aguardando Validação Final";
                  }
                }}
              >
                {data.statusSummary.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
      {/* 🔹 Projects by Leader */}
      <section>
        <h3>Projetos por Líder</h3>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart
              data={data.projectsByLeader}
              onClick={(state) => {
                if (state?.activeLabel) {
                  const leaderObj = data.projectsByLeader.find(
                    (l) => l.leaderName === state.activeLabel
                  );
                  if (leaderObj) {
                    setLeader(String(leaderObj.leaderId));
                    setSource("leader");
                    fetchDashboard("leader");
                  }
                }
              }}
            >
              <XAxis dataKey="leaderName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#82ca9d" name="Projetos" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      {/* 🔹 Tasks by Department */}
      <section>
        <h3>Tarefas por Departamento</h3>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart
              data={data.tasksByDepartment}
              onClick={(state) => {
                if (state?.activeLabel) {
                  const depObj = data.tasksByDepartment.find(
                    (d) => d.departmentName === state.activeLabel
                  );
                  if (depObj) {
                    setDepartment(String(depObj.departmentId));
                    setSource("department");
                    fetchDashboard("department");
                  }
                }
              }}
            >
              <XAxis dataKey="departmentName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" name="Tarefas" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      {/* 🔹 Projects by Phase */}
      <section>
        <h3>Projetos por Fase</h3>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart
              data={data.projectsByPhase}
              onClick={(state) => {
                if (state?.activeLabel) {
                  const phaseObj = data.projectsByPhase.find(
                    (p) => p.fase === Number(state.activeLabel)
                  );
                  if (phaseObj) {
                    setFase(String(phaseObj.fase));
                    setSource("phase");
                    fetchDashboard("phase");
                  }
                }
              }}
            >
              <XAxis dataKey="fase" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#ffc658" name="Projetos" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
