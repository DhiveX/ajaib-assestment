import DataTable from "react-data-table-component";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../store/actions/userAction";

const columns = [
  {
    name: "username",
    selector: (row) => row.login.username,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => `${row.name.first} ${row.name.last}`,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Gender",
    selector: (row) => row.gender,
    sortable: true,
  },
  {
    name: "Registered Date",
    selector: (row) => row.registered.date,
    sortable: true,
  },
];

function Home() {
  const usersList = useSelector((state) => state.usersList);
  const { loading, error, users } = usersList;
  const dispatchRedux = useDispatch();

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

  function handleFilter(value) {
    const tempFilterList = { ...value };
    setFilter(tempFilterList);
  }

  function handleKeyword(event) {
    let tempValue = filter;
    tempValue.keyword = event.target.value;
    handleFilter(tempValue);
    applyFilter();
  }

  function handleGender(event) {
    let tempValue = filter;
    tempValue.gender = event.target.value;
    handleFilter(tempValue);
  }

  function handleSortBy(event) {
    let tempValue = filter;
    tempValue.sortBy = event.target.value;
    handleFilter(tempValue);
  }
  function handleSortOrder(event) {
    let tempValue = filter;
    tempValue.sortOrder = event.target.value;
    handleFilter(tempValue);
  }

  const handlePageChange = (page, perPage) => {
    let tempValue = filter;
    tempValue.page = page;
    handleFilter(tempValue);
    applyFilter();
  };

  const handleResetFilter = () => {
    let tempValue = filter;
    tempValue.page = 1;
    tempValue.pageSize = 10;
    tempValue.gender = null;
    tempValue.keyword = null;
    tempValue.sortBy = null;
    tempValue.sortOrder = "ascend";
    tempValue.results = 30;
    tempValue.seed = "abc";
    handleFilter(tempValue);
    document.getElementById("formFilter").reset();
    applyFilter();
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div
          style={{
            width: "100%",
            height: "100%",
            border: "solid 1px gray",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <form id="formFilter">
            <input
              type="text"
              onChange={handleKeyword}
              style={{ padding: "10px", margin: "10px" }}
            ></input>
            <select
              onChange={handleGender}
              style={{ padding: "10px", margin: "10px" }}
            >
              <option value="">--select gender--</option>
              <option value="female">female</option>
              <option value="male">male</option>
            </select>
            <select
              onChange={handleSortBy}
              style={{ padding: "10px", margin: "10px" }}
            >
              <option value="">--select sort by--</option>
              <option value="username">username</option>
              <option value="name">name</option>
              <option value="email">email</option>
              <option value="gender">gender</option>
              <option value="registeredDate">registered date</option>
            </select>
            <select
              onChange={handleSortOrder}
              style={{ padding: "10px", margin: "10px" }}
            >
              <option value="">--select sort order--</option>
              <option value="ascend">ascending</option>
              <option value="descend">descending</option>
            </select>
            <button
              type="button"
              onClick={() => applyFilter()}
              style={{ padding: "10px", margin: "10px" }}
            >
              Apply Filter
            </button>
            <button
              type="button"
              onClick={() => handleResetFilter()}
              style={{ padding: "10px", margin: "10px" }}
            >
              Reset Filter
            </button>
          </form>

          <DataTable
            title="Users"
            columns={columns}
            data={users}
            progressPending={loading}
            keyField={1}
            pagination
            paginationComponentOptions={{ noRowsPerPage: true }}
            onChangePage={handlePageChange}
          />
        </div>
      </main>
    </div>
  );
}

export default Home;
