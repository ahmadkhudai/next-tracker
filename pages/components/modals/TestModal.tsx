import {motion} from "framer-motion";

export default function TestModal() {
    return (
        <motion.div
            animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 270, 270, 0],
                borderRadius: ["20%", "20%", "50%", "50%", "20%"],

            }}
            className={"p-10 h-25 w-25 bg-black"}
        ><p className={"text-white"}>HELLO</p></motion.div>
    );
}