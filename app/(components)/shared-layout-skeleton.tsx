import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function SharedLayoutSkeleton() {
    return (
        <div className="p-4">
            <Skeleton className="w-[200px] h-[20px] rounded-full" />
            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-4">
                {
                    Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} className="w-[300px] h-[200px] rounded-md" />
                    ))
                }
            </div>
        </div>
    )
}

export default SharedLayoutSkeleton