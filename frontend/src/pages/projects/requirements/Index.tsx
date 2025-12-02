import { useState, useEffect, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { RequirementForm } from "@/components/forms/Requirement"
import { Toaster } from "@/components/ui/sonner"
import { format } from "date-fns"
import type { Requirement, Complexity, Priority } from "@/types/requirement"
import { ReturnButton } from "@/components/return-button"
import { useApi } from "@/hooks/useApi"
import { useList } from "@/hooks/useList"
import type { Project } from "@/types/project"
import { ListHeader } from "@/components/list-header"
import { ListTable, type Column, type RowAction } from "@/components/list-table"

import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { RequirementsReportExporter } from "./RequirementsReportExporter"

export default function RequirementPage() {
  const { projectId } = useParams()
  const api = useApi()
  const navigate = useNavigate()
  const [project, setProject] = useState<Project>()
  const [formOpen, setFormOpen] = useState(false)
  const [isRequiredFilter, setIsRequiredFilter] = useState<'all' | 'functional' | 'nonFunctional'>('all')
  const [priorityOrder, setPriorityOrder] = useState<'none' | 'asc' | 'desc'>('none')

  const orderObj = useMemo(() => {
    if (priorityOrder === 'none') return undefined
    return { priority: priorityOrder === 'asc' ? 'asc' : 'desc' }
  }, [priorityOrder])

  const filterObj = useMemo(() => {
    if (isRequiredFilter === 'all') return undefined
    return { isRequired: isRequiredFilter === 'functional' }
  }, [isRequiredFilter])

  const fetchUrl = useMemo(() => {
    const parts: string[] = []
    if (orderObj) {
      parts.push(`order=${encodeURIComponent(JSON.stringify(orderObj))}`)
    }
    if (filterObj) {
      parts.push(`filter=${encodeURIComponent(JSON.stringify(filterObj))}`)
    }
    const qs = parts.length ? `?${parts.join('&')}` : ''
    return `/project/${projectId}/requirement${qs}`
  }, [projectId, orderObj, filterObj])

  const { items, isLoading, error, selectedItem, setSelectedItem, handleCreate, handleUpdate, handleDelete } = useList<Requirement>({
    fetchUrl,
    entityName: 'requisito',
  })

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await api(`/project/${projectId}`)
        setProject(data)
      } catch (err) {
        console.error('Erro ao carregar projeto:', err)
      }
    }
    fetchProject()
  }, [projectId])

  const getComplexityLabel = (complexity: Complexity) => {
    switch (complexity) {
      case 'LOW':
        return 'Baixa'
      case 'MEDIUM':
        return 'Média'
      case 'HIGH':
        return 'Alta'
      default:
        return complexity
    }
  }

  const getPriorityLabel = (priority: Priority) => {
    switch (priority) {
      case 'LOW':
        return 'Baixa'
      case 'MEDIUM':
        return 'Média'
      case 'HIGH':
        return 'Alta'
      default:
        return priority
    }
  }

  const columns: Column<Requirement>[] = [
    {
      key: 'title',
      label: 'Título',
    },
    {
      key: 'description',
      label: 'Descrição',
    },
    {
      key: 'priority',
      label: 'Prioridade',
      render: (value) => getPriorityLabel(value),
    },
    {
      key: 'complexity',
      label: 'Complexidade',
      render: (value) => getComplexityLabel(value),
    },
    {
      key: 'isRequired',
      label: 'Tipo',
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${value
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-800'
            }`}
        >
          {value ? 'Funcional' : 'Não-Funcional'}
        </span>
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
      key: 'versions',
      label: 'Versão atual',
      render: (value) => (value && value.length > 0 ? value[0].versionNumber : '-'),
    },
  ]

  const rowActions: RowAction[] = [
    {
      label: 'Ir para versão',
      icon: 'Ir para versão',
      variant: 'default' as const,
      className: 'bg-green-600 hover:bg-green-700 text-white hover:text-white cursor-pointer',
      onClick: (req: Requirement) => navigate(`${req.id}/versions`),
      showFor: 'all' as const,
    },
  ]

  const handleSubmit = async (data: Requirement) => {
    try {
      if (selectedItem) {
        await handleUpdate(data, `/requirement/${selectedItem.id}`, 'Requisito atualizado com sucesso!')
      } else {
        await handleCreate(data, `/project/${projectId}/requirement`, 'Requisito criado com sucesso!')
      }
      setFormOpen(false)
    } catch (err) {
      console.error('Erro ao salvar:', err)
    }
  }

  const openEditForm = (req: Requirement) => {
    setSelectedItem(req)
    setFormOpen(true)
  }

  const openCreateForm = () => {
    setSelectedItem(undefined)
    setFormOpen(true)
  }

  return (
    <>
      <Toaster richColors />
      <div className="flex justify-between">
        <ReturnButton href={`/projects`} title="Voltar para projetos" />
        <RequirementsReportExporter
          items={items}
          project={project}
          filters={{ isRequiredFilter, priorityOrder }}
        />
      </div>
      <ListHeader
        title={`Requisitos de ${project?.name}`}
        onCreate={openCreateForm}
        newButtonLabel="Novo Requisito"
      />

      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="filter-type" className="mr-2">Filtrar tipo:</Label>
          <Select
            value={isRequiredFilter}
            onValueChange={(value: string) => setIsRequiredFilter(value as any)}
          >
            <SelectTrigger id="filter-type" className="w-56">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tipo</SelectLabel>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="functional">Funcional</SelectItem>
                <SelectItem value="nonFunctional">Não-Funcional</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Label htmlFor="order-priority" className="mr-2">Ordenar prioridade:</Label>
          <Select
            value={priorityOrder}
            onValueChange={(value: string) => setPriorityOrder(value as any)}
          >
            <SelectTrigger id="order-priority" className="w-72">
              <SelectValue placeholder="Nenhum" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Ordenação</SelectLabel>
                <SelectItem value="none">Nenhum</SelectItem>
                <SelectItem value="desc">Maior → Menor (Alta → Baixa)</SelectItem>
                <SelectItem value="asc">Menor → Maior (Baixa → Alta)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center md:ml-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsRequiredFilter('all')
              setPriorityOrder('none')
            }}
          >
            Limpar
          </Button>
        </div>
      </div>

      <ListTable<Requirement>
        columns={columns}
        items={items}
        isLoading={isLoading}
        error={error}
        emptyMessage="Nenhum requisito cadastrado"
        itemKey="id"
        rowActions={rowActions}
        onEdit={openEditForm}
        onDelete={(id) => handleDelete(id, `/requirement/${id}`, 'Requisito excluído com sucesso!')}
        colSpan={9}
      />

      <RequirementForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedItem}
        title={selectedItem ? "Editar Requisito" : "Novo Requisito"}
        projectId={project?.id || ''}
      />
    </>
  )
}
