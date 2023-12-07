"use client";

import Loading from "../../../../components/loading/Loading";
import Video from "../../../../components/video/Video";
import "./singleMovie.scss";
import "./responsive.scss";
import { useState, useEffect } from "react";
import axiosInstance from "../../../../config";

const SingleMovie = ({ params }) => {
  const [movie, setMovie] = useState([]);
  const [category, setCategory] = useState([]);
  const [country, setCountry] = useState([]);
  const slug = params?.slug;

  useEffect(() => {
    const getMovie = async () => {
      const res = await axiosInstance.get("https://ophim1.com/phim/" + slug);
      setMovie(res.data);
      setCategory(res.data.movie.category);
      setCountry(res.data.movie.country);
    };

    getMovie();
  }, [slug]);

  const infoMovie = movie?.movie;
  const name = infoMovie?.slug;
  const episode_current = infoMovie?.episode_current;
  const cateMovie = [];
  const countryMovie = [];
  let nameTitle = "";
  if (typeof infoMovie !== "undefined") {
    nameTitle = infoMovie?.name;
  }

  category?.forEach((c) => {
    const { name } = c;
    cateMovie.push(" " + name);
  });

  country?.forEach((c) => {
    const { name } = c;
    countryMovie.push(" " + name);
  });

  return (
    <div className="singleMovie">
      {!infoMovie ? (
        <Loading />
      ) : (
        <>
          <div className="singleMovieCard">
            <div className="singleMovieName">{infoMovie?.name}</div>
            <div className="singleMovieTop">
              <img src={infoMovie?.thumb_url} alt="" />
              <div className="singleMovieInfo">
                <div>
                  <div className="singleMovieInfoText">
                    <span>Trạng Thái: </span>
                    <span>{infoMovie?.episode_current}</span>
                  </div>
                  <hr />
                </div>

                <div>
                  <div className="singleMovieInfoText">
                    <span>Số tập: </span>
                    <span>{infoMovie?.episode_total}</span>
                  </div>
                  <hr />
                </div>

                <div>
                  <div className="singleMovieInfoText">
                    <span>Thời lượng: </span>
                    <span>{infoMovie?.time}</span>
                  </div>
                  <hr />
                </div>

                <div>
                  <div className="singleMovieInfoText">
                    <span>Năm phát hành: </span>
                    <span>{infoMovie?.year}</span>
                  </div>
                  <hr />
                </div>

                <div>
                  <div className="singleMovieInfoText">
                    <span>Chất lượng: </span>
                    <span>{infoMovie?.quality}</span>
                  </div>
                  <hr />
                </div>

                <div>
                  <div className="singleMovieInfoText">
                    <span>Ngôn ngữ: </span>
                    <span>{infoMovie?.lang}</span>
                  </div>
                  <hr />
                </div>

                <div>
                  <div className="singleMovieInfoText">
                    <span>Đạo diễn: </span>
                    <span>{infoMovie?.director.toString()}</span>
                  </div>
                  <hr />
                </div>

                <div>
                  <div className="singleMovieInfoText">
                    <span>Diễn viên: </span>
                    <span>{infoMovie?.actor.toString()}</span>
                  </div>
                  <hr />
                </div>

                <div>
                  <div className="singleMovieInfoText">
                    <span>Thể loại: </span>
                    <span>{cateMovie?.toString()}</span>
                  </div>
                  <hr />
                </div>

                <div>
                  <div className="singleMovieInfoText">
                    <span>Quốc gia: </span>
                    <span>{countryMovie?.toString()}</span>
                  </div>
                  <hr />
                </div>
              </div>
              <div className="singleMovieContent">
                <p dangerouslySetInnerHTML={{ __html: infoMovie?.content }}></p>
              </div>
            </div>
          </div>

          <div className="singleMovieVideo">
            <Video
              movie={movie}
              name={name}
              episode_current={episode_current}
              ep={params?.ep}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SingleMovie;