import { cn } from "@/lib/utils";



const Container = ({children,className}:{children:React.ReactNode,className?:string}) => {
  return (
    <div
      className={cn(
      'max-w-[1920px] w-full mx-auto px-4 py-4 xl:px-20',
      className && className
      )}
    >
    {children}
    </div>
  );
};

export default Container;