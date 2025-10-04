import React from 'react'

export default function ContentWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="py-12 w-4/5 m-auto">
            {children}
        </div>
    )
}