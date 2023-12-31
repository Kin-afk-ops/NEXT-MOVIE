"use client";

import MovieListItem from "../../../components/movieListItem/MovieListItem";
import { useState, useEffect } from "react";
import "./list.scss";
import "./responsive.scss";
import Pagination from "../../../components/pagination/Pagination";
import Loading from "../../../components/loading/Loading";

import axiosInstance from "../../../config";

const Lists = ({ params, searchParams }) => {
  const currentPage = searchParams?.page;
  const [movies, setMovies] = useState([]);
  const [title, seTitle] = useState("");
  const [totalPage, setTotalPage] = useState(0);

  const slugMovie = params?.slug.split(".")[0];

  const removeAccents = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  const country = searchParams.country;
  const category = searchParams.category;

  const query = searchParams.q;

  useEffect(() => {
    setMovies([]);
    const getNewMovieAll = async () => {
      const resNew = await axiosInstance.get(
        `/movie?qNew=${true}&qPage=${currentPage}`
      );

      setMovies(resNew.data.movies);
      setTotalPage(resNew.data.totalPage);
      seTitle("Phim mới cập nhập");
    };
    const getNewSeries = async () => {
      const resSeries = await axiosInstance.get(
        `/movie?qCategory=series&qPage=${currentPage}`
      );

      setMovies(resSeries.data.movies);
      setTotalPage(resSeries.data.totalPage);
      seTitle("Phim bộ mới cập nhật");
    };

    const getNewMovie = async () => {
      const resMovie = await axiosInstance.get(
        `/movie?qCategory=movie&qPage=${currentPage}`
      );

      setMovies(resMovie.data.movies);
      setTotalPage(resMovie.data.totalPage);
      seTitle("Phim lẻ mới cập nhật");
    };

    const getCountryMovie = async () => {
      const resCountryMovie = await axiosInstance.get(
        `/movie?qCountry=${country}&qPage=${currentPage}`
      );

      setMovies(resCountryMovie.data.movies);
      setTotalPage(resCountryMovie.data.totalPage);
      seTitle(`Phim ${country.toUpperCase()}`);
    };

    const getCategoryMovie = async () => {
      const resCategoryMovie = await axiosInstance.get(
        `/movie?qCategory=${category}&qPage=${currentPage}`
      );

      setMovies(resCategoryMovie.data.movies);
      setTotalPage(resCategoryMovie.data.totalPage);
      seTitle(`Phim ${category}`);
    };

    const getSearchMovie = async () => {
      const resSearchMovie = await axiosInstance.get(
        `/search/movie?search=${query}&qPage=${currentPage}`
      );

      setMovies(resSearchMovie.data.movies);
      setTotalPage(resSearchMovie.data.totalPage);
      seTitle(`Kết quả của "${query}"`);
    };

    switch (slugMovie) {
      case "phim-moi-cap-nhat":
        getNewMovieAll();
        break;
      case "phim-bo-moi-cap-nhat":
        getNewSeries();
        break;

      case "phim-le-moi-cap-nhat":
        getNewMovie();
        break;

      case "quoc-gia":
        getCountryMovie();
        break;

      case "the-loai":
        getCategoryMovie();
        break;

      case "tim-kiem":
        getSearchMovie();
        break;
      default:
        console.log("haha");
        break;
    }
  }, [slugMovie, currentPage, country, query, category]);

  return (
    <div className="lists">
      <h1 className="mainTitle">{title}</h1>

      {movies.length === 0 ? (
        <Loading />
      ) : (
        <div className="movieListItems row sm-gutter">
          {movies.map((movie, index) => (
            <MovieListItem movie={movie} key={index} listMode={true} />
          ))}
        </div>
      )}

      <Pagination
        totalPage={totalPage}
        path={params.slug}
        currentPage={currentPage}
        category={category}
        country={country}
        search={query}
      />
    </div>
  );
};

export default Lists;
