// eslint-disable-next-line react/prop-types
const ToolbarButton = ({ title, icon, isSelected }) => {
  return (
    <button
      title={title}
      className={`focus:outline-none focus:border-none hover:bg-red-100 p-2 rounded-lg ${
        isSelected ? "bg-red-200 hover:bg-red-200" : ""
      }`}
    >
      {icon}
    </button>
  );
};
export default ToolbarButton;
