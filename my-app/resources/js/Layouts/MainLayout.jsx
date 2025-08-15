import { AddIcon, HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
import {
    Box,
    Heading,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from "@chakra-ui/react";
import { Head, Link } from "@inertiajs/react";

const MainLayout = ({ children }) => {
    return (
        <>
            <Head>
                <title>{import.meta.env.VITE_APP_NAME}</title>
                <meta name="description" content="laravel Inertia.js" />
            </Head>
            <header>
                <Box p={4} bg="orange.700">
                    <HStack
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        {/* ヘッダー */}
                        <Heading
                            as="h1"
                            color="white"
                            size={{ base: "xs", md: "md" }}
                        >
                            <Box
                                as={Link}
                                href="/home"
                                color="white"
                                _hover={{ color: "gray.300" }}
                            >
                                {import.meta.env.VITE_APP_NAME}
                            </Box>
                        </Heading>
                        {/* メニュー */}
                        {/* PC表示 */}
                        <HStack
                            display={{ base: "none", md: "flex" }}
                            fontWeight={"bold"}
                        >
                            <Box
                                as={Link}
                                pr={4}
                                color="white"
                                _hover={{ color: "gray.300" }}
                            >
                                マイページ
                            </Box>
                            <Box
                                as={Link}
                                href="#"
                                color="white"
                                _hover={{ color: "gray.300" }}
                            >
                                店舗の登録
                            </Box>
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
            </header>
            <div>{children}</div>
            <footer>
                <Box>
                    <Box p={4} bg={"gray.100"} align={"center"}>
                        <Text>&copy; 2025 {import.meta.env.VITE_APP_NAME}</Text>
                    </Box>
                </Box>
            </footer>
        </>
    );
};

export default MainLayout;
