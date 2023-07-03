import React, { FC, createContext, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

interface IMediaQueryContext {
    isSmallDevice: boolean;
    isMediumDevice: boolean;
    isLargeDevice: boolean;
    isExtraLargeDevice: boolean;
    showSidebar: boolean;
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MediaQueryContext = createContext<IMediaQueryContext>({
    isSmallDevice: false,
    isMediumDevice: false,
    isLargeDevice: false,
    isExtraLargeDevice: false,
    showSidebar: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setShowSidebar: () => {},
});

const MediaQueryProvider: FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [showSidebar, setShowSidebar] = useState(true);

    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    const isMediumDevice = useMediaQuery(
        "only screen and (min-width : 769px) and (max-width : 992px)"
    );
    const isLargeDevice = useMediaQuery(
        "only screen and (min-width : 993px) and (max-width : 1200px)"
    );
    const isExtraLargeDevice = useMediaQuery(
        "only screen and (min-width : 1201px)"
    );

    return (
        <MediaQueryContext.Provider
            value={{
                isSmallDevice,
                isMediumDevice,
                isLargeDevice,
                isExtraLargeDevice,
                showSidebar,
                setShowSidebar,
            }}>
            {children}
        </MediaQueryContext.Provider>
    );
};

export default MediaQueryProvider;
