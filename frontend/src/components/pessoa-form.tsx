import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Pessoa } from "@/types/pessoa"

interface PessoaFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: Pessoa) => Promise<void>
  initialData?: Pessoa
  title: string
}

export function PessoaForm({ 
  open, 
  onClose, 
  onSubmit, 
  initialData, 
  title 
}: PessoaFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<Pessoa>({
    nome: "",
    email: "",
    telefone: "",
    dataNascimento: ""
  })

  // Atualiza o formData quando o initialData mudar
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        dataNascimento: initialData.dataNascimento ? initialData.dataNascimento.split('T')[0] : ""
      })
    } else {
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        dataNascimento: ""
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
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={formData.telefone}
              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="dataNascimento">Data de Nascimento</Label>
            <Input
              id="dataNascimento"
              type="date"
              value={formData.dataNascimento}
              onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
              required
            />
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