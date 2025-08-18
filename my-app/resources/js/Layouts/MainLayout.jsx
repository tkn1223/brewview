import { HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Heading,
    HStack,
    Link,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { Head, usePage } from "@inertiajs/react";
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
                            {/* ログインしていない場合 */}
                            {!auth.user && (
                                <>
                                    <VStack>
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
                                    </VStack>
                                </>
                            )}
                            {/* ログインしている場合 */}
                            {auth.user && (
                                <Box display={"block"}>
                                    <VStack>
                                        <Link
                                            href={route("dashboard")}
                                            color="black"
                                            _hover={{ color: "gray.500" }}
                                        >
                                            マイページ
                                        </Link>
                                        <Link
                                            href={route("shop.index")}
                                            color="black"
                                            _hover={{ color: "gray.500" }}
                                        >
                                            店舗の登録
                                        </Link>
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            onClick={() => {
                                                onClose(); // drawerを閉じる
                                            }}
                                            color="black"
                                            _hover={{ color: "gray.500" }}
                                        >
                                            ログアウト
                                        </Link>
                                    </VStack>
                                </Box>
                            )}
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
                                    <Box>
                                        <Link href={route("login")}>
                                            <Button
                                                color="white"
                                                variant="outline"
                                                _hover={{
                                                    bg: "white",
                                                    color: "orange.700",
                                                }}
                                                mr={4}
                                            >
                                                ログイン
                                            </Button>
                                        </Link>
                                    </Box>
                                    <Box>
                                        <Link href={route("register")}>
                                            <Button
                                                bg="blue.500"
                                                color="white"
                                                variant="outline"
                                                _hover={{
                                                    bg: "blue.800",
                                                    color: "white",
                                                }}
                                            >
                                                新規登録
                                            </Button>
                                        </Link>
                                    </Box>
                                </>
                            )}
                        </HStack>
                        {/* スマホ表示 */}
                        <Box
                            display={{ base: "block", md: "none" }}
                            px={{ base: "4", md: "none" }}
                        >
                            <HamburgerIcon
                                ref={btnRef}
                                onClick={onOpen}
                                cursor={"pointer"}
                                fontSize={"xl"}
                            />
                            {/* <Menu>
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
                            </Menu> */}
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
