import { Home, Folder, Users, LogOut } from 'lucide-react'

export const menuOptions = [
  {
    title: 'Home',
    description: 'Página inicial',
    icon: Home,
    path: '/',
  },
  {
    title: 'Projetos',
    description: 'Gerencie seus projetos e tarefas',
    icon: Folder,
    path: '/projects',
  },
  {
    title: 'Usuários',
    description: 'Gerencie os usuários do sistema',
    icon: Users,
    path: '/users',
  },
  {
    title: 'Logout',
    description: 'Deslogar da sua conta',
    icon: LogOut,
    path: '/logout',
  }
]
