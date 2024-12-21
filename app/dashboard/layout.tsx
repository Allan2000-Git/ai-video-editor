import SharedLayout from "../shared/layout"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SharedLayout>{children}</SharedLayout>
    )
}
