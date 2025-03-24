import Image from "next/image";
import LandingPage from "@/Components/LandingPage";
import Doctor_card from "@/Components/Doctor_card";
import Footer from "@/Components/Footer";
import Filter_component from "@/Components/Filter_component";
import Book_Form from "@/Components/Book_Form";
import Book_appointment from "@/Components/Book_appointment";
import NavBar from "@/Components/NavBar";
import Calendar from "@/Components/calender";
export default function Home() {
  return (
    // <Doctor_card/>
    // <>
    //   {/* <Book_appointment/> */}
    //   {/* <Filter_component title='Rating' stat={'Star'} array={[1,2,3,4,5]} optional ='show all'/>
    // <Filter_component title='Experience' stat={'Years'} array={["15+", "10-15", "5-10", "3-5", "1-3", "0-1"]} optional={''}/>
    // <Filter_component title='Gender' stat={'Gender'} array={['Male','Female']} optional={'Show all'} flag={false}/> */}
    // </>
    // <Footer/>
    <Calendar/>
  );
}
