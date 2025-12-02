import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { useAdminAccess } from "@/hooks/useAdminAccess"

interface ListHeaderProps {
  title: string
  onCreate?: () => void
  newButtonLabel?: string
  headerActions?: ReactNode
}

export function ListHeader({ title, onCreate, newButtonLabel = "Novo", headerActions }: ListHeaderProps) {
  const isAdmin = useAdminAccess()

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex items-center gap-2">
        {headerActions}
        {onCreate && isAdmin && <Button className="cursor-pointer" onClick={onCreate}>{newButtonLabel}</Button>}
      </div>
    </div>
  )
}
