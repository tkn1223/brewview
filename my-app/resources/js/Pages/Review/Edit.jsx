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
    Spinner,
    Text,
    Textarea,
    useDisclosure,
} from "@chakra-ui/react";
import { router } from "@inertiajs/react";
import { useRef, useState } from "react";

const Edit = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);
    const [hoverRating, setHoverRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        review_id: props.review.id,
        rating: props.review.rating,
        comment: props.review.comment,
    });

    const handleCheck = (e) => {
        e.preventDefault();
        onOpen();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        e.target.disabled = true;
        router.post(route("review.update"), values);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleDelete = (e) => {
        e.preventDefault();
        router.delete(route("review.destroy", { id: values.review_id }));
    };

    return (
        <>
            <Box
                p={4}
                m={4}
                mx={"auto"}
                bg={"blue.100"}
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
                                        更新しますか？
                                    </AlertDialogBody>
                                    <AlertDialogFooter>
                                        <Button
                                            ref={cancelRef}
                                            onClick={onClose}
                                        >
                                            キャンセル
                                        </Button>
                                        <Button
                                            colorScheme="blue"
                                            ml={3}
                                            onClick={handleSubmit}
                                        >
                                            {loading ? <Spinner /> : "更新する"}
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                    </Box>
                </>
                <Heading as="h2" size={"md"} mb={4} color={"blue.900"}>
                    レビューを編集
                </Heading>
                <Text fontSize={"xl"} mb={2} color={"gray.500"}>
                    {props.review.shop.name}
                </Text>
                <form onSubmit={handleCheck} mb={4}>
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
                                            setValues({
                                                ...values,
                                                rating: i + 1,
                                            })
                                        }
                                        onMouseEnter={() =>
                                            setHoverRating(i + 1)
                                        }
                                        onMouseLeave={() => setHoverRating(0)}
                                    >
                                        <StarIcon
                                            color={
                                                i <
                                                (hoverRating || values.rating)
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
                        更新する
                    </Button>
                </form>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
                <form onSubmit={handleDelete}>
                    <Button type="submit" colorScheme="red" mt={4}>
                        削除する
                    </Button>
                </form>
            </Box>
        </>
    );
};
Edit.layout = (page) => <MainLayout children={page} title="レビュー編集" />;
export default Edit;
