import { StarIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/react";

const StarRating = ({ rating }) => {
    return (
        <HStack>
            {Array(5)
                .fill("")
                .map((_, i) => (
                    <StarIcon
                        key={i}
                        color={i < rating ? "yellow.500" : "gray.300"}
                    />
                ))}
        </HStack>
    );
};
export default StarRating;
