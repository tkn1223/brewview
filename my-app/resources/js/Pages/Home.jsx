import { Box, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";

const Home = (props) => {
    return (
        <>
            <Box p={4}>
                <Heading
                    fontSize={{ base: "24px", md: "30px", lg: "40px" }}
                    md={2}
                    pd="10px"
                >
                    ショップ一覧
                </Heading>
                <VStack spacing={4} align="stretch">
                    {props.shops.map((shop) => (
                        <Box
                            key={shop.id}
                            p={4}
                            borderWidth="1px"
                            borderRadius={"lg"}
                            overflow={"hidden"}
                            boxShadow={"lg"}
                        >
                            <HStack spacing={4}>
                                <Image
                                    boxSize="100px"
                                    objectFit="cover"
                                    src="https://www.biz.ne.jp/sys/image.php?data=NpMPnIx5xd%2FCjA8rawKl1eDJL8Xa24KNkuGaLJ35tUvnOwKVposTmZ%2BMDFGLb8%2Bq"
                                    alt={shop.name}
                                />
                                <VStack align={"start"}>
                                    <Heading as="h3" size="md">
                                        {shop.name}
                                    </Heading>
                                    <Text>{shop.description}</Text>
                                </VStack>
                            </HStack>
                        </Box>
                    ))}
                </VStack>
                <h2>新着レビュー</h2>
                <ul>
                    {props.newReviews.map((review) => (
                        <li key={review.id}>{review.comment}</li>
                    ))}
                </ul>
            </Box>
        </>
    );
};

export default Home;
