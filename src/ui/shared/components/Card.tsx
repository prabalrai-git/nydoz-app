interface ICardProps {
    title: string;
    description: string;
}

const Card = (props: ICardProps) => {
    const { title, description } = props;
    return (
        <div className='card'>
            <div className='card-body'>
                <h5 className='card-title'>{title}</h5>
                <p className='card-text'>{description}</p>
            </div>
        </div>
    );
};

export default Card;
