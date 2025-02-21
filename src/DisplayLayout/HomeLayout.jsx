import Footer from "../components/Footer";
import Home from "../components/Home";
import Navbar from "../components/Navbar";


const HomeLayout = () => {


  return (
   <div>
    <header className="mb-15">
    <Navbar></Navbar>

    </header>
       <div className="mt-10">
       <Home></Home>

       </div>

    <footer>
    <Footer></Footer>
   </footer>
   </div>

  );
};

export default HomeLayout;
