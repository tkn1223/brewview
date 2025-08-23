import ReviewList from "@/Components/Organisms/ReviewList";
import MainLayout from "@/Layouts/MainLayout";
import { Box, Heading } from "@chakra-ui/react";

const IndexByUser = (props) => {
    return (
        <>
            {props.reviews.length > 0 ? (
                <Box p={4}>
                    <Heading m={4} fontSize={{ base: "24", md: "36" }}>
                        {props.user.name}のマイレビュー一覧
                    </Heading>
                    <ReviewList reviews={props.reviews} />
                </Box>
            ) : (
                <Box>
                    <Heading fontSize={{ base: "24", md: "36" }}>
                        レビューがありません
                    </Heading>
                </Box>
            )}
        </>
    );
};
IndexByUser.layout = (page) => (
    <MainLayout children={page} title="マイレビュー一覧" />
);
export default IndexByUser;
