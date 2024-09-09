// eslint-disable-next-line react/prop-types
const ToolbarButton = ({ title, icon, isSelected, onClick }) => {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`focus:outline-none focus:border-none  p-2 rounded-lg duration-300 ${
        isSelected
          ? "bg-[#eb4768] hover:bg-[#eb4768] text-white"
          : "hover:bg-red-100 hover:text-[#eb4768]"
      }`}
    >
      {icon}
    </button>
  );
};
export default ToolbarButton;
