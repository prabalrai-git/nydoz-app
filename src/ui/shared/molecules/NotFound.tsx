interface Iprops {
    title: string;
}

const NotFound = (props: Iprops) => {
    const title = props.title;
    return (
        <div>
            <h4>{title} Not Found</h4>
        </div>
    );
};

export default NotFound;
