import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ProjectForm } from "@/components/forms/project"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import type { Project } from "@/types/project"
import { useAuth } from "@/hooks/useAuth"
import { format } from "date-fns"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { Pencil, Trash } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function ProjectPage() {
    const { user } = useAuth()
    const [projetos, setProjetos] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [formOpen, setFormOpen] = useState(false)
    const [selectedProject, setSelectedProject] = useState<Project | undefined>()

    const navigate = useNavigate();

    const fetchProjetos = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('http://localhost:4000/api/v1/project', {
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            })

            if (!response.ok) {
                throw new Error('Erro ao carregar projetos')
            }

            const { data } = await response.json()
            setProjetos(data.items || []);


        } catch (err) {
            /* setError('Falha ao carregar a lista de projetos') */
            setProjetos([
                { id: 1, name: 'Projeto Exemplo', description: 'Descrição do projeto exemplo', createdAt: new Date().toISOString(), createdBy: 1 },
            ])
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProjetos()
    }, [])

    const handleCreate = async (data: Project) => {
        try {
            const response = await fetch('http://localhost:4000/api/v1/project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error('Erro ao criar projeto')
            }

            toast.success('Projeto criada com sucesso!')
            await fetchProjetos();
        } catch (err) {
            console.error('Erro ao criar:', err)
            toast.error('Erro ao criar projeto')
            throw err
        }
    }

    const handleUpdate = async (data: Project) => {
        if (!selectedProject?.id) return

        try {
            const response = await fetch(`http://localhost:4000/api/v1/project/${selectedProject.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error('Erro ao atualizar projeto')
            }

            toast.success('Projeto atualizada com sucesso!')
            await fetchProjetos()
        } catch (err) {
            console.error('Erro ao atualizar:', err)
            toast.error('Erro ao atualizar projeto')
            throw err
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Tem certeza que deseja excluir esta projeto?')) {
            return
        }

        try {
            const response = await fetch(`http://localhost:4000/api/v1/project/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            })

            if (!response.ok) {
                throw new Error('Erro ao excluir projeto')
            }

            toast.success('Projeto excluída com sucesso!')
            await fetchProjetos()
        } catch (err) {
            console.error('Erro ao excluir:', err)
            toast.error('Erro ao excluir projeto')
        }
    }

    const handleSubmit = async (data: Project) => {
        try {
            if (selectedProject) {
                await handleUpdate(data)
            } else {
                await handleCreate(data);
            }
            setFormOpen(false)
        } catch (err) {
            console.error('Erro ao salvar:', err)
        }
    }

    const openEditForm = (project: Project) => {
        setSelectedProject(project)
        setFormOpen(true)
    }

    const goToProjectRequirements = (projectId: number) => {
        navigate(`/projects/${projectId}/requirements`);
    }

    const openCreateForm = () => {
        setSelectedProject(undefined)
        setFormOpen(true)
    }

    return (
        <div className="container mx-auto py-6">
            <Toaster richColors />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold">Lista de Projetos</h1>
                <Button onClick={openCreateForm}>Novo Projeto</Button>
            </div>

            {error && (
                <Alert variant="destructive" className="mb-6 ">
                    <AlertTitle>Erro</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Descrição</TableHead>
                            <TableHead>Data de criação</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    Carregando...
                                </TableCell>
                            </TableRow>
                        ) : projetos.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    Nenhum projeto cadastrado
                                </TableCell>
                            </TableRow>
                        ) : (
                            projetos.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell>{project.name}</TableCell>
                                    <TableCell>{project.description}</TableCell>
                                    <TableCell>
                                        {project.createdAt && format(new Date(
                                            (project.createdAt.endsWith('Z') ? project.createdAt : project.createdAt + 'Z')
                                        ), 'dd/MM/yyyy HH:mm')}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2 flex items-center justify-end">
                                        <Button
                                            variant="outline"
                                            className="bg-green-600 hover:bg-green-700 text-white hover:text-white cursor-pointer"
                                            size="sm"
                                            onClick={() => goToProjectRequirements(project.id)}
                                        >
                                            Ir para requisitos
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            title="Editar"
                                            className="cursor-pointer"
                                            onClick={() => openEditForm(project)}
                                        >
                                           <Pencil />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            title="Excluir"
                                            className="cursor-pointer hover:bg-red-700"
                                            onClick={() => project.id && handleDelete(project.id)}
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

            <ProjectForm
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSubmit={handleSubmit}
                initialData={selectedProject}
                title={selectedProject ? "Editar Projeto" : "Novo Projeto"}
            />
        </div>
    )
}