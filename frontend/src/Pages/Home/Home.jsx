import { useUser } from "../../Providers/UserProvider";
import "./Home.css";

export function Home() {
  const { user } = useUser();

  return (
    <div className="banner-container">
      <img
        src="https://i.ibb.co/HTNYC526/68418e2f-27c8-4f6e-9008-8f52d0f517ea.png"
        alt="Julio Iglesias con regalo"
        className="banner-image"
      />
      <div className="banner-text">
        ¡Julio se vino con <span>descuentos</span>!
      </div>
    </div>
  );
}
