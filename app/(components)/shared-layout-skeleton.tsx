import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function SharedLayoutSkeleton() {
    return (
        <div className="p-4">
            <Skeleton className="w-[200px] h-[20px] rounded-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} className="w-[200px] h-[200px] rounded-md" />
                    ))
                }
            </div>
        </div>
    )
}

export default SharedLayoutSkeleton