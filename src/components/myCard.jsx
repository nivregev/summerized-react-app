import PageHeader from "./common/pageHeader";

const MyCards = () => {
  return (
    <PageHeader
      title={
        <>
          My Card <i className="bi bi-rocket"></i>
        </>
      }
      description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab velit alias fugit consectetur ipsam, quod quis maiores enim minus neque adipisci quae vero nobis facere, inventore omnis aperiam similique sequi."
    />
  );
};

export default MyCards;
