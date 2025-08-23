import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Box, Button, Link } from "@chakra-ui/react";
import { Head, usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { auth } = usePage().props;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <Box m={4}>
                <Link
                    href={route("review.index.user", { userId: auth.user.id })}
                >
                    <Button colorScheme="blue">投稿したレビュー</Button>
                </Link>
            </Box>

            <Box m={4}>
                <Link href={route("shop.index.user", { userId: auth.user.id })}>
                    <Button colorScheme="green">関連する店舗</Button>
                </Link>
            </Box>
        </AuthenticatedLayout>
    );
}
