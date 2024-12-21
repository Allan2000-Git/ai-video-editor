import Image from 'next/image'
import React from 'react'

function DashboardPage() {
    return (
        <div className="w-full">
            <div className="w-full flex flex-col items-center justify-center gap-2">
                <Image
                src={'/empty-state-placeholder.svg'}
                alt='Empty state placeholder image'
                width={100}
                height={100}
                />
                <p>No data</p>
            </div>
        </div>
    )
}

export default DashboardPage