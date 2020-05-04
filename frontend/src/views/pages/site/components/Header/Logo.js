import { useState } from "react";
import useInterval from "@use-it/interval";

import logoPaths from "../../utils/logoPaths";

const Logo = () => {
  const [logoNumber, setLogoNumber] = useState(0);

  useInterval(() => {
    const newLogoNumber =
      logoNumber === logoPaths.length - 1 ? 0 : logoNumber + 1;

    setLogoNumber(newLogoNumber);
  }, 400);

  return logoPaths[logoNumber];
};

export default Logo;
