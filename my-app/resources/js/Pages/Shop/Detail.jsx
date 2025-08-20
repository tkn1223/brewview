import ReviewList from "@/Components/Organisms/ReviewList";
import MainLayout from "@/Layouts/MainLayout";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Image, Text, useToast } from "@chakra-ui/react";
import { Link } from "@inertiajs/react";
import { useEffect } from "react";

const Detail = (props) => {
    const toast = useToast();
    useEffect(() => {
        // セッションフラッシュメッセージを処理
        if (props.flash?.success) {
            toast({
                position: "bottom-right",
                title: "成功",
                description: props.flash.success,
                status: "success",
                duration: 9000,
                inClosable: true,
            });
        }

        if (props.status === "review_created") {
            toast({
                position: "bottom-right",
                title: "投稿成功",
                description: "レビューを投稿しました",
                status: "success",
                duration: 9000,
                inClosable: true,
            });
        }
    }, [props.flash, props.status]);

    return (
        <Box p={4}>
            <Heading as="h2" size={"xl"} pb={4}>
                {props.shop.name}
            </Heading>

            {props.shop.shop_images ? (
                props.shop.shop_images.map((image) => (
                    <Image
                        key={image.id}
                        boxSize="300px"
                        objectFit="contain"
                        src={
                            import.meta.env.VITE_APP_URL + "/" + image.file_path
                        }
                        alt={image.file_name}
                        md={4}
                    />
                ))
            ) : (
                <Image
                    boxSize="300px"
                    objectFit="contain"
                    src="https://www.biz.ne.jp/sys/image.php?data=NpMPnIx5xd%2FCjA8rawKl1eDJL8Xa24KNkuGaLJ35tUvnOwKVposTmZ%2BMDFGLb8%2Bq"
                    alt={props.shop.name}
                    md={4}
                />
            )}
            <Text mb={2}>{props.shop.description}</Text>
            <Text mb={2}>{props.shop.location}</Text>
            {/* レビュー */}
            <Box mt={8}>
                <Heading as="h3" size={"lg"} mb={4}>
                    レビュー
                    {props.reviews.length > 0 && (
                        <Text
                            as="span"
                            fontSize={"sm"}
                            ml={4}
                            color={"gray.500"}
                        >
                            {props.reviews.length}件のレビュー
                        </Text>
                    )}
                </Heading>
                <Box>
                    <Link href={`/review/create/shop/${props.shop.id}`}>
                        <Button my={4} icon={<PlusSquareIcon />}>
                            レビューを投稿する
                        </Button>
                    </Link>
                </Box>
                <Box>
                    {props.reviews.length === 0 && (
                        <Text>レビューはまだありません</Text>
                    )}
                    <ReviewList reviews={props.reviews} />
                </Box>
            </Box>
        </Box>
    );
};

Detail.layout = (page) => <MainLayout children={page} title="ショップ詳細" />;

export default Detail;
