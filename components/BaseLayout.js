import CardSection from "./atoms/CardSection";
import Herramientas from "./molecules/Herramientas";
import InfoCard from "./atoms/InfoCard";
import Navigation from "./molecules/Navigation";
import Sidebar from "./molecules/Sidebar";

const BaseLayout = ({ children }) => {
  return (
    <>
    <Navigation/>
    <div className="layout">
      <Sidebar />
      <main className="layout__main-content">
          <div className="wrapper">
            <CardSection/>  
          <div>
            <Herramientas/>
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default BaseLayout;
