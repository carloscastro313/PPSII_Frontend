const Container = ({
  children,
  cssClass = "w-5/6 h-5/6 min-h-[650px] bg-blue-500",
}) => {
  return (
    <div className="flex justify-center h-full">
      <div className={cssClass + " self-center p-5 rounded overflow-y-auto"}>
        {children}
      </div>
    </div>
  );
};

export default Container;
