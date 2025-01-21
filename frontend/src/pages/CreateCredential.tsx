import React, { useState } from "react";
import { api, token } from "../api/api";

export function CreateCredential() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    departmentId: 0,
  });

  const [permissions, setPermissions] = useState([
    {
      phaseId: 1,
      name: "CriadorACT",
      can_create: false,
      can_read: false,
      can_update: false,
      can_delete: false,
      can_approve: false,
    },
    {
      phaseId: 2,
      name: "AdminACT",
      can_create: false,
      can_read: false,
      can_update: false,
      can_delete: false,
      can_approve: false,
    },
    {
      phaseId: 3,
      name: "AprovadorACT",
      can_create: false,
      can_read: false,
      can_update: false,
      can_delete: false,
      can_approve: false,
    },
  ]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (phaseId: number, field: string) => {
    setPermissions((prev) =>
      prev.map((permission) =>
        permission.phaseId === phaseId
          ? {
              ...permission,
              [field]: !permission[field as keyof typeof permission],
            }
          : permission
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      departmentId: Number(formData.departmentId),
      permissions,
    };
    console.log(payload);
    try {
      const response = await api.post(
        "/access-control",

        payload
      );
      alert("Credencial criada com sucesso!");
      console.log("Resposta da API:", response.data);
    } catch (error) {
      console.error("Erro ao criar credencial:", error);
      alert("Erro ao criar credencial. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Credential</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleFormChange}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            required
          />
        </div>
        <div>
          <label>Department ID:</label>
          <input
            type="number"
            name="departmentId"
            value={formData.departmentId}
            onChange={handleFormChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <h2>Permissions</h2>
      <table border={3} style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Phase ID</th>
            <th>Role Name</th>
            <th>Can Create</th>
            <th>Can Read</th>
            <th>Can Update</th>
            <th>Can Delete</th>
            <th>Can Approve</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission.phaseId}>
              <td>{permission.phaseId}</td>
              <td>{permission.name}</td>
              {[
                "can_create",
                "can_read",
                "can_update",
                "can_delete",
                "can_approve",
              ].map((field) => (
                <td key={field}>
                  <input
                    type="checkbox"
                    checked={permission[field as keyof typeof permission]}
                    onChange={() =>
                      handleCheckboxChange(permission.phaseId, field)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
