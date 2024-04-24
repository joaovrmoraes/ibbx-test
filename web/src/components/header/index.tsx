import { useNavigate } from "react-router-dom";
import LogoSvg from "../../assets/logo.svg";
import { NavLink } from "../nav-link";
import {
  HeaderContainer,
  HeaderImage,
  HeaderTitle,
  NavContainer,
  TitleContainer,
} from "./style";

export function Header() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <HeaderContainer>
      <TitleContainer onClick={handleNavigate}>
        <HeaderTitle>IBB</HeaderTitle>
        <HeaderImage src={LogoSvg} alt="logo" />
      </TitleContainer>

      <NavContainer>
        <NavLink to="/">Home</NavLink>
        {/* <NavLink to="/assets">Ativos</NavLink>
        <NavLink to="/sensors">Sensores</NavLink> */}
      </NavContainer>
    </HeaderContainer>
  );
}
