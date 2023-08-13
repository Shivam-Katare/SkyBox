import React from "react";
import { Container } from "react-bootstrap";
import "./CenteredContainer.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../assets/logo.png";

export default function CenteredContainer({ children }) {
  const { currentUser } = useAuth();

  return (
    <>
      {currentUser ? (
        <div className="back-to">
          <Link to="/" className="back-to-home">
            Back to Home
          </Link>
        </div>
      ) : <img src={Logo} alt="" style={{width: "10rem"}} /> }

      <Container className="centralized-container">
        <div className="w-100">{children}</div>
      </Container>
    </>
  );
}
