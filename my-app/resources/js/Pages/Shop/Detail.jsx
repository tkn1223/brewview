import ReviewList from "@/Components/Organisms/ReviewList";
import MainLayout from "@/Layouts/MainLayout";
import { EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Heading,
    HStack,
    Image,
    Text,
    useToast,
} from "@chakra-ui/react";
import { Link } from "@inertiajs/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
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
        } else if (props.status === "review_deleted") {
            toast({
                position: "bottom-right",
                title: "レビュー削除成功",
                description: "レビューの削除が完了しました",
                status: "info",
                duration: 9000,
                inClosable: true,
            });
        } else if (props.status === "shop-updated") {
            toast({
                position: "bottom-right",
                title: "店舗更新成功",
                description: "店舗の更新が完了しました",
                status: "success",
                duration: 9000,
                inClosable: true,
            });
        }
    }, [props.flash, props.status]);

    const options = {
        type: "loop",
        gap: "1rem",
        autoplay: true,
        interval: 2000,
        pauseOnHover: true,
        resetProgress: false,
        height: "15rem",
    };

    return (
        <Box p={4}>
            <HStack spacing={4}>
                <Heading as="h2" size={"xl"} pb={4}>
                    {props.shop.name}
                </Heading>
                <Link href={route("shop.edit", { id: props.shop.id })}>
                    <Button p={2} borderRadius={10} bg={"gray.200"}>
                        <EditIcon />
                    </Button>
                </Link>
            </HStack>

            {props.shop.shop_images ? (
                <Box w={300}>
                    <Splide
                        options={options}
                        aria-lavelledby="autoplay-example-heading"
                    >
                        {props.shop.shop_images.map((image) => (
                            <SplideSlide>
                                <Image
                                    key={image.id}
                                    boxSize="300px"
                                    objectFit="contain"
                                    src={
                                        import.meta.env.VITE_APP_URL +
                                        "/" +
                                        image.file_path
                                    }
                                    alt={image.file_name}
                                    md={4}
                                />
                            </SplideSlide>
                        ))}
                    </Splide>
                </Box>
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
