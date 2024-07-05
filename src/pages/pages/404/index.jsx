import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Not found || CompSpotter",
  description: "Not found || CompSpotter",
};

export default function NotFoundPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <section className="nopage mt-header">
          <div className="container">
            <div className="row y-gap-30 justify-between items-center">
              <div className="col-xl-6 col-lg-6">
                <img src="/img/404/1.svg" alt="image" />
              </div>

              <div className="col-xl-5 col-lg-6">
                <div className="nopage__content pr-30 lg:pr-0">
                  <h1 style={{ fontSize: "100px" }}>
                    3AM<span className="text-accent-2">MAR</span>
                  </h1>
                  <h2 className="text-30 md:text-24 fw-700">
                    Oops! It looks like you&apos;re lost.
                  </h2>
                  <p>
                    The page you&apos;re looking for isn&apos;t available. Try to search again or use the go to.
                  </p>
                  <button className="button -md -dark-1 bg-accent-1 text-white mt-25">
                    Go back to homepage
                    <i className="icon-arrow-top-right ml-10"></i>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>
        <FooterOne />
      </main>
    </>
  );
}
