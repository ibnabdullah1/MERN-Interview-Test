import { Link } from "react-router-dom";
import bannerImage from "../../assets/banner.png";
const Home = () => {
  return (
    <div
      className="flex justify-center items-center px-5"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="space-y-4">
        <h1 className="text-center font-semibold text-2xl md:text-4xl">
          A digital whiteboard for team <br /> collaboration and brainstorming.
        </h1>
        <p className="text-sm text-center">
          Recent Create’s source of inspiration for next UX/UI Design project
          trial it for Free
        </p>
        <div className="flex gap-3 md:gap-7 justify-center">
          <Link
            to={"/create-drawing"}
            className="bg-[#eb4768e7] px-5 py-3 md:px-8 md:py-4 rounded-full text-white font-medium text-sm tracking-widest hover:bg-[#eb4768] duration-500 hover:scale-105"
          >
            Create Drawing
          </Link>
          <Link
            to={"/all-drawings"}
            className="border border-[#eb4768] px-5 py-3 md:px-8 md:py-4 rounded-full text-[#eb4768] font-medium text-sm tracking-widest hover:bg-[#eb476810] duration-300 hover:scale-105"
          >
            Explore Drawing
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
