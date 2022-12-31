const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center pt-3 py-2 ">
      <span>
        Real <i className="bi bi-rocket"></i> App
      </span>
      <span className="mx-2 fs-5">&copy;</span>
      <span>{new Date().getFullYear()}</span>
    </footer>
  );
};

export default Footer;
