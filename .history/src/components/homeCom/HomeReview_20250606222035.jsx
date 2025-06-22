import StarIcon from "@mui/icons-material/Star";
import { motion } from "framer-motion";
function HomeReview() {
  return (
    <section className="bg-paleWhiteGrey p-16 text-center">
      <h1 className="font-otoma text-3xl  text-center">
        What our customers say
      </h1>
      <p className=" text-lg font-sans text-center ">
        Read testimonials from our happy customers
      </p>
      <div className="flex justify-evenly text-left mt-10 ">
        <motion.div
          initial={{ translateY: "-30px" }}
          whileInView={{ translateY: "0px" }}
          viewport={{ margin: "0px 0px -10px 0px" }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          className="flex lgHome:w-3/12 w-72 bg-offWhite hover:text-offWhite hover:bg-btnsGreen p-5 rounded-2xl transition-all duration-500">
          <div>
            <img src="/public/icons/commaGroup.svg" alt="" />
            <div className="flex flex-col gap-[70px]">
              <p className="">
                This platform is great for connecting restaurants with people in
                need and making a positive impact on the community
              </p>
              <div className="flex gap-x-3 items-center border-t pt-2">
                <img
                  src="homeMedia/personreview1.png"
                  alt=""
                  className="rounded-full w-14 h-14"
                />
                <div>
                  <p className=" p-0 transition-all ">Mohamed Soliman</p>
                  <div>
                    <StarIcon fontSize="small" className="text-darkYellow" />
                    <StarIcon fontSize="small" className="text-darkYellow" />
                    <StarIcon fontSize="small" className="text-darkYellow" />
                    <StarIcon fontSize="small" className="text-darkYellow" />
                    <StarIcon fontSize="small" className="text-darkYellow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ translateY: "-30px" }}
          whileInView={{ translateY: "0px" }}
          viewport={{ margin: "0px 0px -10px 0px" }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          className="flex items-between lgHome:w-3/12 w-72 bg-offWhite hover:text-offWhite hover:bg-btnsGreen p-5 rounded-2xl transition-all duration-500">
          <div>
            <img src="/public/icons/commaGroup.svg" alt="" />
            <div className="flex flex-col gap-28">
              <p className=" ">
                Through this app I can eat well, save money, and help the planet
              </p>
              <div className="flex gap-x-3 items-center border-t pt-2 ">
                <img
                  src="homeMedia/personreview2.png"
                  alt=""
                  className="rounded-full w-14 h-14"
                />
                <div>
                  <p className="p-0 transition-all">Osama abdallah</p>
                  <div>
                    <StarIcon fontSize="small" className="text-darkYellow" />
                    <StarIcon fontSize="small" className="text-darkYellow" />
                    <StarIcon fontSize="small" className="text-darkYellow" />
                    <StarIcon fontSize="small" className="text-darkYellow" />
                    <StarIcon fontSize="small" className="text-darkYellow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ translateY: "-30px" }}
          whileInView={{ translateY: "0px" }}
          viewport={{ margin: "0px 0px -10px 0px" }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          className="flex lgHome:w-3/12 w-72 bg-offWhite hover:text-offWhite hover:bg-btnsGreen p-5 rounded-2xl transition-all duration-500">
          <div>
            <img src="/public/icons/commaGroup.svg" alt="" />
            <div className="flex flex-col gap-28">
              <p className="">
                As a restaurant owner, I waste less, reach more customers with
                this platform
              </p>
              <div className="flex gap-x-3 items-center border-t pt-2">
                <img
                  src="homeMedia/personreview3.png"
                  alt=""
                  className="rounded-full w-14 h-14"
                />
                <div>
                  <p className=" p-0 transition-all ">Mohamed Soliman</p>
                  <div>
                    <StarIcon fontSize="small" className="text-darkYellow" />
                    <StarIcon fontSize="small" className="text-darkYellow" />
                    <StarIcon fontSize="small" className="text-darkYellow" />
                    <StarIcon fontSize="small" className="text-darkYellow" />
                    <StarIcon fontSize="small" className="text-darkYellow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <button className="font-sans bg-palewLightBrownYellow text-offWhite py-2 px-3 rounded-lg mt-10 ">
        View More Reviews {`>`}
      </button>
    </section>
  );
}

export default HomeReview;
