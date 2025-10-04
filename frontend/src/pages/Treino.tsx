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
import { TreinoForm } from "@/components/treino-form"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import type { Treino } from "@/types/treino"
import { useAuth } from "@/hooks/useAuth"
import { format } from "date-fns"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import type { Tipo } from "@/types/tipo"

export default function TreinoPage() {
    const { user } = useAuth()
    const [treinos, setTreinos] = useState<Treino[]>([])
    const [tipos, setTipos] = useState<Tipo[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [formOpen, setFormOpen] = useState(false)
    const [selectedTreino, setSelectedTreino] = useState<Treino | undefined>()

    const fetchTreinos = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('http://localhost:4000/api/v1/treino', {
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            })

            if (!response.ok) {
                throw new Error('Erro ao carregar treinos')
            }

            const { data } = await response.json()
            setTreinos(data.items || []);


        } catch (err) {
            setError('Falha ao carregar a lista de treinos')
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchTipos = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/v1/tipo', {
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            })

            if (!response.ok) {
                throw new Error('Erro ao carregar tipos')
            }

            const { data } = await response.json()

            if (!data.items.length) {
                throw new Error('Nenhum tipo cadastrado')
            }

            setTipos(data.items || []);


        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchTipos()
        fetchTreinos()
    }, [])

    const handleCreate = async (data: Treino) => {
        try {
            const response = await fetch('http://localhost:4000/api/v1/treino', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error('Erro ao criar treino')
            }

            toast.success('Treino criada com sucesso!')
            await fetchTreinos();
        } catch (err) {
            console.error('Erro ao criar:', err)
            toast.error('Erro ao criar treino')
            throw err
        }
    }

    const handleUpdate = async (data: Treino) => {
        if (!selectedTreino?.id) return

        try {
            const response = await fetch(`http://localhost:4000/api/v1/treino/${selectedTreino.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error('Erro ao atualizar treino')
            }

            toast.success('Treino atualizada com sucesso!')
            await fetchTreinos()
        } catch (err) {
            console.error('Erro ao atualizar:', err)
            toast.error('Erro ao atualizar treino')
            throw err
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Tem certeza que deseja excluir esta treino?')) {
            return
        }

        try {
            const response = await fetch(`http://localhost:4000/api/v1/treino/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            })

            if (!response.ok) {
                throw new Error('Erro ao excluir treino')
            }

            toast.success('Treino excluída com sucesso!')
            await fetchTreinos()
        } catch (err) {
            console.error('Erro ao excluir:', err)
            toast.error('Erro ao excluir treino')
        }
    }

    const handleSubmit = async (data: Treino) => {
        try {
            if (selectedTreino) {
                await handleUpdate(data)
            } else {
                await handleCreate(data);
            }
            setFormOpen(false)
        } catch (err) {
            console.error('Erro ao salvar:', err)
        }
    }

    const openEditForm = (treino: Treino) => {
        setSelectedTreino(treino)
        setFormOpen(true)
    }

    const openCreateForm = () => {
        setSelectedTreino(undefined)
        setFormOpen(true)
    }

    return (
        <div className="container mx-auto py-6">
            <Toaster richColors />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Lista de Treinos</h1>
                <Button onClick={openCreateForm}>Novo Treino</Button>
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
                            <TableHead>Descrição</TableHead>
                            <TableHead>Data e Hora</TableHead>
                            <TableHead>Tipo</TableHead>
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
                        ) : treinos.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    Nenhuma treino cadastrado
                                </TableCell>
                            </TableRow>
                        ) : (
                            treinos.map((treino) => (
                                <TableRow key={treino.id}>
                                    <TableCell>{treino.descricao}</TableCell>
                                    <TableCell>
                                        {treino.dataHora && format(new Date(
                                            (treino.dataHora.endsWith('Z') ? treino.dataHora : treino.dataHora + 'Z')
                                        ), 'dd/MM/yyyy HH:mm')}
                                    </TableCell>
                                    <TableCell>{treino.tipo?.descricao}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openEditForm(treino)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => treino.id && handleDelete(treino.id)}
                                        >
                                            Excluir
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <TreinoForm
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSubmit={handleSubmit}
                initialData={selectedTreino}
                title={selectedTreino ? "Editar Treino" : "Novo Treino"}
                tipoList={tipos}
            />
        </div>
    )
}