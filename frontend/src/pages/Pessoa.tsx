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
import { PessoaForm } from "@/components/pessoa-form"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import type { Pessoa } from "@/types/pessoa"
import { useAuth } from "@/hooks/useAuth"
import { format } from "date-fns"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

export default function PessoaPage() {
    const { user } = useAuth()
    const [pessoas, setPessoas] = useState<Pessoa[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [formOpen, setFormOpen] = useState(false)
    const [selectedPessoa, setSelectedPessoa] = useState<Pessoa | undefined>()

    const fetchPessoas = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('http://localhost:4000/api/v1/pessoa', {
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            })

            if (!response.ok) {
                throw new Error('Erro ao carregar pessoas')
            }

            const { data } = await response.json()
            setPessoas(data.items || []);


        } catch (err) {
            setError('Falha ao carregar a lista de pessoas')
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPessoas()
    }, [])

    const handleCreate = async (data: Pessoa) => {
        try {
            const response = await fetch('http://localhost:4000/api/v1/pessoa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error('Erro ao criar pessoa')
            }

            toast.success('Pessoa criada com sucesso!')
            await fetchPessoas();
        } catch (err) {
            console.error('Erro ao criar:', err)
            toast.error('Erro ao criar pessoa')
            throw err
        }
    }

    const handleUpdate = async (data: Pessoa) => {
        if (!selectedPessoa?.id) return

        try {
            const response = await fetch(`http://localhost:4000/api/v1/pessoa/${selectedPessoa.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error('Erro ao atualizar pessoa')
            }

            toast.success('Pessoa atualizada com sucesso!')
            await fetchPessoas()
        } catch (err) {
            console.error('Erro ao atualizar:', err)
            toast.error('Erro ao atualizar pessoa')
            throw err
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Tem certeza que deseja excluir esta pessoa?')) {
            return
        }

        try {
            const response = await fetch(`http://localhost:4000/api/v1/pessoa/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            })

            if (!response.ok) {
                throw new Error('Erro ao excluir pessoa')
            }

            toast.success('Pessoa excluída com sucesso!')
            await fetchPessoas()
        } catch (err) {
            console.error('Erro ao excluir:', err)
            toast.error('Erro ao excluir pessoa')
        }
    }

    const handleSubmit = async (data: Pessoa) => {
        try {
            if (selectedPessoa) {
                await handleUpdate(data)
            } else {
                await handleCreate(data);
            }
            setFormOpen(false)
        } catch (err) {
            console.error('Erro ao salvar:', err)
        }
    }

    const openEditForm = (pessoa: Pessoa) => {
        setSelectedPessoa(pessoa)
        setFormOpen(true)
    }

    const openCreateForm = () => {
        setSelectedPessoa(undefined)
        setFormOpen(true)
    }

    return (
        <div className="container mx-auto py-6">
            <Toaster richColors />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Lista de Pessoas</h1>
                <Button onClick={openCreateForm}>Nova Pessoa</Button>
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
                            <TableHead>Nome</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead>Data de Nascimento</TableHead>
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
                        ) : pessoas.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    Nenhuma pessoa cadastrada
                                </TableCell>
                            </TableRow>
                        ) : (
                            pessoas.map((pessoa) => (
                                <TableRow key={pessoa.id}>
                                    <TableCell>{pessoa.nome}</TableCell>
                                    <TableCell>{pessoa.email}</TableCell>
                                    <TableCell>{pessoa.telefone}</TableCell>
                                    <TableCell>
                                        {pessoa.dataNascimento && format(new Date(pessoa.dataNascimento.replace('T', ' ').replace('Z', '')), 'dd/MM/yyyy')}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openEditForm(pessoa)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => pessoa.id && handleDelete(pessoa.id)}
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

            <PessoaForm
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSubmit={handleSubmit}
                initialData={selectedPessoa}
                title={selectedPessoa ? "Editar Pessoa" : "Nova Pessoa"}
            />
        </div>
    )
}