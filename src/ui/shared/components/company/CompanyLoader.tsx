import { Spinner } from "react-bootstrap";
import ImageAtom from "../../atoms/ImageAtom";

interface ICompanyLoadingPageProps {
    companyName?: string;
    imgSrc?: string;
}

const CompanyLoadingPage = (props: ICompanyLoadingPageProps) => {
    const { companyName, imgSrc } = props;
    return (
        <div className='d-flex align-items-center flex-direction-column justify-content-center vh-100'>
            {imgSrc ? (
                <ImageAtom
                    src={imgSrc}
                    alt={`${companyName} Logo` ?? "Company Logo"}
                />
            ) : (
                <div className='fs-7'>{companyName}</div>
            )}
            <div className='text-center'>
                <Spinner
                    className='mx-2'
                    variant='warning'
                    animation='grow'
                    size='sm'
                />
                <Spinner
                    className='mx-2'
                    variant='warning'
                    animation='grow'
                    size='sm'
                />
                <Spinner
                    className='mx-2'
                    variant='warning'
                    animation='grow'
                    size='sm'
                />
                <Spinner
                    className='mx-2'
                    variant='warning'
                    animation='grow'
                    size='sm'
                />
                <Spinner
                    className='mx-2'
                    variant='warning'
                    animation='grow'
                    size='sm'
                />
            </div>
        </div>
    );
};

export default CompanyLoadingPage;
