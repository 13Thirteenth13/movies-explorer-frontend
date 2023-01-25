const Promo = ({ children  }) => {
  return (
    <section className="promo">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб&#8209;разработки.
      </h1>
      {children}
    </section>
  );
}

export default Promo;
