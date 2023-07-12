interface ImageAtomProps {
    src: string;
    alt: string;
    className?: string;
}

const ImageAtom = (props: ImageAtomProps) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const { src, alt, className } = props;
    return <img src={`${BASE_URL}/${src}`} alt={alt} className={className} />;
};

export default ImageAtom;
