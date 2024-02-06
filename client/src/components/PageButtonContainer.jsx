import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";

const PageButtonContainer = () => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const {
    data: { currentPage, numOfPages },
  } = useAllJobsContext();

  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

  const addPageButton = function ({ pageNumber, active }) {
    return (
      <button
        className={`btn page-btn ${active && "active"}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = function () {
    const pageButtons = [];

    //* first page
    pageButtons.push(
      addPageButton({ pageNumber: 1, active: currentPage === 1 }),
    );

    //* add elipses before
    if (currentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key="elipses-before">
          ...
        </span>,
      );
    }

    //* page before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage - 1,
          active: false,
        }),
      );
    }

    //* current page
    if (currentPage !== 1 && currentPage !== numOfPages)
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage,
          active: true,
        }),
      );

    //* Page after current page
    if (currentPage !== numOfPages - 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage + 1,
          active: false,
        }),
      );
    }

    //* add elipses before
    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span className="page-btn dots" key="elipses-after">
          ...
        </span>,
      );
    }
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        active: currentPage === numOfPages,
      }),
    );
    return pageButtons;
  };
  const handlePageChange = function (pageNumber) {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() =>
          handlePageChange(currentPage - 1 < 1 ? numOfPages : currentPage - 1)
        }
      >
        <HiChevronDoubleLeft /> prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button
        className="btn next-btn"
        onClick={() =>
          handlePageChange(currentPage + 1 <= numOfPages ? currentPage + 1 : 1)
        }
      >
        <HiChevronDoubleRight /> next
      </button>
    </Wrapper>
  );
};
export default PageButtonContainer;
