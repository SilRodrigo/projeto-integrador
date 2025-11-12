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
import type { Requirement } from "@/types/requirement"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"

interface RequirementFormProps {
    open: boolean
    onClose: () => void
    onSubmit: (data: Requirement) => Promise<void>
    initialData?: Requirement
    title: string
}

export function RequirementForm({
    open,
    onClose,
    onSubmit,
    initialData,
    title,
}: RequirementFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState<Requirement>({
        id: 0,
        title: "",
        description: "",
        priority: "Low",
        complexity: "Low",
        createdAt: "",
        projectId: 0,
    })

    useEffect(() => {
        if (initialData) {
            setFormData(initialData)
        } else {
            setFormData({
                id: 0,
                title: "",
                description: "",
                priority: "Low",
                complexity: "Low",
                createdAt: "",
                projectId: 0,
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
                                    <SelectItem value="Low">Baixa</SelectItem>
                                    <SelectItem value="Medium">Média</SelectItem>
                                    <SelectItem value="High">Alta</SelectItem>
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
                                    <SelectItem value="Low">Baixa</SelectItem>
                                    <SelectItem value="Medium">Média</SelectItem>
                                    <SelectItem value="High">Alta</SelectItem>
                                </SelectGroup>
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