import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { User } from "@/types/user"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BaseForm } from "./BaseForm"

interface UserFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: User) => Promise<void>
  initialData?: User
  title: string
}

export function UserForm({
  open,
  onClose,
  onSubmit,
  initialData,
  title,
}: UserFormProps) {
  const defaultData: User = {
    id: 0,
    name: "",
    email: "",
    password: "",
    userType: "USER",
    createdAt: "",
  }

  return (
    <BaseForm<User>
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialData={initialData || defaultData}
      title={title}
    >
      {(formData, setFormData) => (
        <>
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
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required={!initialData}
              placeholder={initialData ? "Deixe em branco para manter a atual" : ""}
            />
          </div>
          <div>
            <Label htmlFor="type">Tipo</Label>
            <Select
              value={formData.userType}
              onValueChange={(value) => setFormData({ ...formData, userType: value as "USER" | "ADMIN" })}
            >
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">Usuário</SelectItem>
                <SelectItem value="ADMIN">Administrador</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </BaseForm>
  )
}
