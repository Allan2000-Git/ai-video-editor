import React from 'react'
import FramesList from './(components)/frames-list'
import { RemotionPlayer } from './(components)/remotion-player'

function CustomVideoEditorPage() {
    return (
        <div className="w-full h-full">
            <h1>Custom Video Editor</h1>
            <section className="mt-5">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
                    <div className="col-span-1">
                        <FramesList />
                    </div>
                    <div className="col-span-3">
                        <RemotionPlayer />
                    </div>
                    <div className="col-span-2">
                        Options
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CustomVideoEditorPage