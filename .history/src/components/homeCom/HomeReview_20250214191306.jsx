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
      <div className="flex ">
        <div>
          <img src="/public/icons/commaGroup.svg" alt="" />
          <p>
            This platform is great for connecting restaurants with people in
            need and making a positive impact on the community
          </p>
          <div className="flex">
            <img src="homeMedia/personreview1.png" alt="" className="" />
            <div>
              <strong>Mohamed Soliman</strong>
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
