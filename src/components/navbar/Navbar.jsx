import "./navbar.scss";
import "./responsive.scss";
import axiosInstance from "../../config";
import Link from "next/link";

const Navbar = async () => {
  const resCountries = await axiosInstance.get("/country");
  const resCate = await axiosInstance.get("/categories");
  const categories = resCate.data;
  const countries = resCountries.data;

  return (
    <div className="navbar">
      <div className="navbarList">
        <div className="navbarItems">
          <div>
            <span>
              <i className="fa-solid fa-bars"></i>
              Thể loại
            </span>
          </div>
          <ul>
            {categories?.map((c, index) => (
              <li key={index}>
                <Link
                  className="link"
                  href={`/danh-sach/danh-muc-the-loai.html?category=${c.slug}&page=1`}
                >
                  <span className="gach">- </span> {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbarItems">
          <div>
            <span>
              <i className="fa-sharp fa-solid fa-globe"></i>
              Quốc gia
            </span>
          </div>
          <ul>
            {countries?.map((c, index) => (
              <li key={index}>
                <Link
                  className="link navbarItemsChild"
                  href={`/danh-sach/danh-muc-quoc-gia.html?country=${c.slug}&page=1`}
                >
                  <span className="gach">-&nbsp;</span> {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbarItems">
          <Link
            className="link navbarItemsLink"
            href={`/danh-sach/phim-le-moi-cap-nhat.html?page=1`}
          >
            Phim lẻ
          </Link>
        </div>

        <div className="navbarItems">
          <Link
            className="link navbarItemsLink"
            href={`/danh-sach/phim-bo-moi-cap-nhat.html?page=1`}
          >
            Phim bộ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
