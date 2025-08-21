import StarRating from "@/Components/Atoms/StarRating";
import UserName from "@/Components/Atoms/UserName";
import { Box, Button, Text } from "@chakra-ui/react";
import { Link } from "@inertiajs/react";

const ReviewItem = ({ review }) => {
    return (
        <Box
            key={review.id}
            p={4}
            borderWidth={"1px"}
            borderRadius={"lg"}
            overflow={"hidden"}
            boxShadow={"lg"}
            mb={4}
        >
            <Text>{review.comment}</Text>
            <UserName name={review.user.name} />
            <StarRating rating={review.rating} />
            <Box mt={3} w={"100%"} display={"flex"} justifyContent={"flex-end"}>
                <Link href={`/review/edit/${review.id}`}>
                    <Button colorScheme="blue" size={"sm"}>
                        編集
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};
export default ReviewItem;
