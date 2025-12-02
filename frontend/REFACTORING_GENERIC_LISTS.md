# Refatoração de Listas Genéricas

## Estrutura Criada

### 1. **Hook Genérico: `useList`** (`src/hooks/useList.ts`)
Centraliza toda a lógica de CRUD para listas:
- Busca de dados (fetch)
- Criar item
- Atualizar item
- Deletar item
- Gerenciamento de estado (loading, erro, seleção)

**Uso:**
```tsx
const { items, isLoading, error, selectedItem, handleCreate, handleUpdate, handleDelete } = useList<User>({
  fetchUrl: '/user',
  entityName: 'usuário',
})
```

---

### 2. **Componente: `ListHeader`** (`src/components/list-header.tsx`)
Padroniza o cabeçalho de todas as listas:
- Título
- Botão "Novo..." (oculto para não-admin)
- Suporte a ações customizadas

**Uso:**
```tsx
<ListHeader
  title="Lista de Usuários"
  onCreate={openCreateForm}
  newButtonLabel="Novo Usuário"
/>
```

---

### 3. **Componente: `ListTable`** (`src/components/list-table.tsx`)
Renderiza tabela genérica com funcionalidades:
- Colunas customizáveis com renderização personalizada
- Ações de linha (editar, deletar, customizadas)
- Controle de acesso por admin
- Loading e estado vazio

**Uso:**
```tsx
<ListTable<User>
  columns={columns}
  items={items}
  isLoading={isLoading}
  error={error}
  emptyMessage="Nenhum usuário cadastrado"
  itemKey="id"
  onEdit={openEditForm}
  onDelete={(id) => handleDelete(id, `/user/${id}`, 'Sucesso!')}
/>
```

---

## Páginas Refatoradas

### ✅ Usuários (`src/pages/users/Index.tsx`)
- **Antes:** 223 linhas
- **Depois:** ~75 linhas
- **Redução:** 66%

### ✅ Projetos (`src/pages/projects/Index.tsx`)
- **Antes:** 237 linhas
- **Depois:** ~88 linhas
- **Redução:** 63%
- Mantém ação customizada "Ir para requisitos"

### ✅ Requisitos (`src/pages/projects/requirements/Index.tsx`)
- **Antes:** 291 linhas
- **Depois:** ~120 linhas
- **Redução:** 59%
- Mantém ação customizada "Ir para versão"
- Renderizações customizadas (prioridade, complexidade, tipo)

### ✅ Versões de Requisitos (`src/pages/projects/requirements/versions/Index.tsx`)
- **Antes:** 250 linhas
- **Depois:** ~108 linhas
- **Redução:** 57%

---

## Benefícios

✅ **Menos duplicação de código** - Padrão único para todas as listas  
✅ **Mais manuível** - Alterações em um lugar afetam todas as listas  
✅ **Escalável** - Adicionar nova lista é questão de minutos  
✅ **Type-safe** - TypeScript genérico garante tipagem correta  
✅ **Controle de acesso** - Admin check centralizado  
✅ **Flexível** - Suporta renderizações e ações customizadas  

---

## Exemplo: Criar Nova Lista

```tsx
import { useState } from "react"
import { useList } from "@/hooks/useList"
import { ListHeader } from "@/components/list-header"
import { ListTable, type Column } from "@/components/list-table"

export default function NewListPage() {
  const { items, isLoading, error, selectedItem, handleCreate, handleUpdate, handleDelete } = useList({
    fetchUrl: '/items',
    entityName: 'item',
  })
  
  const [formOpen, setFormOpen] = useState(false)

  const columns: Column<Item>[] = [
    { key: 'name', label: 'Nome' },
    { key: 'createdAt', label: 'Data', render: (v) => format(new Date(v), 'dd/MM/yyyy') },
  ]

  return (
    <>
      <ListHeader title="Meus Itens" onCreate={() => setFormOpen(true)} />
      <ListTable
        columns={columns}
        items={items}
        isLoading={isLoading}
        error={error}
        emptyMessage="Nenhum item"
        itemKey="id"
        onEdit={(item) => console.log(item)}
        onDelete={(id) => handleDelete(id, `/items/${id}`, 'Deletado!')}
      />
      <ItemForm open={formOpen} onClose={() => setFormOpen(false)} />
    </>
  )
}
```
