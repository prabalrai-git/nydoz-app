interface Iprops {
    title: string;
}

const NotFound = (props: Iprops) => {
    const title = props.title;
    return (
        <div className='my-6 px-3'>
            <h5 className='text-info'>{title ?? "Not Found"} </h5>
        </div>
    );
};

export default NotFound;
