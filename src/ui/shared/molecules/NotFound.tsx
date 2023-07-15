interface Iprops {
    title: string;
}

const NotFound = (props: Iprops) => {
    const title = props.title;
    return (
        <div>
            <h5 className='text-info'>{title ?? "Not Found"} </h5>
        </div>
    );
};

export default NotFound;
