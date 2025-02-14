import StarIcon from "@mui/icons-material/Star";
function HomeReview() {
  return (
    <section className="bg-paleWhiteGrey p-16">
      <h1 className="font-otoma text-3xl  text-center">
        What our customers say
      </h1>
      <p className=" text-lg font-sans text-center ">
        Read testimonials from our happy customers
      </p>
      <div className="flex justify-evenly ">
        <div className="flex w-3/12 bg-offWhite hover:bg-btnsGreen p-5 rounded-2xl transition-all duration-500">
          <div>
            <img src="/public/icons/commaGroup.svg" alt="" />
            <p className="hover:text-offWhite border-b py-2 my-3">
              This platform is great for connecting restaurants with people in
              need and making a positive impact on the community
            </p>
            <div className="flex gap-x-3 items-center">
              <img
                src="homeMedia/personreview1.png"
                alt=""
                className="rounded-full w-14 h-14"
              />
              <div>
                <p className="hover:text-offWhite p-0 transition-all duration-500">
                  Mohamed Soliman
                </p>
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
        <div className="flex w-3/12 bg-offWhite hover:bg-btnsGreen p-5 rounded-2xl transition-all duration-500">
          <div>
            <img src="/public/icons/commaGroup.svg" alt="" />
            <p className="hover:text-offWhite border-b py-2 my-3">
              This platform is great for connecting restaurants with people in
              need and making a positive impact on the community
            </p>
            <div className="flex gap-x-3 items-center">
              <img
                src="homeMedia/personreview2.png"
                alt=""
                className="rounded-full w-14 h-14"
              />
              <div>
                <p className="hover:text-offWhite p-0 transition-all duration-500">
                  Mohamed Soliman
                </p>
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
        <div className="flex w-3/12 bg-offWhite hover:bg-btnsGreen p-5 rounded-2xl transition-all duration-500">
          <div>
            <img src="/public/icons/commaGroup.svg" alt="" />
            <p className="hover:text-offWhite border-b py-2 my-3">
              This platform is great for connecting restaurants with people in
              need and making a positive impact on the community
            </p>
            <div className="flex gap-x-3 items-center">
              <img
                src="homeMedia/personreview3.png"
                alt=""
                className="rounded-full w-14 h-14"
              />
              <div>
                <p className="hover:text-offWhite p-0 transition-all duration-500">
                  Mohamed Soliman
                </p>
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
      </div>
      <button className="font-sans">View More Reviews ${`>`}</button>
    </section>
  );
}

export default HomeReview;
