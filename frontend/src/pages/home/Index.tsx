import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { menuOptions } from '../../config/menuOptions'

export default function HomePage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          {/* Card do Usuário - Altura 100% */}
          <div className={`bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg flex flex-col`}>
            <div className="flex flex-col items-center text-center flex-1 justify-center gap-4">
              <img
                src={`https://api.thecatapi.com/v1/images/search?size=small&format=json&api_key=live_4s0P7E1sJfVi5qs3YhYoNc2zzUtGp0wnmVXNlyBp3vhDU2Q9z7hVJGZpbEqo2Qhq?t=${Math.random()}`}
                alt="Gatinho do perfil"
                className="w-20 h-20 rounded-full object-cover border-4 border-white/50"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/80/80?random=${Math.random()}`
                }}
              />
              <div>
                <h2 className="text-xl font-bold mb-1">
                  {user?.email || 'Nome do usuário'}
                </h2>
                <p className="text-white/90 text-sm">
                  {user?.userType === 'ADMIN' ? 'Administrador' : 'Usuário'}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Options */}
          <div className="lg:col-span-2 space-y-4">
            {menuOptions.filter(option => option.title !== 'Home').map((option) => {
              const IconComponent = option.icon
              return (
                <button
                  key={option.title}
                  onClick={() => navigate(option.path)}
                  className={`w-full p-6 rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all hover:shadow-md hover:bg-slate-50 cursor-pointer`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-slate-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-slate-900 text-lg">
                        {option.title}
                      </h3>
                      <p className="text-slate-500 text-sm mt-1">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
