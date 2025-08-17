import { AddIcon, HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
import {
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Heading,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { Head, Link as InertiaLink, Link, usePage } from "@inertiajs/react";
import React from "react";

const MainLayout = ({ children }) => {
    const { auth } = usePage().props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    return (
        <>
            <Head>
                <title>{import.meta.env.VITE_APP_NAME}</title>
                <meta name="description" content="laravel Inertia.js" />
            </Head>

            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
                size={{ base: "xs", md: "sm" }}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        {auth.user
                            ? `ようこそ ${auth.user.name}さん`
                            : "ログイン"}
                    </DrawerHeader>

                    <DrawerBody>
                        <VStack>
                            {
                                // ログインしていない場合
                                !auth.user && (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )
                            }
                            <Box
                                as={Link}
                                pr={4}
                                color="black"
                                _hover={{ color: "gray.500" }}
                            >
                                マイページ
                            </Box>
                            <Box
                                as={Link}
                                href="#"
                                color="black"
                                _hover={{ color: "gray.500" }}
                            >
                                店舗の登録
                            </Box>
                            <Box
                                as={InertiaLink}
                                method="post"
                                href={route("logout")}
                                onClick={() => {
                                    onClose(); // drawerを閉じる
                                }}
                                color="black"
                                _hover={{ color: "gray.500" }}
                                cursor="pointer"
                            >
                                ログアウト
                            </Box>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

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
                                href="/"
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
                            {auth.user ? (
                                <>
                                    <Box>
                                        <Text
                                            onClick={onOpen}
                                            cursor={"pointer"}
                                            color={"white"}
                                            _hover={{ color: "gray.300" }}
                                            ref={btnRef}
                                            display={"flex"}
                                            alignItems={"center"}
                                        >
                                            {auth.user.name}さん
                                            <SettingsIcon mx={2} />
                                        </Text>
                                    </Box>
                                </>
                            ) : (
                                <>
                                    <Box
                                        as={Link}
                                        href="/login"
                                        color="white"
                                        _hover={{ color: "gray.300" }}
                                        mr={4}
                                    >
                                        ログイン
                                    </Box>
                                    <Box
                                        as={Link}
                                        href="/register"
                                        color="white"
                                        _hover={{ color: "gray.300" }}
                                    >
                                        新規登録
                                    </Box>
                                </>
                            )}
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
