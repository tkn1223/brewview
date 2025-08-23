import MainLayout from "@/Layouts/MainLayout";
import { CloseIcon, IconButton } from "@chakra-ui/icons";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Text,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import { router, useForm } from "@inertiajs/react";

const Edit = (props) => {
    const existingImages = props.shop.shop_images
        ? props.shop.shop_images.map((image) => ({
              id: image.id,
              file_name: image.file_name,
              location: props.shop.location,
              file_path: image.file_path,
          }))
        : [];

    const { data, setData, post, errors } = useForm({
        id: props.shop.id,
        name: props.shop.name,
        location: props.shop.location,
        description: props.shop.description,
        images: [],
        existingImages: existingImages,
    });

    const toast = useToast();
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + data.existingImages.length > 3) {
            toast({
                position: "bottom-right",
                title: "画像は3枚までしかアップロードできません。",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            e.target.value = "";
            return;
        }
        setData("images", files);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("shop.update"), data);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        router.delete(route("shop.destroy", { id: data.id }));
    };

    const handleRemoveImage = (index, type) => {
        if (type === "existing") {
            return (e) => {
                const images = data.existingImages;
                images.splice(index, 1);
                setData("existingImages", images);
            };
        } else {
            return (e) => {
                const images = data.images;
                images.splice(index, 1);
                setData("images", images);

                const dataTransfer = new DataTransfer();
                const imageFiles = document.getElementById("images").files;

                Array.from(imageFiles).forEach((file, i) => {
                    if (i !== index) {
                        dataTransfer.items.add(file);
                    }
                });
                document.getElementById("images").file = dataTransfer.files;
            };
        }
    };

    return (
        <Box p={4} m={4} w={{ base: "90%", md: 700 }}>
            <Heading as="h2" fontSize={{ base: 18, md: 24 }} mb={6}>
                店舗の編集
            </Heading>
            <form onSubmit={handleSubmit}>
                <FormControl id="name" mb={4}>
                    <FormLabel fontWeight={"bold"}>店舗名</FormLabel>
                    <Input
                        isRequired
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                </FormControl>
                <FormControl id="location" mb={4}>
                    <FormLabel fontWeight={"bold"}>場所</FormLabel>
                    <Input
                        type="text"
                        id="location"
                        name="location"
                        value={data.location}
                        onChange={(e) => setData("location", e.target.value)}
                    />
                </FormControl>
                <FormControl id="description" mb={4}>
                    <FormLabel fontWeight={"bold"}>説明</FormLabel>
                    <Textarea
                        isRequired
                        id="description"
                        name="description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                    />
                </FormControl>
                <FormControl id="images" mb={4}>
                    <FormLabel fontWeight={"bold"}>店舗画像</FormLabel>
                    <Text>プレビュー画面</Text>

                    <Box display={"flex"} p={4} bg={"gray.100"}>
                        {data.existingImages.map((image, index) => (
                            <Box key={image.id} p={2} position={"relative"}>
                                <img
                                    src={
                                        import.meta.env.VITE_APP_URL +
                                        "/" +
                                        image.file_path
                                    }
                                    alt={image.file_name}
                                    style={{ height: "100px" }}
                                />
                                <IconButton
                                    isRound={true}
                                    position={"absolute"}
                                    top={-4}
                                    right={-2}
                                    variant="solid"
                                    colorScheme="gray"
                                    border="black.800"
                                    borderWidth={1}
                                    opacity={0.7}
                                    _hover={{ opacity: 1 }}
                                    aria-lavel="Done"
                                    fontSize={{ base: "xs", md: "10px" }}
                                    icon={<CloseIcon />}
                                    onClick={handleRemoveImage(
                                        index,
                                        "existing"
                                    )}
                                ></IconButton>
                            </Box>
                        ))}
                        {/* プレビュー */}
                        {data.images.length > 0 && (
                            <Box>
                                <HStack></HStack>
                                <HStack>
                                    {data.images.map((image, index) => (
                                        <Box
                                            key={image.name}
                                            p={2}
                                            position={"relative"}
                                        >
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt={image.name}
                                                style={{ height: "100px" }}
                                            />
                                            <IconButton
                                                isRound={true}
                                                position={"absolute"}
                                                top={-4}
                                                right={-2}
                                                variant="solid"
                                                colorScheme="gray"
                                                border="black.800"
                                                borderWidth={1}
                                                opacity={0.7}
                                                _hover={{ opacity: 1 }}
                                                aria-lavel="Done"
                                                fontSize={{
                                                    base: "xs",
                                                    md: "10px",
                                                }}
                                                icon={<CloseIcon />}
                                                onClick={handleRemoveImage(
                                                    index,
                                                    "new"
                                                )}
                                            ></IconButton>
                                        </Box>
                                    ))}
                                </HStack>
                            </Box>
                        )}
                    </Box>
                    <Input
                        type="file"
                        id="images"
                        name="images"
                        multiple
                        accept=".jpg, .jpeg, .png"
                        onChange={handleImageChange}
                    />
                </FormControl>
                <Button type="submit" colorScheme="teal">
                    更新
                </Button>
            </form>
            <Box display={"flex"} justifyContent={"center"}>
                <form onSubmit={handleDelete}>
                    <Button type="submit" colorScheme="red" mt={4}>
                        削除する
                    </Button>
                </form>
            </Box>
        </Box>
    );
};
Edit.layout = (page) => <MainLayout children={page} title={"店舗の編集"} />;
export default Edit;
