import React from 'react'

export default function ContentWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
            <div className="flex-1 flex items-start justify-center px-4 py-8">
                <div className="bg-white rounded-xl p-4 md:p-8 w-full md:w-4/5 shadow-lg">
                    <div className='container mx-auto flex flex-col gap-3'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}