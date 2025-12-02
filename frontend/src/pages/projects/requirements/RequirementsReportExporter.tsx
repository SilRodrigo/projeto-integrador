import { useMemo, useState } from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import type { Requirement } from "@/types/requirement"
import type { Project } from "@/types/project"

interface Props {
    items: Requirement[]
    project?: Project
    filters?: { isRequiredFilter?: string; priorityOrder?: string }
}

export function RequirementsReportExporter({ items, project, filters }: Props) {
    const [isGenerating, setIsGenerating] = useState(false)

    const generationLabel = useMemo(() => {
        return format(new Date(), "dd/MM/yyyy 'às' HH:mm")
    }, [])

    const escapeHtml = (str?: string) => {
        if (!str) return ""
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
    }

    const getFilterHeaderTypeLabel = (isRequiredFilter?: string) => {
        switch (isRequiredFilter) {
            case "functional":
                return "Funcional"
            case "nonFunctional":
                return "Não-Funcional"
            default:
                return "Todos"
        }
    }

    const getOrderHeaderTypeLabel = (priorityOrder?: string) => {
        switch (priorityOrder) {
            case "asc":
                return "Crescente"
            case "desc":
                return "Decrescente"
            default:
                return "Nenhum"
        }
    }

    const buildReportHtml = () => {
        const projectName = project?.name || "—"
        const headerFilters = `
      <div><strong>Filtros:</strong> Tipo = ${getFilterHeaderTypeLabel(filters?.isRequiredFilter)}; Ordenação por prioridade = ${getOrderHeaderTypeLabel(filters?.priorityOrder)}</div>
    `

        const rows = items
            .map((r) => {
                const isReq = r.isRequired ? "Funcional" : "Não-Funcional"
                const createdAt = r.createdAt
                    ? format(
                        new Date(r.createdAt.endsWith("Z") ? r.createdAt : r.createdAt + "Z"),
                        "dd/MM/yyyy HH:mm"
                    )
                    : ""
                const version =
                    r.versions && r.versions.length ? r.versions[0].versionNumber : "-"
                const priority =
                    r.priority === "HIGH"
                        ? "Alta"
                        : r.priority === "MEDIUM"
                            ? "Média"
                            : "Baixa"
                const complexity =
                    r.complexity === "HIGH"
                        ? "Alta"
                        : r.complexity === "MEDIUM"
                            ? "Média"
                            : "Baixa"

                return `<tr>
          <td class="cell title">${escapeHtml(r.title)}</td>
          <td class="cell desc">${escapeHtml(r.description || "-")}</td>
          <td class="cell small">${priority}</td>
          <td class="cell small">${complexity}</td>
          <td class="cell small">${isReq}</td>
          <td class="cell small">${createdAt}</td>
          <td class="cell small">${version}</td>
        </tr>`
            })
            .join("")

        return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Relatório de Requisitos - ${escapeHtml(projectName)}</title>
<style>
  @page { size: A4; margin: 20mm; }
  html, body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; font-size: 12px; color: #111827; margin: 0; padding: 0; }
  .report { width: 100%; box-sizing: border-box; padding: 8px 0; }
  header { display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px; }
  .title { font-size: 18px; font-weight: 600; }
  .meta { text-align: right; font-size: 12px; color: #374151; }
  .section { margin-top: 8px; margin-bottom: 12px; }
  table { width: 100%; border-collapse: collapse; margin-top: 8px; }
  th, td { border: 1px solid #E5E7EB; padding: 8px 10px; vertical-align: top; }
  th { background: #F9FAFB; text-align: left; font-weight: 600; }
  td.small { font-size: 12px; width: 90px; max-width: 120px; }
  td.title { width: 220px; }
  td.desc { white-space: pre-wrap; word-break: break-word; }
  .footer { margin-top: 18px; font-size: 12px; color: #6B7280; }
</style>
</head>
<body>
  <div class="report">
    <header>
      <div>
        <div class="title">Relatório de Requisitos</div>
        <div style="font-size:13px; color:#374151;">Projeto: ${escapeHtml(
            projectName
        )}</div>
      </div>
      <div class="meta">
        <div>${generationLabel}</div>
        ${headerFilters}
      </div>
    </header>

    <div class="section">
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Prioridade</th>
            <th>Complexidade</th>
            <th>Tipo</th>
            <th>Data de criação</th>
            <th>Versão atual</th>
          </tr>
        </thead>
        <tbody>
          ${rows ||
            `<tr><td colspan="7" style="text-align:center; padding: 18px 0;">Nenhum requisito</td></tr>`
            }
        </tbody>
      </table>
    </div>

    <div class="footer">Gerado por sistema • ${generationLabel}</div>
  </div>
</body>
</html>`
    }

    const handleGenerate = async () => {
        try {
            setIsGenerating(true);
            const html = buildReportHtml();
            const filename = `requisitos_${project?.id || "project"}.pdf`;

            const res = await fetch("http://localhost:4000/api/v1/pdf/html", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ html, filename }),
                credentials: "same-origin",
            });

            if (!res.ok) throw new Error();

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
            toast.success("PDF gerado e baixado");
        } catch {
            toast.error("Erro ao gerar PDF");
        } finally {
            setIsGenerating(false);
        }
    };


    return (
        <div className="space-y-3">
            <div className="flex gap-2 items-center">
                <div className="text-sm text-muted-foreground ml-2">
                    {items.length} requisito(s)
                </div>
                <Button onClick={handleGenerate} disabled={isGenerating || items.length === 0}>
                    {isGenerating ? "Gerando..." : "Exportar para PDF"}
                </Button>
            </div>
        </div>
    )
}
