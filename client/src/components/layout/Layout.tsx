import PageHeader from "./PageHeader";

interface ILayout {
  children: any;
}

const Layout = ({ children }: ILayout): JSX.Element => {
  return (
    <>
      <PageHeader />
      <main className="container">
        {children}
      </main>
    </>
  );
}

export default Layout;
