

import { contactInfo } from '@/data/footerData';

export default function ContactSection() {
  return (
    <div className=" mx-auto px-4">
      <section id="contact" className="  bg-[#fbfbfb] py-10 sm:py-14 md:py-20 border-t border-gray-200">
        <div className="max-w-full mx-auto">
          
          <div className =" mb-8 sm:mb-14 md:ml-[150px] lg:ml-[450px]">
          <h3 className="text-3xl sm:text-3xl lg:text-3xl font-bold text-[#233142] ">
            Contact Me<span className="text-[#FE4066]">.</span>
          </h3>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              
              <div className="w-[480px] max-w-full mx-auto">
                <form
                  action="https://formsubmit.co/nova@navarasu.com"
                  method="POST"
                  className="bg-white border border-gray-200  p-5 sm:p-6 space-y-4"
                >
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="box" />

                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="w-[430px] max-w-full h-[50px] border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#93d8ff]"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="w-[430px] max-w-full h-[50px] border border-gray-300  px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#93d8ff]"
                  />
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Message"
                    required
                    className="w-[430px] max-w-full border border-gray-300  px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-[#93d8ff]"
                  ></textarea>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-[#FE4066] text-white text-sm font-semibold px-5 py-2  hover:bg-[#e33355] transition duration-200"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>

              
              <div className="flex justify-center items-start">
                <div className="w-[480px] max-w-full bg-white border border-gray-200  shadow-sm p-6 sm:p-8 text-center">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#ffeef1] mx-auto mb-4 shadow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-7 h-7 text-[#FE4066]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 17.25V6.75m19.5 0a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 002.25 6.75m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91A2.25 2.25 0 012.25 6.993V6.75"
                      />
                    </svg>
                  </div>
                  <h3 className="text-[#777777] font-Raleway text-[20px] text-lg font-bold mb-2">Email Me</h3>
                  <p className="text-[#586069] text-[12.75px] break-all">{contactInfo.email}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
