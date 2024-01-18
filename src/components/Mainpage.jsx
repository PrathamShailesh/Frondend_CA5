import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import StarRateIcon from "@mui/icons-material/StarRate";
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function Mainpage() {
  const [bookData, setBookData] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://reactnd-books-api.udacity.com/books", {
        headers: { Authorization: "whatever-you-want" },
      })
      .then((response) => {
        if (
          response.data &&
          response.data.books &&
          response.data.books.length > 0
        ) {
          const initialFavorites = response.data.books.reduce((acc, book) => {
            acc[book.id] = false;
            return acc;
          }, {});
          setFavorites(initialFavorites);
          setBookData(response.data.books);
          setFilteredBooks(response.data.books);
        } else {
          setError("No data found.");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError("Error 404: Website not found");
        }
      });
  }, []);

  const handleToggleFavorite = (bookId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [bookId]: !prevFavorites[bookId],
    }));
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredBooks = bookData.filter((book) =>
      book.title.toLowerCase().includes(searchTerm)
    );
    setFilteredBooks(filteredBooks);
  };

  return (
    <>
      <header style={{ backgroundColor: '#5680E9' }} className=" font-bold p-6 drop-shadow-lg flex justify-between px-12">
        <img src="https://s3.ap-south-1.amazonaws.com/kalvi-education.github.io/front-end-web-development/Kalvium-Logo.png" alt="" className="h-9"/>
        <input type="search" placeholder="Search Books" className="p-1 px-10 rounded-full bg-blue-200 w-[500px]  focus:outline-none " value={searchTerm} onChange={handleSearch}></input>
        <div className="absolute right-1/3 top-9 ">
        <IoSearchSharp />
        </div>
        <Link to="/Register">
          {" "}
          <button className="text-white border p-1 px-2 rounded-md ">
            Register
          </button>
        </Link>
      </header>

      <div className="main text-center p-5 grid grid-cols-3 justify-items-center ">
        {error && <p>{error}</p>}
        {filteredBooks.map((book, index) => (
          <Card variant="outlined" sx={{ maxWidth: 225, maxHeight: 460 }} className="all_items m-8 drop-shadow-lg" key={index} >
            {book.imageLinks && (
              <CardMedia component="img" alt={book.title} image={book.imageLinks.thumbnail} />
            )}
            <CardContent>
              <Typography component="div">{book.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                Authors: {book.authors && book.authors.join(", ")}
              </Typography>
              {book.averageRating && (
                <Typography variant="subtitle1" color="text.secondary">
                  <StarRateIcon fontSize="small" color="warning" />{" "}
                  {book.averageRating}
                </Typography>
              )}
              <Box>
                <Box onClick={() => handleToggleFavorite(book.id)} style={{ cursor: "pointer" }}>
                  {favorites[book.id] ? (
                    <FavoriteIcon color="error" fontSize="small" />
                  ) : (
                    <FavoriteBorderIcon fontSize="small" />
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Mainpage;
