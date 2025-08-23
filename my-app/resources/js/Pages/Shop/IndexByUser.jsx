import MainLayout from "@/Layouts/MainLayout";
import {
    Box,
    Heading,
    HStack,
    Image,
    Link,
    Text,
    VStack,
} from "@chakra-ui/react";

const IndexByUser = (props) => {
    return (
        <>
            {props.shops.length > 0 ? (
                <Box p={4}>
                    <Heading m={4} fontSize={{ base: "24", md: "36" }}>
                        {props.user.name}さんの関連した店舗一覧
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
                </Box>
            ) : (
                <Box>
                    <Heading fontSize={{ base: "24", md: "36" }}>
                        関連した店舗がありません
                    </Heading>
                </Box>
            )}
        </>
    );
};
IndexByUser.layout = (page) => (
    <MainLayout children={page} title="ユーザーの関連したショップ一覧" />
);
export default IndexByUser;
