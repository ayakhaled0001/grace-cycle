import { Card, CardMedia, Typography, Box } from "@mui/material";

const BagsVideo = () => {
  return (
    <Box
      id="bags-section"
      className="w-[95%] mob470:w-[92%] mob560:w-[90%] md:w-[85%] h-48 mob470:h-56 mob560:h-64 md:h-80 lg:h-96 mx-auto mt-6 mob470:mt-8 mob560:mt-10 mb-6 mob470:mb-8 mob560:mb-10 bg-red-200">
      <Card className="relative h-[100%]">
        <CardMedia
          component="video"
          src="../../../public/services/BagsVideo.mp4"
          autoPlay
          muted
          loop
          className="h-[100%] object-cover"
        />
        <Box className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-[rgba(0,0,0,0.3)] text-white p-2 mob470:p-3 mob560:p-4 text-center">
          <Typography
            variant="h3"
            component="div"
            gutterBottom
            sx={{
              fontFamily: '"Nunito-bold", "sans-serif"',
              fontSize: "1.5rem",
              fontWeight: 600,
              textAlign: "center",
              "@media (min-width: 470px)": {
                fontSize: "2rem",
              },
              "@media (min-width: 560px)": {
                fontSize: "2.5rem",
              },
              "@media (min-width: 768px)": {
                fontSize: "3rem",
              },
            }}>
            We have Magic Bags for you
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: '"Nunito-bold", "sans-serif"',
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#E5E1DA",
              textAlign: "center",
              "@media (min-width: 470px)": {
                fontSize: "1rem",
              },
              "@media (min-width: 560px)": {
                fontSize: "1.1rem",
              },
              "@media (min-width: 768px)": {
                fontSize: "1.2rem",
              },
            }}>
            We provide you with different bags from different places. <br />
            Magic bags contain a variety of delicious foods at reduced prices.
          </Typography>
          <button className="mt-3 mob470:mt-4 mob560:mt-5 md:mt-6 bg-btnsGreen text-white font-nunitoBold px-4 mob470:px-6 mob560:px-8 py-1.5 mob470:py-2 rounded-lg text-sm mob470:text-base mob560:text-lg md:text-xl hover:bg-offWhite hover:text-btnsGreen transition">
            Show All Bags
          </button>
        </Box>
      </Card>
    </Box>
  );
};

export default BagsVideo;
