import { useState, useEffect, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog"

export interface BaseFormProps<T> {
  open: boolean
  onClose: () => void
  onSubmit: (data: T) => Promise<void>
  initialData?: T
  title: string
  children: (data: T, setData: (data: T) => void) => ReactNode
}

export function BaseForm<T extends Record<string, any>>({
  open,
  onClose,
  onSubmit,
  initialData,
  title,
  children,
}: BaseFormProps<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<T>(initialData || ({} as T))

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)

      return;
    }
    setFormData({} as T)
  }, [open])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit(formData)
      onClose()
    } catch (error) {
      console.error("Erro ao salvar:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Preencha os dados</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {children(formData, setFormData)}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
