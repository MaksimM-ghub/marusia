import { svg } from "../SvgComponents/SvgComponents";
import "./LogoHeader.scss";
import { Link } from "react-router-dom";

export const LogoHeader = () => {
  return (
    <>
      <Link className="header__logo app-logo link-reset" to={"/"}>
        {svg.marusiaIcon}
      </Link>
    </>
  );
};
