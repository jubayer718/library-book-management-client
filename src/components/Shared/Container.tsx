

const Container = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="w-10/12 mx-auto">
      {children}
    </div>
  );
};

export default Container;