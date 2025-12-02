import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"

export const ReturnButton = ({ href, title = "Voltar", ...props }: React.ComponentProps<"button"> & { href: string, title?: string }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(href)
    }

    return (
        <Button className="cursor-pointer" variant="outline" onClick={handleClick} {...props}>
            <ArrowLeft /> {title}
        </Button>
    )
}