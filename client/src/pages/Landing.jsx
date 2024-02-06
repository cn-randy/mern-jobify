import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage.js";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components/index.js";

function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="inf /o">
          <h1>
            Job <span>tracking</span> app
          </h1>
          <p>
            I'm baby williamsburg live-edge portland sus taxidermy. Cardigan
            authentic yes plz celiac fanny pack raclette, banjo iPhone artisan
            taxidermy waistcoat photo booth edison bulb. Vibecession you
            probably haven't heard of them sartorial mlkshk small batch
            succulents. Pop-up chia next level, everyday carry pitchfork
            crucifix hammock copper mug. Yuccie slow-carb authentic, direct
            trade poke fashion axe marxism craft beer bicycle rights. Neutra
            XOXO bruh, banh mi schlitz chillwave direct trade microdosing
            adaptogen kale chips meh fashion axe. Vinyl irony humblebrag
            pitchfork.
          </p>
          <Link to="/register" className="btn register-link">
            Sign up / demo user
          </Link>
          <Link to="/login" className="btn">
            Sign in
          </Link>
        </div>
        <img src={main} alt="job hunt" className="btn img main-img" />
      </div>
    </Wrapper>
  );
}

export default Landing;
