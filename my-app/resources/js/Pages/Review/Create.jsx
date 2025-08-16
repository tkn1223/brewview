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

const Create = (props) => {
    return (
        <Box>
            <Heading>レビューを投稿</Heading>
            <Text>{props.shop.name}</Text>
            <form>
                <FormControl>
                    <FormLabel htmlFor="rating" fontWeight={"bold"}>
                        評価
                    </FormLabel>
                    <input type="number" name="rating" />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="comment" fontWeight={"bold"}>
                        コメント
                    </FormLabel>
                    <Textarea type="text" name="comment"></Textarea>
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
