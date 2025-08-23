import MainLayout from "@/Layouts/MainLayout";
import { Box, Button, Heading, Link } from "@chakra-ui/react";
import { Head, usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { auth } = usePage().props;
    return (
        <Box p={4}>
            <Head title="Dashboard" />
            <Heading>ダッシュボード</Heading>
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
        </Box>
    );
}
Dashboard.layout = (page) => <MainLayout children={page} />;
