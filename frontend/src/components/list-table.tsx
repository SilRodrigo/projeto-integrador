import type { ReactNode } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { Pencil, Trash } from "lucide-react"
import { useAdminAccess } from "@/hooks/useAdminAccess"

export interface Column<T> {
    key: keyof T
    label: string
    render?: (value: any, item: T) => ReactNode
}

export interface RowAction {
    label: string
    icon: ReactNode
    variant?: "outline" | "destructive" | "default"
    className?: string
    onClick: (item: any) => void
    showFor?: "all" | "admin"
}

interface ListTableProps<T> {
    columns: Column<T>[]
    items: T[]
    isLoading: boolean
    error: string | null
    emptyMessage: string
    itemKey: keyof T
    rowActions?: RowAction[]
    onEdit?: (item: T) => void
    onDelete?: (id: string | number) => void
    colSpan?: number
}

export function ListTable<T extends { id?: string | number }>({
    columns,
    items,
    isLoading,
    error,
    emptyMessage,
    itemKey,
    rowActions = [],
    onEdit,
    onDelete,
    colSpan,
}: ListTableProps<T>) {
    const isAdmin = useAdminAccess()

    const totalColSpan = colSpan || columns.length + (rowActions.length > 0 || onEdit || onDelete ? 1 : 0)

    const allActions: RowAction[] = [
        ...rowActions,
        ...(onEdit
            ? [
                {
                    label: "Editar",
                    icon: <Pencil />,
                    variant: "outline" as const,
                    className: "cursor-pointer",
                    onClick: onEdit,
                    showFor: "admin" as const,
                },
            ]
            : []),
        ...(onDelete
            ? [
                {
                    label: "Excluir",
                    icon: <Trash />,
                    variant: "destructive" as const,
                    className: "cursor-pointer hover:bg-red-700",
                    onClick: (item: T) => onDelete(item.id!),
                    showFor: "admin" as const,
                },
            ]
            : []),
    ]

    return (
        <>
            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertTitle>Erro</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((col) => (
                                <TableHead key={String(col.key)}>{col.label}</TableHead>
                            ))}
                            {allActions.length > 0 && (isAdmin || allActions.find(action => action.showFor === "all"))
                                && <TableHead className="text-right">Ações</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={totalColSpan} className="text-center">
                                    Carregando...
                                </TableCell>
                            </TableRow>
                        ) : items.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={totalColSpan} className="text-center">
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        ) : (
                            items.map((item) => (
                                <TableRow key={String(item[itemKey])}>
                                    {columns.map((col) => (
                                        <TableCell key={String(col.key)}>
                                            {col.render ? col.render(item[col.key], item) : String(item[col.key] ?? "")}
                                        </TableCell>
                                    ))}
                                    {allActions.length > 0 && (isAdmin || allActions.find(action => action.showFor === "all")) && (
                                        <TableCell className="text-right space-x-2 flex items-center justify-end">
                                            {allActions.map((action, idx) => (
                                                (action.showFor === "all" || isAdmin) && (
                                                    <Button
                                                        key={idx}
                                                        variant={action.variant || "outline"}
                                                        size={action.variant === "outline" || action.variant === "destructive" ? "icon" : "sm"}
                                                        title={action.label}
                                                        className={action.className}
                                                        onClick={() => action.onClick(item)}
                                                    >
                                                        {action.icon}
                                                    </Button>
                                                )
                                            ))}
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
