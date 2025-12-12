import { Link, Outlet, useNavigate } from "react-router";

import styles from "./styles/Navigation.module.css";

export default function Root() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.navLinks}>
          {isLoggedIn ? (
            <>
              <Link to={"/"} className={styles.link}>
                🏠 Home
              </Link>
              <Link to={"/soil-chat"} className={styles.link}>
                💬 Chat
              </Link>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </>
          ) : (
            <Link to={"/login"} className={styles.link}>
              Login
            </Link>
          )}
        </div>
      </nav>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
