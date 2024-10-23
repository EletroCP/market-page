'use-client'
import Carrossel from "./component/client-page/Carrossel";
import Catalog from "./component/client-page/Catalog";
import { NavBar } from "./component/client-page/NavBar";

export default function Home() {

  return (
    <div>
      <NavBar />
      <Carrossel />
      <Catalog />
      <Catalog />
    </div>
  );
}
