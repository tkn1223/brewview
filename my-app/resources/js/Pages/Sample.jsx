import { useEffect } from "react";

const Sample = () => {
    useEffect(() => {
        console.log("Component mounted");
        return () => {
            console.log("Component unmounted");
        };
    }, []);

    return <h1>fffこれはサンプルです</h1>;
};

export default Sample;
