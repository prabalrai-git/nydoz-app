type Colors = "red" | "green" | "yellow" | "blue";

type BadgeProps = {
  backgroundColor: Colors;
  title: string;
};

const CustomBadge = ({ backgroundColor, title }: BadgeProps) => {
  return (
    <div
      className="tw-text-sm tw-font-semibold tw-rounded-md tw-px-2 tw-py-1 tw-opacity-10 "
      style={{
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
        borderWidth: 2,
        borderStyle: "solid",
        color: backgroundColor,
        opacity: 1,
      }}
    >
      <span>{title}</span>
    </div>
  );
};

export default CustomBadge;
