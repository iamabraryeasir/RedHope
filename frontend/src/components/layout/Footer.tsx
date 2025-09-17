import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#FAFAFB]   py-15">
<div className="first mx-5 sm:mx-20">
  <div className="logo flex flex-row gap-2 items-center">
    <img className="h-[15px] w-[15px] sm:h-auto sm:w-auto "   src="public/logo-icon.png" alt="" />
    <h2 className="text-[11px] font-[400] sm:text-2xl leading-[160%]   tracking-[-1.28px] ">Redhope</h2>
  </div>

</div>
<div className="all flex flex-row  mt-5 justify-between mx-5 sm:mx-20 ">
  
<div className="one ">
   <h2 className="text-[8px] leading-[170%] sm:text-[16px] font-[500] "><a href="#">Donation</a></h2>
   <h2 className="text-[8px] leading-[170%]  sm:text-[16px] font-[400]"><a href="#">About</a></h2>
   <h2 className="text-[8px] leading-[170%]  sm:text-[16px] font-[400]"><a href="#">User</a></h2>
   <h2 className="text-[8px] leading-[170%]  sm:text-[16px] font-[400]"><a href="#">Blog</a></h2>
</div>
<div className="two ">
   <h2 className="text-[8px] leading-[170%] sm:text-[16px] font-[500] "><a href="#">Product</a></h2>
   <h2 className="text-[8px] leading-[170%]  sm:text-[16px] font-[400]"><a href="#">Saas Company</a></h2>
   <h2 className="text-[8px] leading-[170%]  sm:text-[16px] font-[400]" ><a href="#">Marketplace</a></h2>
   <h2 className="text-[8px] leading-[170%]  sm:text-[16px] font-[400]"><a href="#">API</a></h2>
</div>
<div className="three ">
   <h2 className="text-[8px] leading-[170%] sm:text-[16px] font-[500] "><a href="#">Resources</a></h2>
   <h2 className="text-[8px] leading-[170%]  sm:text-[16px] font-[400]"><a href="#">Help Center</a></h2>
   <h2 className="text-[8px] leading-[170%]  sm:text-[16px] font-[400]"><a href="#">Partner Program</a></h2>
   <h2 className="text-[8px] leading-[170%]  sm:text-[16px] font-[400]"><a href="#">How it Works?</a></h2>
</div>
<div className="four ">
   <h2 className="text-[8px] leading-[170%] sm:text-[16px] font-[500] "><a href="#">Support</a></h2>
   <h2 className="text-[8px] leading-[170%]  sm:text-[16px] font-[400]"><a href="#">FAQ</a></h2>
   <h2 className="text-[8px] leading-[170%]  sm:text-[16px] font-[400]"><a href="#">Contact</a></h2>


</div>
<div className="five ">
   <h2 className="text-[8px] leading-[170%] sm:text-[16px] font-[500] "><a href="#">Follow us</a></h2>
<div className="icons flex flex-row size-8 gap-1 text-black sm:size-20  sm:gap-2" >
  <Facebook/>
  <Twitter/>
  <Instagram/>
  <Linkedin/>
</div>

</div>



</div>

<div className="copy mx-5 sm:mx-20 mt-5 flex justify-between" >
  <h3 className="text-[5px]  leading-[170%]  sm:text-[16px] font-[400]">Copyright © 2025. All Rights Reserved</h3>
  <div className="two flex gap-4">
     <h3 className="text-[5px] leading-[170%]  sm:text-[16px] font-[400]">Privacy Policy</h3>
     <h3 className="text-[5px] leading-[170%]  sm:text-[16px] font-[400]">Terms of Service</h3>
  </div>
</div>

     
    </footer>
  );
}
