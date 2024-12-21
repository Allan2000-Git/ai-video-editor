import React from 'react'
import { UserProfile } from '@clerk/nextjs';

function AccountSettingsPage() {
    return (
        <div className="w-full flex items-center justify-center">
            <UserProfile />
        </div>
    )
}

export default AccountSettingsPage