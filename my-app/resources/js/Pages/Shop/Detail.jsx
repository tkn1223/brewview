import MainLayout from "@/Layouts/MainLayout";
import { StarIcon } from "@chakra-ui/icons";
import { Box, Heading, HStack, Image, Text } from "@chakra-ui/react";

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
                    {props.reviews.map((review) => (
                        <Box
                            key={review.id}
                            p={4}
                            borderWidth={"1px"}
                            borderRadius={"lg"}
                            overflow={"hidden"}
                            boxShadow={"lg"}
                            mb={4}
                        >
                            <Text>{review.comment}</Text>
                            <Text textAlign={"right"} mt={2} fontSize={"sm"}>
                                {review.user.name}
                            </Text>
                            <HStack>
                                {Array(5)
                                    .fill("")
                                    .map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            color={
                                                i < review.rating
                                                    ? "yellow.500"
                                                    : "gray.300"
                                            }
                                        />
                                    ))}
                            </HStack>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

Detail.layout = (page) => <MainLayout children={page} title="ショップ詳細" />;

export default Detail;
