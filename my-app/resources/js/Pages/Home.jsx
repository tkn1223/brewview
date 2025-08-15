import {
    AddIcon,
    HamburgerIcon,
    SettingsIcon,
    StarIcon,
} from "@chakra-ui/icons";
import {
    Box,
    Heading,
    HStack,
    IconButton,
    Image,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    VStack,
} from "@chakra-ui/react";

const Home = (props) => {
    return (
        <>
            <Box p={4} bg="orange.700">
                <HStack justifyContent={"space-between"} alignItems={"center"}>
                    {/* ヘッダー */}
                    <Heading
                        as="h1"
                        color="white"
                        size={{ base: "xs", md: "md" }}
                    >
                        <Link href="/home" _hover={{ color: "gray.300" }}>
                            {import.meta.env.VITE_APP_NAME}
                        </Link>
                    </Heading>
                    {/* メニュー */}
                    {/* PC表示 */}
                    <HStack
                        display={{ base: "none", md: "flex" }}
                        fontWeight={"bold"}
                    >
                        <Link
                            href="#"
                            pr={4}
                            color="white"
                            _hover={{ color: "gray.300" }}
                        >
                            マイページ
                        </Link>
                        <Link
                            href="#"
                            color="white"
                            _hover={{ color: "gray.300" }}
                        >
                            店舗の登録
                        </Link>
                    </HStack>
                    {/* スマホ表示 */}
                    <Box
                        display={{ base: "block", md: "none" }}
                        px={{ base: "4", md: "none" }}
                    >
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label="Options"
                                icon={<HamburgerIcon color={"white"} />}
                                variant="outline"
                                _hover={{
                                    color: "orange.500",
                                    bg: "white",
                                    borderColor: "gray.300",
                                }}
                            />
                            <MenuList>
                                <MenuItem icon={<SettingsIcon />}>
                                    マイページ
                                </MenuItem>
                                <MenuItem icon={<AddIcon />}>
                                    店舗の登録
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>
                </HStack>
            </Box>
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
                <Heading
                    fontSize={{ base: "24px", md: "30px", lg: "40px" }}
                    py={6}
                >
                    新着レビュー
                </Heading>
                <VStack spacing={4} align={"stretch"}>
                    {props.newReviews.map((review) => (
                        <Box
                            key={review.id}
                            p={4}
                            borderWidth="1px"
                            borderRadius={"lg"}
                            overflow={"hidden"}
                            boxShadow={"lg"}
                        >
                            <VStack align={"start"}>
                                <Text fontWeight={"bold"}>
                                    {review.user.name}
                                </Text>
                                <Text>{review.comment}</Text>
                                <HStack spacing={1}>
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
                            </VStack>
                        </Box>
                    ))}
                </VStack>
            </Box>
            {/* フッター */}
            <Box>
                <Box p={4} bg={"gray.100"} align={"center"}>
                    <Text>&copy; 2025 {import.meta.env.VITE_APP_NAME}</Text>
                </Box>
            </Box>
        </>
    );
};

export default Home;
