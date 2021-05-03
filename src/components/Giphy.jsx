import axios from "axios";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import { Paginate } from "./Paginate";

export const Giphy = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPageItems = data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setLoading(true);
      try {
        const { data: results } = await axios.get(
          "https://api.giphy.com/v1/gifs/trending",
          {
            params: {
              api_key: "k5FBSaDEto7ajlzuFqGLrjAq3uXslZbu",
              limit: 100,
            },
          }
        );
        // console.log(results.data);
        setData(results.data);
      } catch (er) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const renderGifs = () => {
    if (loading) return <Loader />;
    return currentPageItems?.map(({ id, images }) => (
      <div className="gif" key={id}>
        <img src={images.fixed_height.url} alt="" />
      </div>
    ));
  };

  const renderError = () => {
    if (error)
      return (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Unable to get Gifs, please try again in a few minutes...
        </div>
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    try {
      const { data: results } = await axios.get(
        `https://api.giphy.com/v1/gifs/search`,
        {
          params: {
            api_key: "k5FBSaDEto7ajlzuFqGLrjAq3uXslZbu",
            q: searchInput,
            limit: 100,
          },
        }
      );
      setData(results.data);
    } catch (er) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
    setLoading(false);
  };

  const pageSelect = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="m-2">
      {renderError()}
      <form
        action=""
        className="form-inline justify-content-center m-2 d-flex m-2"
      >
        <input
          type="text"
          className="form-control"
          placeholder="Type here..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Search
        </button>
      </form>
      <div className="container gifs">{renderGifs()}</div>
      <Paginate
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={data?.length}
        pageSelect={pageSelect}
      />
    </div>
  );
};
