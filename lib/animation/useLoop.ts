import { useCallback, useEffect, useState } from "react";

const useLoop = (delay = 1000) => {
    const [key, setKey] = useState(0);

    const incrementKey = useCallback(() => {
        setKey((prev) => prev + 1);
    }, []);

    useEffect(() => {
        const interval = setInterval(incrementKey, delay);
        return () => clearInterval(interval);
    }, [delay, incrementKey]);

    return { key };
};

export { useLoop };