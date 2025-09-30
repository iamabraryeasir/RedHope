import { ArrowRight, MessageSquare, UserRound } from "lucide-react";

export default function ContactPage() {
  return <section className="mt-5 mx-auto sm:max-w-2xl lg:max-w-7xl sm:mx-auto lg:mx-auto">

    <div className="form ">
      <form action="" className="bg-white shadow-lg rounded-2xl p-8 mx-5 sm:mx-0 ">
<h2 className="text-2xl font-bold mb-2">Let's Get In Touch</h2>
        <p className="text-sm text-gray-600 mb-6">
          Or just reach out manually to{" "}
          <a
            href="mailto:redhope@gmail.com"
            className="text-[#5f1919] hover:underline"
          >
            redhope@gmail.com
          </a>
        </p>
        {/* name */}
<div className="relative">
    <label  className="block text-gray-700">
        <h2>Full Name</h2>
    </label>
    <div className="flex items-center">
          <UserRound className="absolute left-5 text-gray-500 " />
        
        <input type="text" id="full-name" placeholder="Enter your full name" className="pl-12 border p-2  py-4 rounded-4xl w-full"/>
    </div>
</div>
{/* email */}
<div className="relative mt-5 sm:mt-10">
    <label  className="block text-black">
        <h2>Email Address</h2>
    </label>
    <div className="flex items-center">
      <MessageSquare className="absolute left-5 text-gray-500 "/>
       
        
        <input type="email" id="full-name" placeholder="Enter your full name" className="pl-12 border p-2  py-4 rounded-4xl w-full"/>
    </div>
</div>
{/* number */}
<div className="relative mt-5 sm:mt-10">
    <label  className="block text-black">
        <h2>Phone Number</h2>
    </label>
    <div className="flex items-center">
      
       
        
        <input type="number" id="full-name" placeholder="+88" className="pl-12 border p-2  py-4 rounded-4xl w-full"/>
    </div>
</div>
{/* massage area */}

<div className="mt-5">
<label htmlFor="">
    <h2>Phone Number</h2>
  <textarea name="" id="" className="w-full h-36 sm:h-80 border  " ></textarea></label>
  
</div>

  <div className="text flex gap-2 mt-5"><input type="radio" /><h2>I hereby agree to our Privacy Policy Team</h2></div>

 
 <div className="butoon flex items-center justify-center mt-5">  <button className="flex items-center justify-center  mr-3 shadow-md gap-3 shadow-black bg-gradient-to-br from-[#570C0C] via-[#932A2A] to-[#000000] w-full py-2 sm:py-4 rounded-4xl text-white text-[12px] sm:text-[16px] font-[500]  ">
        Submit
         
            <ArrowRight/>
        
        </button></div>
      </form>
      
    </div>



    <div className="texts mx-5 my-10 sm:my-30 flex flex-col sm:flex-row sm:gap-5">

      <div className="p1 mx-1 mt-10">
        <h2 className="font-[500] text-xl">Customer Support
  </h2>
  <p className="text-[#010916] text-sm mt-2">Our support team is available around the clock to address any concerns or queries you may have.
</p>
      </div>
      <div className="p2 mx-1 mt-10">
        <h2 className="font-[500] text-xl">Customer Support
  </h2>
  <p className="text-[#010916] text-sm mt-2">Our support team is available around the clock to address any concerns or queries you may have.
</p>
      </div>
      <div className="p3 mx-1 mt-10">
        <h2 className="font-[500] text-xl">Customer Support
  </h2>
  <p className="text-[#010916] text-sm mt-2">Our support team is available around the clock to address any concerns or queries you may have.
</p>
      </div>
    </div>
  </section>;
}
