import MainLayout from "@/Layouts/MainLayout";
import { StarIcon } from "@chakra-ui/icons";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Text,
    Textarea,
    useDisclosure,
} from "@chakra-ui/react";
import { router } from "@inertiajs/react";
import { useRef, useState } from "react";

const Create = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);
    const [hoverRating, setHoverRating] = useState(0);
    const [values, setValues] = useState({
        shop_id: props.shop.id,
        rating: 1,
        comment: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // const isConfirm = window.confirm("投稿しますか？");
        // if (!isConfirm) {
        //     return;
        // }
        router.post(route("review.store"), values);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    return (
        <Box
            p={4}
            m={4}
            mx={"auto"}
            bg={"gray.100"}
            borderRadius={"lg"}
            boxShadow={"md"}
            w={{ base: "90%", md: 700 }}
        >
            {/* アラートダイアログ */}
            <>
                <Box>
                    <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader>確認</AlertDialogHeader>
                                <AlertDialogBody>
                                    投稿しますか？
                                </AlertDialogBody>
                                <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose}>
                                        キャンセル
                                    </Button>
                                    <Button color="blue" ml={3}>
                                        投稿する
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                </Box>
            </>
            <Heading as="h2" size={"md"} mb={4} color={"blue.900"}>
                レビューを投稿
            </Heading>
            <Text fontSize={"xl"} mb={2} color={"gray.500"}>
                {props.shop.name}
            </Text>
            <form onSubmit={handleSubmit} mb={4}>
                <FormControl isRequired>
                    <FormLabel htmlFor="rating" fontWeight={"bold"}>
                        評価
                    </FormLabel>
                    <HStack spacing={0} mb={4}>
                        {Array(5)
                            .fill("")
                            .map((_, i) => (
                                <Box
                                    key={i}
                                    p={1}
                                    cursor={"pointer"}
                                    onClick={() =>
                                        setValues({ ...values, rating: i + 1 })
                                    }
                                    onMouseEnter={() => setHoverRating(i + 1)}
                                    onMouseLeave={() => setHoverRating(0)}
                                >
                                    <StarIcon
                                        color={
                                            i < (hoverRating || values.rating)
                                                ? "yellow.500"
                                                : "gray.300"
                                        }
                                        boxSize={6}
                                    />
                                </Box>
                            ))}
                    </HStack>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="comment" fontWeight={"bold"}>
                        コメント
                    </FormLabel>
                    <Textarea
                        name="comment"
                        value={values.comment}
                        onChange={handleChange}
                        placeholder="コメントを入力してください"
                        rows={2}
                    />
                </FormControl>
                <Button type="submit" colorScheme="blue" mt={4}>
                    投稿する
                </Button>
            </form>
        </Box>
    );
};
Create.layout = (page) => <MainLayout children={page} title="レビュー投稿" />;
export default Create;
