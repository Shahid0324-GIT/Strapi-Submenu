import React, { useRef } from "react";
import sublinks from "./data";
import { useGlobalContext } from "./Context";

const Submenu = () => {
  const { pageId, setPageId } = useGlobalContext();

  const currentPage = sublinks.find((item) => item.pageId === pageId);
  // console.log(currentPage);

  const submenuContainer = useRef(null);

  const handleMouseLeave = (e) => {
    // console.log(pageId);
    // setPageId(null);
    // console.log(submenu);
    // console.log(clientX, clientY);
    // console.log(result);

    const submenu = submenuContainer.current;
    const { top, left, bottom, right } = submenu.getBoundingClientRect();
    const { clientX, clientY } = e;

    if (clientX < left - 1 || clientX > right - 1 || clientY > bottom - 1) {
      setPageId(null);
    }
  };

  return (
    <div
      className={currentPage ? "submenu show-submenu" : "submenu"}
      onMouseLeave={handleMouseLeave}
      ref={submenuContainer}
    >
      <h5>{currentPage?.page}</h5>
      <div
        className="submenu-links"
        style={{
          display: "grid",
          gridTemplateColumns:
            currentPage?.links?.length > 3 ? "1fr 1fr" : "1fr",
        }}
      >
        {currentPage?.links?.map((link) => {
          const { id, url, label, icon } = link;

          return (
            <a key={id} href="url">
              {icon} {label}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Submenu;
