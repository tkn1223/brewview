import { Text } from "@chakra-ui/react";

const UserName = ({ name }) => {
    return (
        <Text textAlign={"right"} mt={2} fontSize={"sm"}>
            {name}
        </Text>
    );
};
export default UserName;
