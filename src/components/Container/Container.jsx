const Container = ({ children }) => {
  return (
    <main className="flex justify-center">
      <div className="w-5/6 h-5/6 bg-blue-500 my-auto p-5 overflow-y-auto">
        {children}
      </div>
    </main>
  );
};

export default Container;
