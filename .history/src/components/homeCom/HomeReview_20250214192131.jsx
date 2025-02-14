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
      <div className="flex w-3/12 bg-paleWhite hover:bg-btnsGreen p-5 rounded-2xl">
        <div>
          <img src="/public/icons/commaGroup.svg" alt="" />
          <p className="text-offWhite border-b py-2 my-3">
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
              <p className="text-offWhite p-0">Mohamed Soliman</p>
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
    </section>
  );
}

export default HomeReview;
