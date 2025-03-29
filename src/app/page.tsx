'use-client';
import React, { Suspense } from 'react';
import Carrossel from "./component/client-page/Carrossel";
import Catalog from "./component/client-page/Catalog";
import { NavBar } from "./component/client-page/NavBar";

/*
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const SearchForService = React.lazy(() => 
  delay(13000).then(() => import("./component/client-page/SearchForServise"))
);
*/

const SearchForService = React.lazy(() => import("./component/client-page/SearchForServise"));


export default function Home() {
  return (
    <div>
      <NavBar />
      <Carrossel />
      <Catalog />
      <Catalog />
      <Suspense fallback={<div>Loading...</div>}>
        <SearchForService />
      </Suspense>
    </div>
  );
}
