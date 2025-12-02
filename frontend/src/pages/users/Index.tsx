import { useState } from "react"
import { UserForm } from "@/components/forms/User"
import type { User } from "@/types/user"
import { useList } from "@/hooks/useList"
import { format } from "date-fns"
import { Toaster } from "@/components/ui/sonner"
import { ListHeader } from "@/components/list-header"
import { ListTable, type Column } from "@/components/list-table"

export default function UserPage() {
    const { items, isLoading, error, selectedItem, setSelectedItem, handleCreate, handleUpdate, handleDelete } = useList<User>({
        fetchUrl: '/user',
        entityName: 'usuário',
    })

    const [formOpen, setFormOpen] = useState(false)

    const getUserTypeLabel = (type: string) => {
        return type === 'ADMIN' ? 'Administrador' : 'Usuário'
    }

    const columns: Column<User>[] = [
        {
            key: 'email',
            label: 'Email',
        },
        {
            key: 'userType',
            label: 'Tipo',
            render: (value) => getUserTypeLabel(value),
        },
        {
            key: 'createdAt',
            label: 'Data de criação',
            render: (value) => {
                if (!value) return ''
                return format(
                    new Date(value.endsWith('Z') ? value : value + 'Z'),
                    'dd/MM/yyyy HH:mm'
                )
            },
        },
    ]

    const handleSubmit = async (data: User) => {
        try {
            if (selectedItem) {
                await handleUpdate(data, `/user/${selectedItem.id}`, 'Usuário atualizado com sucesso!')
            } else {
                await handleCreate(data, '/user', 'Usuário criado com sucesso!')
            }
            setFormOpen(false)
        } catch (err) {
            console.error('Erro ao salvar:', err)
        }
    }

    const openEditForm = (user: User) => {
        setSelectedItem(user)
        setFormOpen(true)
    }

    const openCreateForm = () => {
        setSelectedItem(undefined)
        setFormOpen(true)
    }

    return (
        <>
            <Toaster richColors />

            <ListHeader
                title="Lista de Usuários"
                onCreate={openCreateForm}
                newButtonLabel="Novo Usuário"
            />

            <ListTable<User>
                columns={columns}
                items={items}
                isLoading={isLoading}
                error={error}
                emptyMessage="Nenhum usuário cadastrado"
                itemKey="id"
                onEdit={openEditForm}
                onDelete={(id) => handleDelete(id, `/user/${id}`, 'Usuário excluído com sucesso!')}
                colSpan={5}
            />

            <UserForm
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSubmit={handleSubmit}
                initialData={selectedItem}
                title={selectedItem ? "Editar Usuário" : "Novo Usuário"}
            />
        </>
    )
}
