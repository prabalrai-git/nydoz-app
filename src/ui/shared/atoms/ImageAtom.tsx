interface ImageAtomProps {
    src: string;
    alt: string;
    className?: string;
}

const ImageAtom = (props: ImageAtomProps) => {
    const { src, alt, className } = props;
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const imageURL = `${BASE_URL}/${src}`;

    return <img src={imageURL} alt={alt} className={className} />;
};

export default ImageAtom;
