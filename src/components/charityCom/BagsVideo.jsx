import { Card, CardMedia, Typography, Box } from "@mui/material";

const BagsVideo = () => {
  return (
    <Box
      id="bags-section"
      className="w-[95%] md:w-[85%] h-48 sm:h-64 md:h-80 lg:h-96 mx-auto mt-6 md:mt-10 mb-6 md:mb-10 bg-red-200"
    >
      <Card className="relative h-[100%]">
        <CardMedia
          component="video"
          src="../../../public/services/BagsVideo.mp4"
          autoPlay
          muted
          loop
          className="h-[100%] object-cover"
          className="h-[100%] object-cover"
        />
        <Box className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-[rgba(0,0,0,0.3)] text-white p-2 text-center">
          <Typography
            variant="h3"
            component="div"
            gutterBottom
            sx={{
              fontFamily: '"Nunito-bold", "sans-serif"',
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            We have Magic Bags for you
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: '"Nunito-bold", "sans-serif"',
              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
                md: "1.1rem",
                lg: "1.2rem",
              },
              fontWeight: 500,
              color: "#E5E1DA",
              textAlign: "center",
            }}
          >
            We provide you with different bags from different places. <br />
            Magic bags contain a variety of delicious foods at reduced prices.
          </Typography>
          <button className="mt-3 sm:mt-4 md:mt-6 bg-btnsGreen text-white font-nunitoBold px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl hover:bg-offWhite hover:text-btnsGreen transition">
            Show All Bags
          </button>
        </Box>
      </Card>
    </Box>
  );
};

export default BagsVideo;
