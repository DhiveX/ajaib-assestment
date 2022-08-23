import React from "react";
import { useEffect, useState } from "react";
import { fetchUser } from "../../../store/actions/userAction";
import { useDispatch } from "react-redux";

function WithUser(WrappedComponent) {
  return function Propsuser(props) {
    const [filter, setFilter] = useState({
      page: 1,
      pageSize: 10,
      gender: null,
      keyword: null,
      sortBy: null,
      sortOrder: "ascend",
      results: 30,
      seed: "abc",
    });

    function handleFilter(value) {
      const tempFilterList = { ...value };
      setFilter(tempFilterList);
    }

    const dispatchRedux = useDispatch();

    function applyFilter() {
      let tempQueryParams = [];
      if (filter.page) {
        tempQueryParams = [...tempQueryParams, `page=${filter.page}`];
      }
      if (filter.pageSize) {
        tempQueryParams = [...tempQueryParams, `pageSize=${filter.pageSize}`];
      }
      if (filter.gender) {
        tempQueryParams = [...tempQueryParams, `gender=${filter.gender}`];
      }
      if (filter.keyword) {
        tempQueryParams = [...tempQueryParams, `keyword=${filter.keyword}`];
      }
      if (filter.sortBy) {
        tempQueryParams = [...tempQueryParams, `sortBy=${filter.sortBy}`];
      }
      if (filter.sortOrder) {
        tempQueryParams = [...tempQueryParams, `sortOrder=${filter.sortOrder}`];
      }
      if (filter.results) {
        tempQueryParams = [...tempQueryParams, `results=${filter.results}`];
      }
      if (filter.seed) {
        tempQueryParams = [...tempQueryParams, `seed=${filter.seed}`];
      }

      let finalQueryParams = "";
      if (tempQueryParams.length > 0) {
        finalQueryParams = "?" + tempQueryParams.join("&");
      }

      dispatchRedux(fetchUser(finalQueryParams));
    }
    useEffect(() => {
      applyFilter();
    }, []);

    return (
      <>
        <WrappedComponent
          {...props}
          applyFilter={() => applyFilter()}
          setFilter={(value) => handleFilter(value)}
          filter={filter}
        />
      </>
    );
  };
}

export default WithUser;
