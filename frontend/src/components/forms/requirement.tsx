import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Requirement } from "@/types/requirement"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { BaseForm } from "./BaseForm"

interface RequirementFormProps {
    open: boolean
    onClose: () => void
    onSubmit: (data: Requirement) => Promise<void>
    initialData?: Requirement
    title: string
    projectId: string
}

export function RequirementForm({
    open,
    onClose,
    onSubmit,
    initialData,
    title,
    projectId,
}: RequirementFormProps) {
    const defaultData: Requirement = {
        id: '',
        title: "",
        description: "",
        priority: "LOW",
        complexity: "LOW",
        isRequired: true,
        createdAt: "",
        projectId,
        versions: [],
    }

    return (
        <BaseForm<Requirement>
            open={open}
            onClose={onClose}
            onSubmit={onSubmit}
            initialData={initialData || defaultData}
            title={title}
        >
            {(formData, setFormData) => (
                <>
                    <div>
                        <Label htmlFor="title">Título</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                    <div>
                        <Label htmlFor="priority">Prioridade</Label>
                        <Select value={formData.priority} onValueChange={(value: string) =>
                            setFormData({ ...formData, priority: value as Requirement["priority"] })
                        }>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione uma prioridade" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Prioridades</SelectLabel>
                                    <SelectItem value="LOW">Baixa</SelectItem>
                                    <SelectItem value="MEDIUM">Média</SelectItem>
                                    <SelectItem value="HIGH">Alta</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="complexity">Complexidade</Label>
                        <Select value={formData.complexity} onValueChange={(value: string) =>
                            setFormData({ ...formData, complexity: value as Requirement["complexity"] })
                        }>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione uma complexidade" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Complexidades</SelectLabel>
                                    <SelectItem value="LOW">Baixa</SelectItem>
                                    <SelectItem value="MEDIUM">Média</SelectItem>
                                    <SelectItem value="HIGH">Alta</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="isRequired">Tipo de Requisito</Label>
                        <Select value={formData.isRequired ? "true" : "false"} onValueChange={(value: string) =>
                            setFormData({ ...formData, isRequired: value === "true" })
                        }>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Tipos</SelectLabel>
                                    <SelectItem value="true">Funcional</SelectItem>
                                    <SelectItem value="false">Não-Funcional</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </>
            )}
        </BaseForm>
    )
}