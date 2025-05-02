import { PuffLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "100px auto",
};

const Loader = ({ loading }: { loading: boolean }) => {
  return (
    <PuffLoader
      color='#d8973c'
      loading={loading}
      cssOverride={override}
      size={200}
    />
  );
};

export default Loader;
