import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { User } from "@/db/schema"
import { MAX_CREDITS } from "@/lib/constants"

export function SidebarCreditsUsedProgress({
    user,
}: {
    user: User | null
}) {
    return (
        <Card className="shadow-none">
            <CardHeader className="p-4 pb-0">
                <CardTitle className="text-sm">Credits Used</CardTitle>
                <CardDescription>
                    <Progress value={user?.credits} max={MAX_CREDITS} />
                    <p className="mt-2">{user?.credits} credits used of {MAX_CREDITS} credits</p>
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2.5 p-4">
                <Button
                    className="w-full"
                    size="sm"
                >
                    Buy Credits
                </Button>
            </CardContent>
        </Card>
    )
}