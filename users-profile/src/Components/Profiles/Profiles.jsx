import { useEffect, useState } from "react";
import Profile from "../Profile/Profile";
import styles from "./Profiles.module.css";
import { deleteUsers, getUsers } from "../../services/users";

const Profiles = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUsers(page)
      .then(({ data }) => {
        //console.log(output.data);
        //setUsers(output.data);
        setUsers(data);
        setIsError(false);
        setIsLoading(false);
      })
      .catch(() => {
        // console.log("there is some error");
        setIsLoading(false);
        setIsError(true);
      });
  }, [page]);

  // console.log(users);

  const deleteHandler = (userIndex) => {
    //console.log("from parent", userIndex);
    //const userData = users[userIndex];
    // const id = userData.id;
    const { id: userId } = users[userIndex];
    deleteUsers(userId).then((isDeleted) => {
      if (isDeleted) {
        const usersData = [...users];
        usersData.splice(userIndex, 1);
        setUsers(usersData);
      }
    });
  };

  const profiles = users.map((user, index) => (
    <Profile
      key={index}
      fname={user.first_name}
      email={user.email}
      avatar={user.avatar}
      deleteHandler={deleteHandler}
      userIndex={index}
    />
  ));

  return (
    <>
      {isLoading && <div>Loader....</div>}
      {!isLoading && (
        <>
          <div>page: {page}</div>
          {isError && <p className={styles.errorMsg}>There is some Error</p>}
          {!isError && <div className={styles.profiles}>{profiles}</div>}
          <div>
            <button onClick={() => setPage(page === 1 ? 2 : 1)}>
              Show Page {page === 1 ? 2 : 1}
            </button>
          </div>
        </>
      )}
    </>
  );
};
export default Profiles;
