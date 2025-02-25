import { PuffLoader } from "react-spinners";
const override = {
  display: "block",
  margin: "100px auto",
};

const Loader = ({ loading }: { loading: boolean }) => {
  return (
      <PuffLoader
        color='#844001'
        loading={loading}
        cssOverride={override}
        size={200}
      />
  );
};

export default Loader;
