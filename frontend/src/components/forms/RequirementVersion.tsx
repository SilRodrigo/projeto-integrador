import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { RequirementVersion } from "@/types/requirementVersion"
import { Textarea } from "../ui/textarea"
import { BaseForm } from "./BaseForm"

interface RequirementVersionFormProps {
    open: boolean
    onClose: () => void
    onSubmit: (data: RequirementVersion) => Promise<void>
    initialData?: RequirementVersion
    title: string
    requirementId: string
}

export function RequirementVersionForm({
    open,
    onClose,
    onSubmit,
    initialData,
    title,
    requirementId,
}: RequirementVersionFormProps) {
    const defaultData: RequirementVersion = {
        id: '',
        versionNumber: "",
        description: "",
        createdAt: "",
        requirementId,
    }

    return (
        <BaseForm<RequirementVersion>
            open={open}
            onClose={onClose}
            onSubmit={onSubmit}
            initialData={initialData || defaultData}
            title={title}
        >
            {(formData, setFormData) => (
                <>
                    <div>
                        <Label htmlFor="versionNumber">Número da Versão</Label>
                        <Input
                            id="versionNumber"
                            value={formData.versionNumber}
                            onChange={(e) => setFormData({ ...formData, versionNumber: e.target.value })}
                            placeholder="ex: 1.0.0"
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
