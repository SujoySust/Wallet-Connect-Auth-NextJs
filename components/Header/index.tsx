import Account from "./Account";
import Nav from "./Nav";

const HeaderSection = () => {
  return (
    <header className="header-area">
      <div className="container">
        <div className="header-wrap">
          <div className="brand-area">
            
          </div>

          <div className="menu-area">
            <Nav />
          </div>
          <Account/>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
//lang ok
