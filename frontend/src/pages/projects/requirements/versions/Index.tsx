import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { RequirementVersionForm } from "@/components/forms/RequirementVersion"
import { Toaster } from "@/components/ui/sonner"
import { format } from "date-fns"
import type { RequirementVersion } from "@/types/requirementVersion"
import { ReturnButton } from "@/components/return-button"
import { useApi } from "@/hooks/useApi"
import { useList } from "@/hooks/useList"
import { ListHeader } from "@/components/list-header"
import { ListTable, type Column } from "@/components/list-table"

export default function RequirementVersionPage() {
  const { projectId, requirementId } = useParams()
  const api = useApi()
  const [requirement, setRequirement] = useState<{
    id: string
    title: string
  }>()
  const { items, isLoading, error, selectedItem, setSelectedItem, handleCreate, handleUpdate, handleDelete } = useList<RequirementVersion>({
    fetchUrl: `/requirement/${requirementId}/version?order={"createdAt":"desc"}`,
    entityName: 'versão',
  })
  const [formOpen, setFormOpen] = useState(false)

  useEffect(() => {
    const fetchRequirement = async () => {
      try {
        const { data } = await api(`/requirement/${requirementId}`)
        setRequirement(data)
      } catch (err) {
        console.error('Erro ao carregar requisito:', err)
      }
    }
    fetchRequirement()
  }, [requirementId])

  const columns: Column<RequirementVersion>[] = [
    {
      key: 'versionNumber',
      label: 'Versão',
      render: (value) => <span className="font-semibold">{value}</span>,
    },
    {
      key: 'description',
      label: 'Descrição',
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

  const handleSubmit = async (data: RequirementVersion) => {
    try {
      if (selectedItem) {
        await handleUpdate(data, `/version/${selectedItem.id}`, 'Versão atualizada com sucesso!')
      } else {
        await handleCreate(data, `/requirement/${requirementId}/version`, 'Versão criada com sucesso!')
      }
      setFormOpen(false)
    } catch (err) {
      console.error('Erro ao salvar:', err)
    }
  }

  const openEditForm = (version: RequirementVersion) => {
    setSelectedItem(version)
    setFormOpen(true)
  }

  const openCreateForm = () => {
    setSelectedItem(undefined)
    setFormOpen(true)
  }

  return (
    <>
      <Toaster richColors />

      <div>
        <ReturnButton
          className="cursor-pointer mb-3"
          href={`/projects/${projectId}/requirements`}
          title="Voltar para requisitos"
        />
      </div>

      <ListHeader
        title={`Versões de ${requirement?.title}`}
        onCreate={openCreateForm}
        newButtonLabel="Nova Versão"
      />

      <ListTable<RequirementVersion>
        columns={columns}
        items={items}
        isLoading={isLoading}
        error={error}
        emptyMessage="Nenhuma versão cadastrada"
        itemKey="id"
        onEdit={openEditForm}
        onDelete={(id) => handleDelete(id, `/version/${id}`, 'Versão excluída com sucesso!')}
        colSpan={5}
      />

      <RequirementVersionForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedItem}
        title={selectedItem ? "Editar Versão" : "Nova Versão"}
        requirementId={requirementId || ''}
      />
    </>
  )
}
