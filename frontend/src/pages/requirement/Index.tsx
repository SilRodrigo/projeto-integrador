import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { RequirementForm } from "@/components/forms/requirement"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { Pencil, Trash } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { format } from "date-fns"
import type { Complexity, Priority } from "@/types/requirement"
import { ReturnButton } from "@/components/return-button"

// ---- Tipos ----
export interface Requirement {
  id: number
  title: string
  description: string
  priority: Priority
  complexity: Complexity
  createdAt: string
  projectId: number
}

export default function RequirementPage() {
  const { projectId } = useParams()
  const { user } = useAuth()
  const [requirements, setRequirements] = useState<Requirement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement | undefined>()

  // 🔄 Buscar requisitos do projeto
  const fetchRequirements = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`http://localhost:4000/api/v1/project/${projectId}/requirement`, {
        headers: {
          "Authorization": `Bearer ${user?.token}`
        }
      })

      if (!response.ok) throw new Error("Erro ao carregar requisitos")

      const { data } = await response.json()
      setRequirements(data.items || [])

    } catch (err) {
      console.error(err)
      // fallback temporário
      setRequirements([
        {
          id: 1,
          title: "Requisito Exemplo",
          description: "Descrição do requisito exemplo",
          priority: "Medium",
          complexity: "Low",
          createdAt: new Date().toISOString(),
          projectId: Number(projectId)
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRequirements()
  }, [projectId])

  const handleCreate = async (data: Requirement) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/project/${projectId}/requirement`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.token}`
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error("Erro ao criar requisito")

      toast.success("Requisito criado com sucesso!")
      await fetchRequirements()
    } catch (err) {
      console.error("Erro ao criar:", err)
      toast.error("Erro ao criar requisito")
    }
  }

  const handleUpdate = async (data: Requirement) => {
    if (!selectedRequirement?.id) return

    try {
      const response = await fetch(`http://localhost:4000/api/v1/requirement/${selectedRequirement.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.token}`
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error("Erro ao atualizar requisito")

      toast.success("Requisito atualizado com sucesso!")
      await fetchRequirements()
    } catch (err) {
      console.error("Erro ao atualizar:", err)
      toast.error("Erro ao atualizar requisito")
    }
  }

  // 🗑️ Excluir
  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este requisito?")) return

    try {
      const response = await fetch(`http://localhost:4000/api/v1/requirement/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${user?.token}`
        }
      })

      if (!response.ok) throw new Error("Erro ao excluir requisito")

      toast.success("Requisito excluído com sucesso!")
      await fetchRequirements()
    } catch (err) {
      console.error("Erro ao excluir:", err)
      toast.error("Erro ao excluir requisito")
    }
  }

  // 💾 Submeter formulário
  const handleSubmit = async (data: Requirement) => {
    try {
      if (selectedRequirement) {
        await handleUpdate(data)
      } else {
        await handleCreate(data)
      }
      setFormOpen(false)
    } catch (err) {
      console.error("Erro ao salvar:", err)
    }
  }

  const openEditForm = (req: Requirement) => {
    setSelectedRequirement(req)
    setFormOpen(true)
  }

  const openCreateForm = () => {
    setSelectedRequirement(undefined)
    setFormOpen(true)
  }

  return (
    <div className="container mx-auto">
      <Toaster richColors />

      <ReturnButton className="cursor-pointer mb-3" href={`/projects`} title="Voltar para projetos" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">
          Requisitos do Projeto {projectId}
        </h1>
        {/* <div className="flex items-center gap-4">
        </div> */}
        <Button onClick={openCreateForm}>Novo Requisito</Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Complexidade</TableHead>
              <TableHead>Data de criação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : requirements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Nenhum requisito cadastrado
                </TableCell>
              </TableRow>
            ) : (
              requirements.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>{req.title}</TableCell>
                  <TableCell>{req.description}</TableCell>
                  <TableCell>{req.priority}</TableCell>
                  <TableCell>{req.complexity}</TableCell>
                  <TableCell>
                    {req.createdAt &&
                      format(
                        new Date(req.createdAt.endsWith("Z") ? req.createdAt : req.createdAt + "Z"),
                        "dd/MM/yyyy HH:mm"
                      )}
                  </TableCell>
                  <TableCell className="text-right space-x-2 flex justify-end">
                    <Button
                      variant="outline"
                      size="icon"
                      title="Editar"
                      className="cursor-pointer"
                      onClick={() => openEditForm(req)}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      title="Excluir"
                      className="cursor-pointer hover:bg-red-700"
                      onClick={() => req.id && handleDelete(req.id)}
                    >
                      <Trash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <RequirementForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedRequirement}
        title={selectedRequirement ? "Editar Requisito" : "Novo Requisito"}
      />
    </div>
  )
}
