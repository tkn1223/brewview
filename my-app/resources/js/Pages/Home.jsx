import ReviewList from "@/Components/Organisms/ReviewList";
import MainLayout from "@/Layouts/MainLayout";
import {
    Box,
    Heading,
    HStack,
    Image,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { Link } from "@inertiajs/react";
import { useEffect } from "react";

const Home = (props) => {
    const toast = useToast();

    useEffect(() => {
        // セッションフラッシュメッセージを処理
        if (props.flash?.success) {
            toast({
                position: "bottom-right",
                title: "成功",
                description: props.flash.success,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        }
    }, [props.flash]);
    return (
        <>
            <Box p={4}>
                <Heading
                    fontSize={{ base: "24px", md: "30px", lg: "40px" }}
                    md={2}
                    pb={6}
                >
                    ショップ一覧
                </Heading>
                <VStack spacing={4} align="{stretch}">
                    {props.shops.map((shop) => (
                        <Link href={`/shop/${shop.id}`} key={shop.id}>
                            <Box
                                key={shop.id}
                                p={4}
                                borderWidth="1px"
                                borderRadius={"lg"}
                                overflow={"hidden"}
                                boxShadow={"lg"}
                                _hover={{
                                    transform: "translateY(-2px)",
                                    boxShadow: "xl",
                                    borderColor: "blue.500",
                                }}
                                transition="all 0.2s"
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
                        </Link>
                    ))}
                </VStack>
                <Heading
                    fontSize={{ base: "24px", md: "30px", lg: "40px" }}
                    py={6}
                >
                    新着レビュー
                </Heading>
                <VStack spacing={4} align={"stretch"}>
                    <ReviewList reviews={props.newReviews} />
                </VStack>
            </Box>
        </>
    );
};
Home.layout = (page) => <MainLayout children={page} />;

export default Home;
