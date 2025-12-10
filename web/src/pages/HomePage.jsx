import { jwtDecode } from "jwt-decode";

function getEmailFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const decoded = jwtDecode(token);
  return decoded?.email;
}

export default function HomePage() {
  const email = getEmailFromToken();

  return (
    <>
      <h3>Logged guest: {email}</h3>
      <h1>Welcome to the first app for soils in Macedonia!</h1>

      <h2>Become part of the farmers in our country</h2>
      <p>
        This application allows us to view information about agricultural
        activities, and all the necessary information can be found here.
      </p>
      <p>
        For your home, enrich the menu with soil, agricultural crops,
        fertilizers, and mechanization.
      </p>
    </>
  );
}
