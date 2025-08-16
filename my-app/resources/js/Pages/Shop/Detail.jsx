import ReviewList from "@/Components/Organisms/ReviewList";
import MainLayout from "@/Layouts/MainLayout";
import { Box, Heading, Image, Text } from "@chakra-ui/react";

const Detail = (props) => {
    return (
        <Box p={4}>
            <Heading as="h2" size={"xl"} pb={4}>
                {props.shop.name}
            </Heading>
            <Image
                boxSize="300px"
                objectFit="contain"
                src="https://www.biz.ne.jp/sys/image.php?data=NpMPnIx5xd%2FCjA8rawKl1eDJL8Xa24KNkuGaLJ35tUvnOwKVposTmZ%2BMDFGLb8%2Bq"
                alt={props.shop.name}
                md={4}
            />
            <Text mb={2}>{props.shop.description}</Text>
            <Text mb={2}>{props.shop.location}</Text>
            {/* レビュー */}
            <Box mt={8}>
                <Heading as="h3" size={"lg"} mb={4}>
                    レビュー
                    {props.reviews.length > 0 && (
                        <Text
                            as="span"
                            fontSize={"sm"}
                            ml={4}
                            color={"gray.500"}
                        >
                            {props.reviews.length}件のレビュー
                        </Text>
                    )}
                </Heading>
                <Box>
                    {props.reviews.length === 0 && (
                        <Text>レビューはまだありません</Text>
                    )}
                    <ReviewList reviews={props.reviews} />
                </Box>
            </Box>
        </Box>
    );
};

Detail.layout = (page) => <MainLayout children={page} title="ショップ詳細" />;

export default Detail;
