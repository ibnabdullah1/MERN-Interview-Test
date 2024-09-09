import bannerImage from "../../assets/banner.png";
const Home = () => {
  return (
    <div
      className="flex justify-center items-center"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="space-y-4">
        <h1 className="text-center font-semibold text-4xl">
          A digital whiteboard for team <br /> collaboration and brainstorming.
        </h1>
        <p className="text-sm">
          Recent Create’s source of inspiration for next UX/UI Design project
          trial it for Free
        </p>
        <div className="flex gap-7 justify-center">
          <button className="bg-[#eb4768e7] px-8 py-4 rounded-full text-white font-medium text-sm tracking-widest hover:bg-[#eb4768] duration-500 hover:scale-105">
            Create Drawing
          </button>
          <button className="border border-[#eb4768] px-8 py-4 rounded-full text-[#eb4768] font-medium text-sm tracking-widest hover:bg-[#eb476810] duration-300 hover:scale-105">
            Explore Drawing
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
