import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/mock/clients.json") // ou substitua pela URL real futuramente
      .then(res => setClients(res.data))
      .catch(() => setClients([]));
  }, []);

  const filtered = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    client.cpf.replace(/\D/g, "").includes(search.replace(/\D/g, ""))
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Clientes Cadastrados</h1>
        <Button>+ Novo Cliente</Button>
      </div>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Buscar por nome ou CPF..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-md bg-white shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.cpf}</TableCell>
                <TableCell>{client.status ? "Ativo" : "Inativo"}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline">Editar</Button>
                  <Button size="sm" variant="destructive">Excluir</Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  Nenhum cliente encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
