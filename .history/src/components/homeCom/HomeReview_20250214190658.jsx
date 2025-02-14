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
          <img src="homeMedia/personreview1.png" alt="" />
          <div></div>
        </div>
      </div>
    </section>
  );
}

export default HomeReview;
