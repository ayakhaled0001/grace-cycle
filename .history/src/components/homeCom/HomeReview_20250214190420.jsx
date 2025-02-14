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
          <img src="/public/icons/commaGroup.svg" alt />
        </div>
      </div>
    </section>
  );
}

export default HomeReview;
