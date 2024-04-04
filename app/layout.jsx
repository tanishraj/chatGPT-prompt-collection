import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { Suspense } from "react";

export const metadata = {
  title: "Promtapia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>
        <Provider>
          <Suspense>
            <main className="app">
              <Nav />
              {children}
            </main>
          </Suspense>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
