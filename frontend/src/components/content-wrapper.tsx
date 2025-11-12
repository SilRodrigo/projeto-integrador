import React from 'react'

export default function ContentWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white mt-3 rounded-xl p-8 w-11/12 md:w-4/5 m-auto">
            {children}
        </div>
    )
}