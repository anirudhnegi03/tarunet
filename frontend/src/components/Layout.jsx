import Navbar from "./Navbar.jsx";
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen relative">
      {/* Navbar sits on top */}
      <Navbar />

      <div className="flex pt-16">
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
export default Layout;
