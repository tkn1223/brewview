import MainLayout from "@/Layouts/MainLayout";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Text,
    Textarea,
} from "@chakra-ui/react";
import { router } from "@inertiajs/react";
import { useState } from "react";

const Create = (props) => {
    const [values, setValues] = useState({
        shop_id: props.shop.id,
        rating: 1,
        comment: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
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
        <Box>
            <Heading>レビューを投稿</Heading>
            <Text>{props.shop.name}</Text>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel htmlFor="rating" fontWeight={"bold"}>
                        評価
                    </FormLabel>
                    <input
                        type="number"
                        name="rating"
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="comment" fontWeight={"bold"}>
                        コメント
                    </FormLabel>
                    <Textarea
                        type="text"
                        name="comment"
                        onChange={handleChange}
                    ></Textarea>
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
