import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Treino } from "@/types/treino"

interface TreinoFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: Treino) => Promise<void>
  initialData?: Treino
  title: string
  tipoList: Array<{
    id: number
    descricao: string
  }>
}

export function TreinoForm({
  open,
  onClose,
  onSubmit,
  initialData,
  title,
  tipoList = []
}: TreinoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<Treino>({
    descricao: "",
    dataHora: "",
    tipoId: 0,
    tipo: {
      id: 0,
      descricao: ''
    }
  })

  // Atualiza o formData quando o initialData mudar
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        dataHora: initialData.dataHora ? initialData.dataHora.split('T')[0] : ""
      })
    } else {
      setFormData({
        descricao: "",
        dataHora: "",
        tipoId: 0,
      })
    }
  }, [initialData])

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
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Input
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="dataHora">Data e Hora</Label>
            <Input
              id="dataHora"
              type="datetime-local"
              value={formData.dataHora}
              onChange={(e) => setFormData({ ...formData, dataHora: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="tipoId">Tipo</Label>
            <Select required onValueChange={(value) => setFormData({ ...formData, tipoId: Number(value) })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um tipo de treino" />
              </SelectTrigger>
              <SelectContent>
                {tipoList.map((item) => (
                  <SelectItem key={item.id} value={String(item.id)}>
                    {item.descricao}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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