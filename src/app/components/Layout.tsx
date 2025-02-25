import Footer from "./Footer";
import Header from "./Header";
import PhoneMenu from "./PhoneMenu";

interface LayoutProps {
  children: React.ReactNode;
  headerData: any;
}

const Layout = ({ children, headerData  }: LayoutProps) => {
  return (
    <>
      <Header  data={headerData}/>
      {children}
      <Footer />
      <PhoneMenu /> 
    </>
  );
};

export default Layout;
