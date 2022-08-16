import DataTable from "react-data-table-component";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import WithUser from "../components/_hoc/user/withUser";
import { useSelector } from "react-redux";

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

function Home(props) {
  const usersList = useSelector((state) => state.usersList);
  const { loading, error, users } = usersList;

  function handleKeyword(event) {
    let tempValue = props.filter;
    tempValue.keyword = event.target.value;
    props.setFilter(tempValue);
  }

  function handleGender(event) {
    let tempValue = props.filter;
    tempValue.gender = event.target.value;
    props.setFilter(tempValue);
  }

  function handleSortBy(event) {
    let tempValue = props.filter;
    tempValue.sortBy = event.target.value;
    props.setFilter(tempValue);
  }
  function handleSortOrder(event) {
    let tempValue = props.filter;
    tempValue.sortOrder = event.target.value;
    props.setFilter(tempValue);
  }

  const handlePageChange = (page, perPage) => {
    let tempValue = props.filter;
    tempValue.page = page;
    props.setFilter(tempValue);
    props.applyFilter();
  };

  const handleResetFilter = () => {
    let tempValue = props.filter;
    tempValue.page = 1;
    tempValue.pageSize = 10;
    tempValue.gender = null;
    tempValue.keyword = null;
    tempValue.sortBy = null;
    tempValue.sortOrder = "ascend";
    tempValue.results = 30;
    tempValue.seed = "abc";
    props.setFilter(tempValue);
    document.getElementById("formFilter").reset();
    props.applyFilter();
  };

  useEffect(() => {
    // props.applyFilter();
  }, []);

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
              onClick={() => props.applyFilter()}
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

export default WithUser(Home);
