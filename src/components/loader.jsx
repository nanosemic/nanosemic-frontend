// components/Loader.jsx
const Loader = () => {
  return (
    <div className="inset-0 fixed flex items-center justify-center bg-black/90 z-50">
      <div className=" animate-spin rounded-full  h-16 w-16 border-t-4 border-blue border-opacity-40"></div>
    </div>
  );
};

export default Loader;
