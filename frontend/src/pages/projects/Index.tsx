import { useState } from "react"
import { ProjectForm } from "@/components/forms/Project"
import type { Project } from "@/types/project"
import { format } from "date-fns"
import { Toaster } from "@/components/ui/sonner"
import { useNavigate } from "react-router-dom"
import { useList } from "@/hooks/useList"
import { ListHeader } from "@/components/list-header"
import { ListTable, type Column, type RowAction } from "@/components/list-table"

export default function ProjectPage() {
    const { items, isLoading, error, selectedItem, setSelectedItem, handleCreate, handleUpdate, handleDelete } = useList<Project>({
        fetchUrl: '/project',
        entityName: 'projeto',
    })
    const navigate = useNavigate()
    const [formOpen, setFormOpen] = useState(false)

    const columns: Column<Project>[] = [
        {
            key: 'name',
            label: 'Nome',
        },
        {
            key: 'description',
            label: 'Descrição',
            render: (value) => (
                <div
                    className="max-w-[320px] break-words whitespace-normal overflow-hidden"
                    title={value}
                >
                    {value}
                </div>
            ),
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
        {
            key: 'requirements',
            label: 'Nº de requisitos',
            render: (value) => value?.length || 0,
        },
    ]

    const rowActions: RowAction[] = [
        {
            label: 'Ir para requisitos',
            icon: 'Ir para requisitos',
            variant: 'default' as const,
            className: 'bg-green-600 hover:bg-green-700 text-white hover:text-white cursor-pointer',
            onClick: (project: Project) => navigate(`/projects/${project.id}/requirements`),
            showFor: 'all' as const,
        },
    ]

    const handleSubmit = async (data: Project) => {
        try {
            if (selectedItem) {
                await handleUpdate(data, `/project/${selectedItem.id}`, 'Projeto atualizado com sucesso!')
            } else {
                await handleCreate(data, '/project', 'Projeto criado com sucesso!')
            }
            setFormOpen(false)
        } catch (err) {
            console.error('Erro ao salvar:', err)
        }
    }

    const openEditForm = (project: Project) => {
        setSelectedItem(project)
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
                title="Lista de Projetos"
                onCreate={openCreateForm}
                newButtonLabel="Novo Projeto"
            />

            <ListTable<Project>
                columns={columns}
                items={items}
                isLoading={isLoading}
                error={error}
                emptyMessage="Nenhum projeto cadastrado"
                itemKey="id"
                rowActions={rowActions}
                onEdit={openEditForm}
                onDelete={(id) => handleDelete(id, `/project/${id}`, 'Projeto excluído com sucesso!')}
                colSpan={6}
            />

            <ProjectForm
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSubmit={handleSubmit}
                initialData={selectedItem}
                title={selectedItem ? "Editar Projeto" : "Novo Projeto"}
            />
        </>
    )
}