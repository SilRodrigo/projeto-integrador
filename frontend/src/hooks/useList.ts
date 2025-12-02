import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"
import { useApi } from "./useApi"

interface UseListOptions {
  fetchUrl: string
  entityName: string
  onFetchError?: string
}

export function useList<T extends { id?: string | number }>(options: UseListOptions) {
  const api = useApi()
  const [items, setItems] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<T | undefined>()
  const [refetchKey, setRefetchKey] = useState(0)

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const { data } = await api(options.fetchUrl)
        setItems(data.items || [])
      } catch (err) {
        const errorMessage = options.onFetchError || `Falha ao carregar a lista de ${options.entityName}`
        setError(errorMessage)
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchItems()
  }, [refetchKey, options.fetchUrl])

  const refetch = useCallback(() => {
    setRefetchKey((prev) => prev + 1)
  }, [])

  const handleCreate = async (data: T, createUrl: string, successMessage: string) => {
    try {
      await api(createUrl, {
        method: 'POST',
        body: JSON.stringify(data),
      })

      toast.success(successMessage)
      refetch()
    } catch (err: any) {
      console.error('Erro ao criar:', err)
      toast.error(err?.message || `Erro ao criar ${options.entityName}`)
      throw err
    }
  }

  const handleUpdate = async (data: T, updateUrl: string, successMessage: string) => {
    if (!selectedItem?.id) return

    try {
      await api(updateUrl, {
        method: 'PUT',
        body: JSON.stringify(data),
      })

      toast.success(successMessage)
      refetch()
    } catch (err: any) {
      toast.error(err?.message || `Erro ao atualizar ${options.entityName}`)
      throw err
    }
  }

  const handleDelete = async (_id: string | number, deleteUrl: string, successMessage: string) => {
    if (!confirm(`Tem certeza que deseja excluir este ${options.entityName}?`)) {
      return
    }

    try {
      await api(deleteUrl, {
        method: 'DELETE',
      })

      toast.success(successMessage)
      refetch()
    } catch (err) {
      console.error('Erro ao excluir:', err)
      toast.error(`Erro ao excluir ${options.entityName}`)
    }
  }

  return {
    items,
    isLoading,
    error,
    selectedItem,
    setSelectedItem,
    handleCreate,
    handleUpdate,
    handleDelete,
  }
}
