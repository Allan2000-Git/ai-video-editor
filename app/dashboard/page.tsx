import Image from 'next/image'
import React from 'react'

function DashboardPage() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full flex flex-col items-center justify-center gap-4">
                <Image
                src={'/empty-state-placeholder.svg'}
                alt='Empty state placeholder image'
                width={150}
                height={150}
                />
                <p className="text-lg text-muted-foreground">No videos created yet. So create one!</p>
            </div>
        </div>
    )
}

export default DashboardPage