import MainLayout from "@/Layouts/MainLayout";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Textarea,
} from "@chakra-ui/react";
import { router, useForm, usePage } from "@inertiajs/react";

const Create = () => {
    const { auth, csrf_token } = usePage().props;
    const { data, setData, post, errors } = useForm({
        name: "",
        location: "",
        description: "",
        images: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        router.post(route("shop.store"), {
            _token: csrf_token,
            ...data,
        });
    };

    return (
        <Box p={4} m={4} w={{ base: "90%", md: 700 }}>
            <Heading as="h2" fontSize={{ base: 18, md: 24 }} mb={6}>
                店舗新規作成
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
                    <Input
                        type="file"
                        id="images"
                        name="images"
                        onChange={(e) => setData("images", e.target.files)}
                    />
                </FormControl>
                <Button type="submit" colorScheme="teal">
                    作成
                </Button>
            </form>
        </Box>
    );
};
Create.layout = (page) => <MainLayout children={page} title={"店舗新規作成"} />;
export default Create;
