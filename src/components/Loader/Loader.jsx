import { LineWave } from "react-loader-spinner";

export const Loader = () => {
    return (
        <LineWave>
            height="100"
            width="100"
            color="#3f51b5"
            ariaLabel="line-wave"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
        </LineWave>
    );
};
