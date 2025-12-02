import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Project } from "@/types/project"
import { Textarea } from "../ui/textarea"
import { BaseForm } from "./BaseForm"

interface ProjectFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: Project) => Promise<void>
  initialData?: Project
  title: string
}

export function ProjectForm({
  open,
  onClose,
  onSubmit,
  initialData,
  title,
}: ProjectFormProps) {
  return (
    <BaseForm<Project>
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialData={initialData}
      title={title}
    >
      {(formData, setFormData) => (
        <>
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
        </>
      )}
    </BaseForm>
  )
}